import { useEffect, useRef, useState } from 'react'
// components
import { Assets, Texture, AnimatedSprite } from 'pixi.js'
// types
import { HeroClientProps, AtlasJSON, HeroState, HeroTextures, HeroTexturesObject } from '@lib/types'

const heroTexturesConfig: Record<HeroState, { count: number, uid: number }> = {
    "idle": { count: 4, uid: 31 },
    "run": { count: 10, uid: 41 },
    "run-shot": { count: 10, uid: 51 },
    "shoot-up": { count: 1, uid: 61 },
    "stand": { count: 3, uid: 62 },
    "hurt": { count: 2, uid: 29 }
}

const getTextures = (atlasJson: AtlasJSON | null): HeroTextures => {
    if (!atlasJson) return null
    const obj: HeroTexturesObject = {} as HeroTexturesObject
    const textureKeys = Object.keys(heroTexturesConfig) as HeroState[]
    textureKeys.forEach((item: HeroState) => {
        const texturesLength = heroTexturesConfig[item].count || 1
        obj[item] = Array.from({ length: texturesLength }, (_, i) => {
            const uid = heroTexturesConfig[item].uid + i + 6
            return new Texture(atlasJson.textures[uid])
        })
    })
    return obj
}

const Hero = ({ state }: HeroClientProps) => {
    const spriteRef = useRef<AnimatedSprite | null>(null) // The Pixi.js `Sprite`
    const [atlasJson, setAtlasJson] = useState<AtlasJSON | null>(null)
    const [isHovered, setIsHover] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [textures, setTextures] = useState<HeroTextures>(null)

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
            spriteRef.current.play()
        }
    }, [state, textures])

    return (atlasJson && textures) ? (
        <pixiAnimatedSprite
            textures={textures[state]}
            ref={spriteRef}
            anchor={0.5}
            eventMode={'static'}
            onClick={() => setIsActive(!isActive)}
            onPointerOver={() => setIsHover(true)}
            onPointerOut={() => setIsHover(false)}
            scale={isHovered ? 5.5 : 5}
            animationSpeed={isActive ? 0.2 : 0.1}
            // x={position.x}
            // y={position.y}
            autoPlay
            loop
        />
    ) : null
}

export default Hero
