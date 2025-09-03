import { forwardRef, useEffect, useRef } from "react"
import { useExtend } from "@pixi/react"
import { Graphics } from "pixi.js"
import { ProgressBar } from '@pixi/ui'
// types
import type { gameTypes, Container } from "@lib/types"

const CustomProgressBar = forwardRef<ProgressBar | null, gameTypes.ProgressBarProps>(
    ({ position, min, max, current }, _) => {
        useExtend({ ProgressBar })
        const progress = Math.min(Math.max(current, min), max)

        const bar = new ProgressBar({
            progress,
            // bg: 'path/to/background_image.png', // Optional: image for the background
            // fill: 'path/to/fill_image.png',     // Optional: image for the progress fill
            bg: new Graphics().fill(0x555555).rect(0, 0, 200, 20).fill(),
            fill: new Graphics().fill(0x00ff00).rect(0, 0, 200, 20).fill(),
        })

        bar.width = window.innerWidth
        bar.height = 10
        bar.x = position.x ? position.x : 0
        bar.y = position.y ? position.y : 0
        const containerRef = useRef<Container | null>(null)

        useEffect(() => {
            if (containerRef.current) {
                containerRef.current.addChild(bar)
            }
        }, [bar, containerRef.current])

        return (<pixiContainer ref={containerRef} />)
    },
)

CustomProgressBar.displayName = "ProgressBar"
export default CustomProgressBar