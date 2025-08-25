import { useState, useEffect, useRef } from "react"
// types
import type { gameTypes, Sprite } from "@lib/types"

let count = 0

const Maggot = ({ texture, width, height, item }: gameTypes.MaggotProps) => {
    const spriteRef = useRef<Sprite | null>(null)
    const [started, setStarted] = useState(false)
    const animationFrameRef = useRef<number | null>(null)

    const maggotsAnimation = () => {
        const maggotRef = spriteRef?.current
        if (!maggotRef) return
        count += 12

        item.direction += item.turnSpeed * 0.01
        maggotRef.x += Math.sin(item.direction) * item.speed
        maggotRef.y += Math.cos(item.direction) * item.speed

        maggotRef.rotation = -item.direction - Math.PI / 2
        maggotRef.scale.x = item.original.x + Math.sin(count) * 0.2

        // Wrap the maggots around as they crawl
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
        animationFrameRef.current = requestAnimationFrame(() => runAnimation())
    }

    const startRun = () => {
        if (animationFrameRef.current)
            cancelAnimationFrame(animationFrameRef.current)
        runAnimation()
    }

    useEffect(() => {
        if (!started) startRun()
    }, [started])

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
