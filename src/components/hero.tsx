import { useEffect, useRef, useState } from 'react'
// store
import { usePersistedStore } from '@/store'
// components
import { Assets, AnimatedSprite } from 'pixi.js'
// types
import {
    AtlasJSON,
    HeroTextures,
    PersistedStore,
    HeroProps,
} from '@lib/types'
// utils
import { getTextures } from '@lib/utils'

const Hero = ({ state, ref, }: HeroProps) => {
    const spriteRef = useRef<AnimatedSprite | null>(null) // The Pixi.js `Sprite`
    // state
    const [atlasJson, setAtlasJson] = useState<AtlasJSON | null>(null)
    const [isHovered, setIsHover] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [textures, setTextures] = useState<HeroTextures>(null)
    // store
    const paused = usePersistedStore((state: PersistedStore) => state.paused)

    useEffect(() => {
        if (!atlasJson || !textures) Assets
            .load('/assets/atlas.json')
            .then((result: AtlasJSON) => {
                setAtlasJson(result)
                setTextures(getTextures(result))
            })
    }, [atlasJson, textures])

    useEffect(() => {
        if (spriteRef.current && textures) {
            spriteRef.current.textures = textures[state]
            paused ? spriteRef.current.stop() : spriteRef.current.play()
        }
    }, [state, textures, paused, spriteRef])

    return (atlasJson && textures && ref.current) ? (
        <pixiAnimatedSprite
            textures={textures[state]}
            ref={spriteRef}
            anchor={0.5}
            eventMode={'static'}
            onClick={() => setIsActive(!isActive)}
            onPointerOver={() => setIsHover(true)}
            onPointerOut={() => setIsHover(false)}
            scale={isHovered ? 3.5 : 3}
            animationSpeed={isActive ? 0.2 : 0.1}
            x={ref.current.screenWidth / 2}
            y={ref.current.screenHeight / 2}
            label="hero"
            autoPlay
            loop
        />
    ) : null
}

export default Hero
