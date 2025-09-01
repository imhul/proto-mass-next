import { useEffect, useRef, useState } from "react"
// store
import { useStore, usePersistedStore } from "@/store"
// hooks
import { useMove } from "@hooks/useMove"
// components
import { Assets, AnimatedSprite, Rectangle } from "pixi.js"
// types
import type { storeTypes, gameTypes } from "@lib/types"
// utils
import { getTextures } from "@lib/utils"
// config
import { zindex, heroSize } from "@lib/config"

const Hero = ({ ref }: gameTypes.HeroProps) => {
    const spriteRef = useRef<AnimatedSprite | null>(null)
    // state
    const [textures, setTextures] = useState<gameTypes.TexturesCollection>(null)
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
        if (spriteRef.current && textures) {
            spriteRef.current.textures = textures[hero.state]
            if (paused) {
                spriteRef.current.stop();
            } else {
                spriteRef.current.play();
            }
        }
    }, [hero.state, textures, paused, spriteRef])

    return (textures && ref.current) ? (
        <>
            <pixiAnimatedSprite
                textures={textures[hero.state]}
                ref={spriteRef}
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
        </>
    ) : null
}

export default Hero
