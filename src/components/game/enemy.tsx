import { useEffect, useRef, useState } from "react"
// store
import { usePersistedStore } from "@/store"
// hooks
import { useBirthAnimation } from "@hooks/useBirth"
// pixi
import { ColorMatrixFilter, Assets, AnimatedSprite, Rectangle } from "pixi.js"
// components
import { ProgressBar } from "@pixi/ui"
import CustomProgressBar from "@components/pixi/custom-progress-bar"
// utils
import { getTextures, getRandomInt, dropShadowFilter } from "@lib/utils"
// config
import {
    runState,
    heroSize,
    idleState,
    angryState,
    defaultChunkSize,
    initialEnemyModel,
    maxDistanceFromEnemyBase,
} from "@lib/config"

type Store = all.store.PersistedStore

const Enemy = ({ ref, base, item }: all.game.EnemyProps) => {
    // refs
    const progressBarRef = useRef<ProgressBar | null>(null)
    const spriteRef = useRef<AnimatedSprite | null>(null)
    const animationFrameRef = useRef<number | null>(null)
    const idleTimeoutRef = useRef<number | null>(null)
    // state
    const [filters, setFilters] = useState<all.pixi.Filter[]>([dropShadowFilter.enemy])
    const [textures, setTextures] = useState<all.game.TexturesCollection>(null)
    const [state, setState] = useState<all.game.EnemyState>(idleState)
    const [isHovered, setIsHover] = useState(false)
    // store
    const paused = usePersistedStore((s: Store) => s.paused)
    const setGameAction = usePersistedStore((s: Store) => s.setGameAction)
    const enemiesList = usePersistedStore((s: Store) => s.enemies)
    const hero = usePersistedStore((s: Store) => s.hero)

    useBirthAnimation(
        spriteRef as React.RefObject<AnimatedSprite>,
        !!textures,
        "enemy"
    )

    const stopLoop = () => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current)
            animationFrameRef.current = null
        }
        if (idleTimeoutRef.current) {
            clearTimeout(idleTimeoutRef.current)
            idleTimeoutRef.current = null
        }
    }

    const checkContainerCollision = (pos: all.game.Position, sprite: AnimatedSprite) => {
        if (!sprite) return
        if (pos.x < 10 || pos.y < 10 ||
            pos.x > (defaultChunkSize * 2 - 10) ||
            pos.y > (defaultChunkSize * 2 - 10)) {
            sprite.alpha = 0
        } else {
            sprite.alpha = 1
        }
    }

    const attackAlgorithm = () => {
        const sprite = spriteRef.current
        if (!sprite || !textures) return

        const step = () => {
            if (paused || state !== angryState) return
            const heroPos = { x: hero.position.x, y: hero.position.y + heroSize / 2 }
            const distanceToHero = Math.hypot(heroPos.x - sprite.x, heroPos.y - sprite.y)

            if (distanceToHero < 1000) {
                const speed = initialEnemyModel.speed * 1.5
                const angle = Math.atan2(heroPos.y - sprite.y, heroPos.x - sprite.x)
                if (!sprite || !sprite.x || !sprite.y) return
                sprite.x += Math.cos(angle) * (speed * 0.1)
                sprite.y += Math.sin(angle) * (speed * 0.1)

                animationFrameRef.current = requestAnimationFrame(step)
            } else {
                setState(idleState)
            }
        }

        animationFrameRef.current = requestAnimationFrame(step)
    }

    const idleAlgorithm = () => {
        if (paused || !spriteRef.current || !textures) return
        const sprite = spriteRef.current
        const speed = initialEnemyModel.speed
        const pausePhase = getRandomInt(1000, 4000)
        const walkingPhase = getRandomInt(3000, 9000)

        idleTimeoutRef.current = window.setTimeout(() => {
            if (paused) return
            setState(runState)

            let angle = getRandomInt(0, 360) * (Math.PI / 180)
            const turnsCount = getRandomInt(0, 4)
            const turnSchedule = Array.from({ length: turnsCount }, () =>
                getRandomInt(0, walkingPhase)
            ).sort((a, b) => a - b)

            let nextTurnIndex = 0
            const start = performance.now()

            const step = (t: number) => {
                if (paused || state !== runState) return
                const elapsed = t - start

                if (elapsed < walkingPhase) {
                    const dx = Math.cos(angle) * (speed * 0.1)
                    const dy = Math.sin(angle) * (speed * 0.1)
                    sprite.x += dx
                    sprite.y += dy

                    checkContainerCollision({ x: sprite.x, y: sprite.y }, sprite)

                    const distFromBase = Math.hypot(sprite.x - base.x, sprite.y - base.y)
                    if (distFromBase > maxDistanceFromEnemyBase) {
                        angle = Math.atan2(base.y - sprite.y, base.x - sprite.x)
                    }

                    if (nextTurnIndex < turnSchedule.length && elapsed >= turnSchedule[nextTurnIndex]) {
                        angle = getRandomInt(0, 360) * (Math.PI / 180)
                        nextTurnIndex++
                    }

                    animationFrameRef.current = requestAnimationFrame(step)
                } else {
                    if (state === runState) setState(idleState)
                    idleAlgorithm()
                }
            }
            animationFrameRef.current = requestAnimationFrame(step)
        }, pausePhase)
    }

    useEffect(() => {
        if (!textures) {
            Assets.load("/assets/enemy/bot.json").then((result: all.game.AtlasJSON) => {
                setTextures(getTextures(result, "enemy"))
            })
        }
    }, [textures])

    useEffect(() => {
        stopLoop()
        if (spriteRef.current && textures) {
            spriteRef.current.textures = textures[state]
            if (paused) {
                spriteRef.current.stop()
            } else {
                spriteRef.current.play()
                if (state === angryState) {
                    attackAlgorithm()
                } else {
                    idleAlgorithm()
                }
            }
        }
        return stopLoop
    }, [state, textures, paused, hero.position.x, hero.position.y])

    useEffect(() => {
        if (!item?.colony) return
        const colony = enemiesList[item.colony.uid]
        if (!colony) return
        const currentEnemy = colony.list.find((e) => e.uid === item.uid)
        if (!currentEnemy) return
        const enemyState = currentEnemy.state

        if (enemyState !== state) {
            stopLoop()
            if (enemyState === angryState) {
                setState(angryState)
            } else {
                setState(idleState)
                setGameAction("setColonyState", { uid: item.colony.uid, angry: false })
            }
        }
    }, [item, enemiesList])

    useEffect(() => {
        if (paused) stopLoop()
    }, [paused])

    useEffect(() => {
        if (isHovered || state === angryState) {
            setFilters((prev) => [
                ...prev,
                new ColorMatrixFilter({
                    resolution: 2,
                    blendMode: "multiply"
                })
            ])
        } else {
            setFilters([dropShadowFilter.enemy])
        }
    }, [isHovered, state])

    return (textures && item && ref.current) ? (
        <pixiAnimatedSprite
            textures={textures[idleState]}
            ref={spriteRef}
            anchor={0.5}
            scale={1.5}
            eventMode={"static"}
            onPointerOver={() => setIsHover(true)}
            onPointerOut={() => setIsHover(false)}
            animationSpeed={0.14}
            x={item.position.x}
            y={item.position.y}
            interactive={true}
            hitArea={
                new Rectangle(
                    0,
                    0,
                    textures[idleState][0].width,
                    textures[idleState][0].height
                )
            }
            label={`enemy-${item.uid}`}
            zIndex={Math.floor(item.position.y + textures[idleState][0].height / 2)}
            autoPlay
            loop
            filters={filters}
        >
            {(spriteRef.current && item.hp < item.totalHp) ? (
                <CustomProgressBar
                    ref={progressBarRef}
                    position={{ x: -spriteRef.current.width / 3, y: -15 }}
                    min={0}
                    max={item.totalHp}
                    current={item.hp}
                />
            ) : null}
        </pixiAnimatedSprite>
    ) : null
}

export default Enemy
