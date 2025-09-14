import { useEffect, useRef, useState } from "react"
// store
import { usePersistedStore } from "@/store"
// hooks
import { useBirthAnimation } from "@hooks/useBirth"
// components
import { ColorMatrixFilter, Assets, AnimatedSprite, Rectangle } from "pixi.js"
import CustomProgressBar from "@components/pixi/custom-progress-bar"
// types
import { storeTypes, gameTypes } from "@lib/types"
// utils
import { getTextures, getRandomInt } from "@lib/utils"
// config
import {
    idleState,
    angryState,
    defaultChunkSize,
    initialEnemyModel,
    maxDistanceFromEnemyBase,
} from "@lib/config"
import { ProgressBar } from "@pixi/ui"

export type InitProps = {
    initialized: boolean
    currentState: gameTypes.EnemyState
}

const Enemy = ({
    ref,
    base,
    item,
    enemyColonyState,
    setEnemyColonyState,
}: gameTypes.EnemyProps) => {
    // refs
    const progressBarRef = useRef<ProgressBar | null>(null)
    const spriteRef = useRef<AnimatedSprite | null>(null)
    const animationFrameRef = useRef<number | null>(null)
    // state
    const [atlasJson, setAtlasJson] = useState<gameTypes.AtlasJSON | null>(null)
    const [isHovered, setIsHover] = useState(false)
    const [textures, setTextures] = useState<gameTypes.TexturesCollection>(null)
    const [state, setState] = useState<gameTypes.EnemyState>(
        enemyColonyState || idleState
    )
    const [init, setInit] = useState(false)
    // store
    const paused = usePersistedStore(
        (state: storeTypes.PersistedStore) => state.paused
    )

    useBirthAnimation(
        spriteRef as React.RefObject<AnimatedSprite>,
        !!textures,
        "enemy"
    )

    const initialization = ({ initialized, currentState }: InitProps) => {
        if (!initialized) {
            if (currentState === idleState) {
                idleAlgorithm()
            } else if (currentState === angryState) {
                attackAlgorithm()
            }
        }
    }

    const checkContainerCollision = (position: gameTypes.Position) => {
        const sprite = spriteRef.current!
        if (
            position.x < 10 ||
            position.y < 10 ||
            position.x > defaultChunkSize * 2 - 10 ||
            position.y > defaultChunkSize * 2 - 10
        ) {
            sprite.alpha = 0
        } else {
            sprite.alpha = 1
        }
    }

    const attackAlgorithm = () => {
        if (paused) return
        setInit(true)
        if (!spriteRef.current || !textures) {
            setState(idleState)
            return
        }
        setEnemyColonyState("angry")
        // TODO: find hero position and move towards him
    }

    const idleAlgorithm = () => {
        if (paused) return
        setInit(true)
        if (!spriteRef.current || !textures) {
            setState(idleState)
            return
        }
        let angle = 0
        const speed = initialEnemyModel.speed
        const pausePhase = getRandomInt(1000, 4000)
        const walkingPhase = getRandomInt(3000, 9000)

        if (state !== idleState) setState(idleState)
        setTimeout(() => {
            angle = getRandomInt(0, 360) * (Math.PI / 180)
            const turnsCount = getRandomInt(0, 4)
            const turnSchedule = Array.from({ length: turnsCount }, () =>
                getRandomInt(0, walkingPhase)
            ).sort((a, b) => a - b)

            let nextTurnIndex = 0
            const start = performance.now()

            const step = (t: number) => {
                const elapsed = t - start

                if (elapsed < walkingPhase) {
                    const sprite = spriteRef.current!
                    if (!sprite) return
                    const dx = Math.cos(angle) * (speed * 0.1)
                    const dy = Math.sin(angle) * (speed * 0.1)

                    sprite.x += dx
                    sprite.y += dy

                    checkContainerCollision({
                        x: sprite.x,
                        y: sprite.y,
                    })

                    const distFromBase = Math.hypot(sprite.x - base.x, sprite.y - base.y)
                    if (distFromBase > maxDistanceFromEnemyBase) {
                        angle = Math.atan2(base.y - sprite.y, base.x - sprite.x)
                    }

                    if (
                        nextTurnIndex < turnSchedule.length &&
                        elapsed >= turnSchedule[nextTurnIndex]
                    ) {
                        angle = getRandomInt(0, 360) * (Math.PI / 180)
                        nextTurnIndex++
                    }

                    if (paused) return
                    if (state !== "run") setState("run")

                    animationFrameRef.current = requestAnimationFrame(step)
                } else {
                    if (paused) return
                    setState(idleState)
                    idleAlgorithm()
                }
            }
            animationFrameRef.current = requestAnimationFrame(step)
        }, pausePhase)
    }

    useEffect(() => {
        if (!atlasJson || !textures)
            Assets.load("/assets/enemy/bot.json").then(
                (result: gameTypes.AtlasJSON) => {
                    setAtlasJson(result)
                    setTextures(getTextures(result, "enemy"))
                }
            )
    }, [atlasJson, textures])

    useEffect(() => {
        if (spriteRef.current && textures) {
            spriteRef.current.textures = textures[state]
            if (paused) {
                spriteRef.current.stop()
                setInit(false)
            } else {
                spriteRef.current.play()
                initialization({ initialized: init, currentState: state })
            }
        }
    }, [state, textures, paused, spriteRef.current])

    useEffect(() => {
        if (enemyColonyState === angryState && state !== angryState) {
            setState(angryState)
            return
        }
    }, [enemyColonyState])

    useEffect(() => {
        if (state === angryState && enemyColonyState !== angryState) {
            setEnemyColonyState("angry")
        }
    }, [state])

    useEffect(() => {
        if (paused) {
            animationFrameRef.current &&
                cancelAnimationFrame(animationFrameRef.current)
        }
    }, [paused, animationFrameRef.current])

    return (atlasJson && textures && item && ref.current) ? (
        <>
            <pixiAnimatedSprite
                textures={textures[idleState]}
                ref={spriteRef}
                anchor={0.5}
                eventMode={"static"}
                onPointerOver={() => setIsHover(true)}
                onPointerOut={() => setIsHover(false)}
                scale={2.5}
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
                filters={
                    isHovered
                        ? [new ColorMatrixFilter({ resolution: 2, blendMode: "multiply" })]
                        : []
                }
            >
                {(spriteRef.current && item.hp < item.totalHp) ? (
                    <CustomProgressBar
                        ref={progressBarRef}
                        position={{ x: -spriteRef.current?.width / 3, y: -15 }}
                        min={0}
                        max={item.totalHp}
                        current={item.hp}
                    />
                ) : null}
            </pixiAnimatedSprite>
        </>
    ) : null
}

export default Enemy
