import { useEffect, useRef, useState } from "react"
import { useExtend } from "@pixi/react"
import { Graphics } from "pixi.js"

const FIRE = { NOT_BURNING: 0, BURNING: 36 }

const fireColorPalette = [
    '#070707', '#1f0707', '#2f0f07', '#470f07', '#571707', '#671f07', '#771f07',
    '#8f2707', '#9f2f07', '#ad3f07', '#bf4707', '#c74707', '#df4f07', '#df5707',
    '#df5707', '#d75f07', '#d75f07', '#d7670f', '#cf6f0f', '#cf770f', '#cf7f0f',
    '#cf8717', '#c78717', '#c78f17', '#c7971f', '#bf9f1f', '#bf9f1f', '#bfa727',
    '#bfa727', '#bfaf2f', '#b7af2f', '#b7b72f', '#b7b737', '#cfcf6f', '#dfdf9f',
    '#efefc7', '#ffffff'
]

type FireProps = {
    width: number
    height: number
    intensity?: number
    pixelSize?: number
}

const PixiFire = ({
    width,
    height,
    intensity = 6,
    pixelSize = 2,
}: FireProps) => {
    useExtend({ Graphics })
    // state
    const [grid, setGrid] = useState<number[]>([])
    const lastPixelIndex = width * height - 1
    const gridRef = useRef<number[]>([])
    const fireRef = useRef<Graphics | null>(null)

    useEffect(() => {
        const arr = Array(width * height).fill(FIRE.NOT_BURNING)
        gridRef.current = arr
        setGrid([...arr])
    }, [width, height])

    const updateFire = () => {
        const newGrid = [...gridRef.current]
        const firstPixelOfLastLine = lastPixelIndex - width + 1
        for (let i = lastPixelIndex; i >= firstPixelOfLastLine; i--) {
            newGrid[i] = FIRE.BURNING
        }

        for (let i = 0; i < lastPixelIndex; i++) {
            const abovePixelIndex = i - width - Math.floor(Math.random() * 2)
            if (abovePixelIndex >= 0) {
                const decay = Math.floor(Math.random() * intensity)
                const newIntensity = newGrid[i] - decay
                newGrid[abovePixelIndex] = newIntensity >= 0 ? newIntensity : FIRE.NOT_BURNING
            }
        }

        gridRef.current = newGrid
        setGrid(newGrid)
    }

    useEffect(() => {
        let frameId: number
        const tick = () => {
            updateFire()
            frameId = requestAnimationFrame(tick)
        }
        frameId = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(frameId)
    }, [])

    return (
        <pixiGraphics
            x={0}
            y={0}
            ref={fireRef}
            draw={(g) => {
                g.clear()
                grid.forEach((colorIndex, i) => {
                    if (colorIndex === FIRE.NOT_BURNING) return
                    const x = (i % width) * pixelSize
                    const y = Math.floor(i / width) * pixelSize
                    g.fill(fireColorPalette[colorIndex])
                    g.rect(x, y, pixelSize, pixelSize)
                    g.fill()
                })
            }}
        />
    )
}

export default PixiFire