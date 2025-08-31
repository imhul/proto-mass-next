import { useState, useEffect, useRef } from "react"
// store
import { usePersistedStore } from "@/store"
// types
import type { storeTypes, gameTypes, Sprite } from "@lib/types"
// utils
import { getRandomInt } from "@lib/utils"

let count = 0

const Maggot = ({ texture, width, height, item }: gameTypes.MaggotProps) => {
    const spriteRef = useRef<Sprite | null>(null)
    const [started, setStarted] = useState(false)
    const animationFrameRef = useRef<number | null>(null)
    const directionRef = useRef(item.direction)
    const paused = usePersistedStore((state: storeTypes.PersistedStore) => state.paused)

    const scheduleTurn = () => {
        const pauseBeforeNextTurn = getRandomInt(5000, 15000)
        setTimeout(() => {
            directionRef.current = Math.random() * Math.PI * 2
            scheduleTurn()
        }, pauseBeforeNextTurn)
    }

    const maggotsAnimation = () => {
        const maggotRef = spriteRef?.current
        if (!maggotRef) return
        count += 0.5
        item.direction = directionRef.current
        maggotRef.x += Math.sin(item.direction) * item.speed
        maggotRef.y += Math.cos(item.direction) * item.speed
        maggotRef.rotation = -item.direction - Math.PI / 2
        maggotRef.scale.x = item.original.x + Math.sin(count) * 0.2

        // Wrap by screen
        if (maggotRef.x < 0) {
            maggotRef.x += width
        } else if (maggotRef.x > width) {
            maggotRef.x -= width
        }

        if (maggotRef.y < 0) {
            maggotRef.y += height
        } else if (maggotRef.y > height) {
            maggotRef.y -= height
        }
    }

    const runAnimation = () => {
        setStarted(true)
        maggotsAnimation()
        animationFrameRef.current = requestAnimationFrame(runAnimation)
    }

    const startRun = () => {
        if (animationFrameRef.current)
            cancelAnimationFrame(animationFrameRef.current)
        runAnimation()
    }

    useEffect(() => {
        if (paused) {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
                animationFrameRef.current = null
            }
            return
        }

        if (!started) {
            setStarted(true)
            scheduleTurn()
        }

        const loop = () => {
            maggotsAnimation()
            animationFrameRef.current = requestAnimationFrame(loop)
        }

        animationFrameRef.current = requestAnimationFrame(loop)

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
                animationFrameRef.current = null
            }
        }
    }, [paused])

    return (
        <pixiSprite
            ref={spriteRef}
            texture={texture}
            anchor={0.5}
            scale={item.scale}
            x={item.x}
            y={item.y}
            label={`maggot-${item.id}`}
        />
    )
}

export default Maggot
