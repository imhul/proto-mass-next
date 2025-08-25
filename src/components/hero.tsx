import { useEffect, useRef, useState } from "react"
// store
import { usePersistedStore } from "@/store"
// components
import { Assets, AnimatedSprite, Rectangle } from "pixi.js"
import DevHitbox from "@components/dev-hitbox"
// types
import { PersistedStore, heroTypes, commonTypes } from "@lib/types"
// utils
import { getTextures } from "@lib/utils"

const Hero = ({ state, ref }: heroTypes.HeroProps) => {
    const spriteRef = useRef<AnimatedSprite | null>(null) // The Pixi.js `Sprite`
    // state
    const [atlasJson, setAtlasJson] = useState<commonTypes.AtlasJSON | null>(null)
    const [isHovered, setIsHover] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [textures, setTextures] = useState<heroTypes.HeroTextures>(null)
    // store
    const paused = usePersistedStore((state: PersistedStore) => state.paused)

    useEffect(() => {
        if (!atlasJson || !textures)
            Assets.load("/assets/atlas.json").then(
                (result: commonTypes.AtlasJSON) => {
                    setAtlasJson(result)
                    setTextures(getTextures(result))
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
            }
        }
    }, [state, textures, paused, spriteRef])

    return atlasJson && textures && ref.current ? (
        <>
            <DevHitbox
                x={spriteRef.current?.position.x ?? ref.current.screenWidth / 2}
                y={spriteRef.current?.position.y ?? ref.current.screenHeight / 2}
                width={textures["run"][0].width}
                height={textures["run"][0].height}
                label="dev-hero-hitbox"
            />
            <pixiAnimatedSprite
                textures={textures[state]}
                ref={spriteRef}
                anchor={0.5}
                eventMode={"static"}
                onClick={() => setIsActive(!isActive)}
                onPointerOver={() => setIsHover(true)}
                onPointerOut={() => setIsHover(false)}
                scale={isHovered ? 3.5 : 3}
                animationSpeed={isActive ? 0.2 : 0.1}
                x={ref.current.screenWidth / 2}
                y={ref.current.screenHeight / 2}
                interactive={true}
                hitArea={
                    new Rectangle(
                        0,
                        0,
                        textures["run"][0].width,
                        textures["run"][0].height,
                    )
                }
                label="hero"
                zIndex={100}
                autoPlay
                loop
            // filters={[new Filter({ resolution: 4, blendMode: "multiply" })]}
            />
        </>
    ) : null
}

export default Hero
