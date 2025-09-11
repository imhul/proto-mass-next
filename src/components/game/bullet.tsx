
import { useEffect, useRef, useState } from "react"
// store
import { usePersistedStore } from "@/store"
// types
import type { storeTypes, gameTypes, AnimatedSprite } from "@lib/types"
// components
import { Rectangle } from "pixi.js"
// config
import { zindex } from "@lib/config"

const Bullet = ({
    x,
    y,
    id,
    speed,
    owner,
    distance,
    textures,
    direction,
    onComplete,
}: gameTypes.BulletProps) => {
    // refs
    const bulletRef = useRef<AnimatedSprite | null>(null)
    const animationFrameRef = useRef<number | null>(null)
    // store
    const hero = usePersistedStore((state: storeTypes.PersistedStore) => state.hero)
    const paused = usePersistedStore((state: storeTypes.PersistedStore) => state.paused)
    // state
    const [started, setStarted] = useState(false)

    const stopBullet = () => {
        if (!bulletRef?.current) return
        bulletRef.current.stop()
        animationFrameRef.current && cancelAnimationFrame(animationFrameRef.current)
        onComplete()
    }

    const startBullet = () => {
        if (!bulletRef?.current || !direction) return
        setStarted(true)

        const angle = Math.atan2(
            direction.y - y,
            direction.x - x,
        )

        const velocity = {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed,
        }
        let distanceTraveled = 0

        const updateBullet = () => {
            if (!bulletRef?.current) return
            bulletRef.current.x += velocity.x
            bulletRef.current.y += velocity.y
            distanceTraveled += speed

            if (distanceTraveled < distance) {
                animationFrameRef.current = requestAnimationFrame(updateBullet)
            } else {
                stopBullet()
            }
        }
        animationFrameRef.current = requestAnimationFrame(updateBullet)
    }

    useEffect(() => {
        if (!bulletRef.current) return
        if (paused) {
            bulletRef.current.stop()
            animationFrameRef.current && cancelAnimationFrame(animationFrameRef.current)
        } else if (!started && !paused) {
            startBullet()
            bulletRef.current.play()
        }
    }, [hero.state, paused, bulletRef.current, started])

    return textures ? (<pixiAnimatedSprite
        textures={textures}
        ref={bulletRef}
        anchor={0.5}
        eventMode={"static"}
        scale={2}
        animationSpeed={0.1}
        x={x}
        y={y}
        interactive={true}
        hitArea={new Rectangle(0, 0, 2, 2)}
        zIndex={zindex.bullet}
        label={`bullet-${owner}-${id}`}
        autoPlay
        loop
    />) : null
}

export default Bullet
