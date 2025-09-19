import { useEffect, useRef, useState } from "react"
import { GlowFilter } from 'pixi-filters'
// store
import { usePersistedStore } from "@/store"
// components
import DevHitbox from "@components/game/dev-hitbox"
import { Assets, AnimatedSprite, Rectangle } from "pixi.js"
// utils
import { getTextures } from "@lib/utils"
// config
import { zindex, heroSize, heroScale, bulletSpeed, bulletDamage, maxBulletDistance } from "@lib/config"

type Store = all.store.PersistedStore

const heroBonus = {
    bulletSpeed: 0,
    bulletDistance: 0,
    bulletDamage: 1,
}

const Hero = ({ ref }: all.game.HeroProps) => {
    const heroRef = useRef<AnimatedSprite | null>(null)
    // state
    const [isBulletActive, setIsBulletActive] = useState(false)
    const [textures, setTextures] = useState<all.game.TexturesCollection>(null)
    const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null)
    // store
    const hero = usePersistedStore((s: Store) => s.hero)
    const paused = usePersistedStore((s: Store) => s.paused)
    const heroName = usePersistedStore((s: Store) => s.heroName)
    const heroState = usePersistedStore((s: Store) => s.hero.state)
    const setHeroName = usePersistedStore((s: Store) => s.setHeroName)
    const heroPosition = usePersistedStore((s: Store) => s.hero.position)
    const setGameAction = usePersistedStore((s: Store) => s.setGameAction)
    const showHeroHitbox = usePersistedStore((s: Store) => s.showHeroHitbox)
    const setHeroPosition = usePersistedStore((s: Store) => s.setHeroPosition)
    const keyBindings = usePersistedStore((s: Store) => s.preferences.keyBindings)

    const filter1 = new GlowFilter({
        color: 0xffff00,
        innerStrength: 0,
        outerStrength: 3,
    })

    const filter2 = new GlowFilter({
        color: 0xff4400,
        innerStrength: 2,
        outerStrength: 0,
    })

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
                (result: all.game.AtlasJSON) => {
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
                        damage: bulletDamage + hero.damage + (Number(hero.skills["shooting"].bonus.value) ?? 0),
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
                filters={[filter1, filter2]}
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
