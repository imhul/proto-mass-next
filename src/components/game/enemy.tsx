import { useEffect, useRef, useState } from "react"
// store
import { usePersistedStore } from "@/store"
// hooks
import { useBirthAnimation } from "@hooks/useBirth"
// pixi
import { ColorMatrixFilter, Assets, AnimatedSprite, Rectangle } from "pixi.js"
// components
import EnemyEgg from "@components/game/enemy-egg"
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
    enemyScale,
    bulletSpeed,
    bulletDamage,
    defaultChunkSize,
    initialEnemyModel,
    maxBulletDistance,
    maxDistanceFromEnemyBase,
} from "@lib/config"

type Store = all.store.PersistedStore

const Enemy = ({ ref, base, item }: all.game.EnemyProps) => {
    // refs
    const progressBarRef = useRef<ProgressBar | null>(null)
    const enemyRef = useRef<AnimatedSprite | null>(null)
    const animationFrameRef = useRef<number | null>(null)
    const idleTimeoutRef = useRef<number | null>(null)
    // state
    const [isBulletActive, setIsBulletActive] = useState(false)
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
        enemyRef as React.RefObject<AnimatedSprite>,
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

    const attack = () => {
        console.info("Enemy attack! 👌")
        if (!ref.current || !enemyRef.current || isBulletActive || hero.hp < 0.1) return
        const heroRef = ref.current.getChildByLabel("hero")
        if (!heroRef) return
        const enemySize = enemyRef.current.width * enemyScale
        setGameAction("addBullet", {
            id: crypto.randomUUID(),
            x: enemyRef.current.position.x < heroRef.position.x
                ? enemyRef.current.position.x + (enemySize / 2)
                : enemyRef.current.position.x - (enemySize / 2),
            y: enemyRef.current.position.y - 7,
            direction: { x: heroRef.position.x, y: heroRef.position.y },
            owner: "enemy",
            damage: bulletDamage + (item?.attackPower ?? 0),
            speed: bulletSpeed + (item?.attackSpeed ?? 0),
            distance: maxBulletDistance,
        })
        setIsBulletActive(true)

        setTimeout(() => {
            if (hero.hp > 0.1) {
                setIsBulletActive(false)
                attack()
            } else {
                setState(idleState)
            }
        }, Math.floor(1000))
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
        const sprite = enemyRef.current
        if (!sprite || !textures || !ref.current) return
        const heroRef = ref.current.getChildByLabel("hero")
        if (!heroRef) return
        const step = () => {
            if (paused || state !== angryState) return
            const heroPos = { x: heroRef.position.x, y: heroRef.position.y + heroSize / 2 }
            const distanceToHero = Math.hypot(heroPos.x - sprite.x, heroPos.y - sprite.y)

            if (distanceToHero < 1000 && distanceToHero > 100) {
                const speed = initialEnemyModel.speed * 1.5
                const angle = Math.atan2(heroPos.y - sprite.y, heroPos.x - sprite.x)
                if (!sprite || !sprite.x || !sprite.y) return
                sprite.x += Math.cos(angle) * (speed * 0.1)
                sprite.y += Math.sin(angle) * (speed * 0.1)

                if (sprite.x < 0) {
                    sprite.scale.x = -enemyScale
                } else {
                    sprite.scale.x = enemyScale
                }

                animationFrameRef.current = requestAnimationFrame(step)
            } else if (distanceToHero <= 100) {
                attack()
            } else {
                setState(idleState)
            }
        }

        animationFrameRef.current = requestAnimationFrame(step)
    }

    const idleAlgorithm = () => {
        if (paused || !enemyRef.current || !textures) return
        const sprite = enemyRef.current
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

                    if (dx < 0) {
                        sprite.scale.x = -enemyScale
                    } else {
                        sprite.scale.x = enemyScale
                    }

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
            Assets.load("/assets/enemy/enemy.json").then((result: all.game.AtlasJSON) => {
                setTextures(getTextures(result, "enemy"))
            })
        }
    }, [textures])

    useEffect(() => {
        stopLoop()
        if (enemyRef.current && textures) {
            enemyRef.current.textures = textures[state]
            if (paused) {
                enemyRef.current.stop()
            } else {
                enemyRef.current.play()
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
        if (isHovered) {
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
    }, [isHovered])

    return (textures && item && ref.current) ? (
        <pixiAnimatedSprite
            textures={textures[idleState]}
            ref={enemyRef}
            anchor={0.5}
            scale={enemyScale}
            eventMode={"static"}
            onPointerOver={() => setIsHover(true)}
            onPointerOut={() => setIsHover(false)}
            animationSpeed={state === idleState ? 0.08 : 0.18}
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
            autoPlay
            loop
            filters={filters}
        >
            {enemyRef.current ? (
                <EnemyEgg uid={item.uid} state={"jump"} position={{
                    x: enemyRef.current.position.x,
                    y: enemyRef.current.position.y
                }} />
            ) : null}
            {(enemyRef.current && item.hp < item.totalHp) ? (
                <CustomProgressBar
                    ref={progressBarRef}
                    position={{ x: -enemyRef.current.width / 1.3, y: -35 }}
                    min={0}
                    max={item.totalHp}
                    current={item.hp}
                    zIndex={enemyRef.current.zIndex + 1}
                />
            ) : null}
        </pixiAnimatedSprite>
    ) : null
}

export default Enemy
