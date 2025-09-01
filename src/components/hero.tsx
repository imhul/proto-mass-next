import { useEffect, useRef, useState } from "react"
// store
import { useStore, usePersistedStore } from "@/store"
// hooks
import { useMove } from "@hooks/useMove"
// components
import { Assets, AnimatedSprite, Rectangle } from "pixi.js"
import Bullet from "@components/bullet"
// types
import type { storeTypes, gameTypes } from "@lib/types"
// utils
import { getTextures } from "@lib/utils"
// config
import { zindex, heroSize } from "@lib/config"

const Hero = ({ ref }: gameTypes.HeroProps) => {
    const heroRef = useRef<AnimatedSprite | null>(null)
    const bulletRef = useRef<AnimatedSprite | null>(null)
    // state
    const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null)
    const [textures, setTextures] = useState<gameTypes.TexturesCollection>(null)
    const [isBulletActive, setIsBulletActive] = useState(false)
    // store
    const hero = useStore((state: storeTypes.GlobalStore) => state.hero)
    const paused = usePersistedStore((state: storeTypes.PersistedStore) => state.paused)
    useMove({ ref })

    useEffect(() => {
        if (!textures)
            Assets.load("/assets/hero/atlas.json").then(
                (result: gameTypes.AtlasJSON) => {
                    setTextures(getTextures(result, "hero"))
                },
            )
    }, [textures])

    useEffect(() => {
        if (heroRef.current && textures) {
            heroRef.current.textures = textures[hero.state]
            if (paused) {
                heroRef.current.stop()
            } else {
                heroRef.current.play()
            }
        }
    }, [hero.state, textures, paused, heroRef])

    useEffect(() => {
        if (!isBulletActive && ["player-run-shot", "player-shoot-up", "player-stand"].some(state => state === hero.state)) {
            setIsBulletActive(true)
            ref.current?.off("pointermove")
        }
    }, [isBulletActive, hero.state])

    useEffect(() => {
        ref.current?.on("pointermove", (event: any) => {
            setPointer(event.global)
        })
        return () => { ref.current?.off("pointermove") }
    }, [ref])

    const onComplete = () => {
        setIsBulletActive(false)
    }

    return (textures && ref.current) ? (
        <>
            <pixiAnimatedSprite
                textures={textures[hero.state]}
                ref={heroRef}
                anchor={0.5}
                eventMode={"static"}
                scale={2.5}
                animationSpeed={0.1}
                x={ref.current.screenWidth / 2}
                y={ref.current.screenHeight / 2}
                interactive={true}
                hitArea={new Rectangle(0, 0, heroSize, heroSize)}
                zIndex={zindex.hero}
                label="hero"
                autoPlay
                loop
            />
            {(pointer && isBulletActive && heroRef.current) ? (<Bullet
                onComplete={onComplete}
                bulletRef={bulletRef}
                textures={textures["shot"]}
                x={heroRef.current.position.x + (heroSize / 2)}
                y={heroRef.current.position.y - 7}
                pointer={pointer}
            />) : null}
        </>
    ) : null
}

export default Hero
