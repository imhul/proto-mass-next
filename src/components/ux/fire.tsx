import { useEffect, useRef } from "react"

const FIRE = { NOT_BURNING: 0, BURNING: 36 }
const intensity = 1.8

class FirePixel {
    #fireColorPalette = [
        "#1f0707", "#1f0707", "#2f0f07", "#470f07", "#571707", "#671f07", "#771f07",
        "#8f2707", "#9f2f07", "#ad3f07", "#bf4707", "#c74707", "#df4f07", "#df5707",
        "#df5707", "#d75f07", "#d75f07", "#d7670f", "#cf6f0f", "#cf770f", "#cf7f0f",
        "#cf8717", "#c78717", "#c78f17", "#c7971f", "#bf9f1f", "#bf9f1f", "#bfa727",
        "#bfa727", "#bfaf2f", "#b7af2f", "#b7b72f", "#b7b737", "#b7b737", "#b7b737",
        "#b7b737", "#b7b737"
    ]

    constructor(x: number, y: number, colorIndex: number, private context: CanvasRenderingContext2D) {
        this.x = x
        this.y = y
        this.updateColorIndex(colorIndex)
    }

    x: number
    y: number
    colorIndex!: number

    getColorIndex() {
        return this.colorIndex
    }

    updateColorIndex(colorIndex: number) {
        this.colorIndex = colorIndex
        this.context.fillStyle = this.#fireColorPalette[colorIndex]
        this.context.fillRect(this.x, this.y, 1, 1)
    }
}

class FireGrid {
    #grid: FirePixel[] = []
    width: number
    height: number
    lastPixelIndex: number

    constructor(private context: CanvasRenderingContext2D) {
        this.width = context.canvas.width
        this.height = context.canvas.height
        this.lastPixelIndex = this.width * this.height - 1
    }

    createFireGrid() {
        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                const pixel = new FirePixel(col, row, FIRE.NOT_BURNING, this.context)
                this.#grid.push(pixel)
            }
        }
    }

    hasFireSource(isIgnited = true) {
        const firstPixelOfLastLineIndex = this.lastPixelIndex - this.width + 1
        for (let i = this.lastPixelIndex; i >= firstPixelOfLastLineIndex; i--) {
            const colorIndex = isIgnited ? FIRE.BURNING : FIRE.NOT_BURNING
            this.#grid[i].updateColorIndex(colorIndex)
        }
    }

    setFireIntensity(intensity: number) {
        for (let i = this.lastPixelIndex; i >= 0; i--) {
            const abovePixelIndex = (i - this.width) - Math.floor(Math.random() * 2)
            if (abovePixelIndex >= 0) {
                const flameDecay = Math.floor(Math.random() * intensity)
                const fireIntensity = this.#grid[i].getColorIndex() - flameDecay
                const colorIndex = fireIntensity >= 0 ? fireIntensity : FIRE.NOT_BURNING
                this.#grid[abovePixelIndex].updateColorIndex(colorIndex)
            }
        }
    }
}

export const FireCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const context = canvas.getContext("2d")
        if (!context) return
        const grid = new FireGrid(context)
        grid.createFireGrid()
        let animationFrameId: number
        const animate = () => {
            grid.hasFireSource(true)
            grid.setFireIntensity(intensity)
            animationFrameId = requestAnimationFrame(animate)
        }

        animationFrameId = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animationFrameId)
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                width: "100%",
                height: "70vh",
                imageRendering: "pixelated",
                position: "fixed",
                bottom: 0,
                left: 0,
            }}
        >
            Your browser does not support canvas tag!
        </canvas>
    )
}

export default FireCanvas
