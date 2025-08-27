import { useEffect, useRef, useState } from "react"
// store
import { usePersistedStore } from "@/store"
// components
import { ColorMatrixFilter, Assets, AnimatedSprite, Rectangle } from "pixi.js"
// types
import { storeTypes, gameTypes } from "@lib/types"
// utils
import { getTextures, getRandomInt } from "@lib/utils"
// config
import {
    angryState,
    initialEnemyModel,
    maxDistanceFromBase,
} from "@lib/config"

const Enemy = ({ ref, item, prideState, setPrideState, }: gameTypes.EnemyProps) => {
    const spriteRef = useRef<AnimatedSprite | null>(null) // The Pixi.js `Sprite`
    // state
    const [atlasJson, setAtlasJson] = useState<gameTypes.AtlasJSON | null>(null)
    const [isHovered, setIsHover] = useState(false)
    const [textures, setTextures] = useState<gameTypes.TexturesCollection>(null)
    const [state, setState] = useState<gameTypes.EnemyState>(prideState || "idle")
    const [init, setInit] = useState(false)
    // store
    const paused = usePersistedStore((state: storeTypes.PersistedStore) => state.paused)

    const idleAlgorithm = () => {
        setInit(true)
        if (!spriteRef.current || !textures) {
            setState("idle")
            return
        }
        let angle = 0
        const speed = initialEnemyModel.speed
        const base = initialEnemyModel.base
        const pausePhase = getRandomInt(1000, 4000)
        const walkingPhase = getRandomInt(3000, 9000)

        if (state !== "idle") setState("idle")
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
                    const dx = Math.cos(angle) * (speed * 0.1)
                    const dy = Math.sin(angle) * (speed * 0.1)

                    sprite.x += dx
                    sprite.y += dy

                    const distFromBase = Math.hypot(
                        sprite.x - base.x,
                        sprite.y - base.y
                    )
                    if (distFromBase > maxDistanceFromBase) {
                        angle = Math.atan2(base.y - sprite.y, base.x - sprite.x)
                    }

                    if (
                        nextTurnIndex < turnSchedule.length &&
                        elapsed >= turnSchedule[nextTurnIndex]
                    ) {
                        angle = getRandomInt(0, 360) * (Math.PI / 180)
                        nextTurnIndex++
                    }

                    if (state !== "run") setState("run")

                    requestAnimationFrame(step)
                } else {
                    setState("idle")
                    idleAlgorithm()
                }
            }
            requestAnimationFrame(step)
        }, pausePhase)
    }

    useEffect(() => {
        if (!atlasJson || !textures)
            Assets.load("/assets/enemy/bot.json").then(
                (result: gameTypes.AtlasJSON) => {
                    setAtlasJson(result)
                    setTextures(getTextures(result, "enemy"))
                },
            )
    }, [atlasJson, textures])

    useEffect(() => {
        if (spriteRef.current && textures) {
            spriteRef.current.textures = textures[state]
            if (paused) {
                spriteRef.current.stop();
            } else {
                spriteRef.current.play();
                if (!init) idleAlgorithm()
            }
        }
    }, [state, textures, paused, spriteRef.current])

    useEffect(() => {
        if (prideState === angryState) {
            setState(angryState)
            return
        }
    }, [prideState])

    return atlasJson && textures && item && ref.current ? (
        <>
            {/* @ts-ignore: type */}
            <pixiAnimatedSprite
                textures={textures["idle"]}
                ref={spriteRef}
                anchor={0.5}
                eventMode={"static"}
                onPointerOver={() => setIsHover(true)}
                onPointerOut={() => setIsHover(false)}
                scale={4}
                animationSpeed={0.14}
                x={item.position.x}
                y={item.position.y}
                interactive={true}
                hitArea={
                    new Rectangle(
                        0,
                        0,
                        textures["idle"][0].width,
                        textures["idle"][0].height,
                    )
                }
                label={"enemy-" + item.id}
                zIndex={100}
                autoPlay
                loop
                filters={isHovered
                    ? [new ColorMatrixFilter({ resolution: 2, blendMode: "multiply" })]
                    : []}
            />
        </>
    ) : null
}

export default Enemy
