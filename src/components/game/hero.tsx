import { useEffect, useRef, useState } from "react"
// store
import { usePersistedStore } from "@/store"
// components
import DevHitbox from "@components/game/dev-hitbox"
import { Assets, AnimatedSprite, Rectangle } from "pixi.js"
// types
import type { storeTypes, gameTypes } from "@lib/types"
// utils
import { getTextures } from "@lib/utils"
// config
import { zindex, heroSize, heroScale, bulletSpeed, maxBulletDistance } from "@lib/config"

const heroBonus = {
    bulletSpeed: 0,
    bulletDistance: 0,
}

const Hero = ({ ref }: gameTypes.HeroProps) => {
    const heroRef = useRef<AnimatedSprite | null>(null)
    // state
    const [isBulletActive, setIsBulletActive] = useState(false)
    const [textures, setTextures] = useState<gameTypes.TexturesCollection>(null)
    const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null)
    // store
    const hero = usePersistedStore((state: storeTypes.PersistedStore) => state.hero)
    const paused = usePersistedStore((state: storeTypes.PersistedStore) => state.paused)
    const heroName = usePersistedStore((state: storeTypes.PersistedStore) => state.heroName)
    const heroState = usePersistedStore((state: storeTypes.PersistedStore) => state.hero.state)
    const setHeroName = usePersistedStore((state: storeTypes.PersistedStore) => state.setHeroName)
    const heroPosition = usePersistedStore((state: storeTypes.PersistedStore) => state.hero.position)
    const setGameAction = usePersistedStore((state: storeTypes.PersistedStore) => state.setGameAction)
    const showHeroHitbox = usePersistedStore((state: storeTypes.PersistedStore) => state.showHeroHitbox)
    const setHeroPosition = usePersistedStore((state: storeTypes.PersistedStore) => state.setHeroPosition)
    const keyBindings = usePersistedStore((state: storeTypes.PersistedStore) => state.preferences.keyBindings)

    const onKeydown = (event: any) => {
        let globalX = 0
        const { keyCodes, keys, codes } = keyBindings.shoot
        ref.current?.on("pointermove", (event: any) => {
            if (!ref.current) return
            const localPointer = ref.current.toLocal(event.global)
            setPointer(localPointer)
            globalX = localPointer.x
            if (heroRef.current && !["player-run", "player-run-shot"].some(state => state === heroState)) {
                heroRef.current.scale.x = heroRef.current.position.x < globalX ? heroScale : -heroScale
            }
        })

        if ((event.key === keys[0] || event.code === codes[0] || event.keyCode === keyCodes[0]) && heroRef.current && globalX !== 0) {
            heroRef.current.scale.x = heroRef.current.position.x < globalX ? heroScale : -heroScale
        }
    }

    useEffect(() => {
        if (!textures)
            Assets.load("/assets/hero/atlas.json").then(
                (result: gameTypes.AtlasJSON) => {
                    setTextures(getTextures(result, "hero"))
                },
            )
    }, [textures])

    useEffect(() => {
        window.addEventListener("keydown", onKeydown)
        return () => {
            ref.current?.off("pointermove")
            window.removeEventListener("keydown", onKeydown)
        }
    }, [])

    useEffect(() => {
        if (!heroRef?.current || !textures) return
        if (paused) {
            heroRef.current.stop()
        } else {
            heroRef.current.textures = textures[heroState]
            heroRef.current.play()

            if (["player-run-shot", "player-shoot-up", "player-stand"].some(state => state === heroState)) {
                if (pointer && !isBulletActive) {
                    setGameAction("addBullet", {
                        id: crypto.randomUUID(),
                        x: heroRef.current.position.x < pointer.x
                            ? heroRef.current.position.x + (heroSize / 2)
                            : heroRef.current.position.x - (heroSize / 2),
                        y: heroRef.current.position.y - 7,
                        direction: pointer,
                        owner: "hero",
                        speed: bulletSpeed + heroBonus.bulletSpeed,
                        distance: maxBulletDistance + heroBonus.bulletDistance,
                    })
                    setIsBulletActive(true)
                    setTimeout(() => setIsBulletActive(false), Math.floor(1000 / hero.shooting))
                }
                if (ref?.current) ref.current.off("pointermove")
            } else if (heroState === "player-idle") {
                const { x, y } = heroRef.current.position
                setHeroPosition({ x, y })
            }
        }
    }, [isBulletActive, heroState, heroRef.current, textures, pointer])

    useEffect(() => {
        if (!hero.name && heroName) setHeroName(heroName)
    }, [heroName])

    return (textures && ref.current) ? (
        <>
            <pixiAnimatedSprite
                textures={textures[heroState]}
                ref={heroRef}
                anchor={0.5}
                eventMode={"static"}
                scale={heroScale}
                animationSpeed={heroState !== "player-idle" ? 0.2 : 0.1}
                x={heroPosition.x !== 0 ? heroPosition.x : ref.current.screenWidth / 2}
                y={heroPosition.y !== 0 ? heroPosition.y : ref.current.screenHeight / 2}
                interactive={true}
                hitArea={new Rectangle(0, 0, heroSize, heroSize)}
                zIndex={zindex.hero}
                label="hero"
                autoPlay
                loop
            />
            {showHeroHitbox && (<DevHitbox
                x={heroPosition.x !== 0 ? heroPosition.x : ref.current.screenWidth / 2}
                y={heroPosition.y !== 0 ? heroPosition.y : ref.current.screenHeight / 2}
                width={heroSize}
                height={heroSize}
                label={`hero-dev-hitbox`}
            />)}
        </>
    ) : null
}

export default Hero
