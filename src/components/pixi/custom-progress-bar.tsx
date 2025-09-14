import { forwardRef, useEffect, useRef } from "react"
import { useExtend } from "@pixi/react"
import { Graphics } from "pixi.js"
import { ProgressBar } from "@pixi/ui"
// types
import type { gameTypes } from "@lib/types"
// config
import { colors } from "@lib/config"

const CustomProgressBar = forwardRef<ProgressBar | null, gameTypes.ProgressBarProps>(
    ({ position, min, max, current }, ref) => {
        useExtend({ ProgressBar })
        const barRef = useRef<ProgressBar | null>(null)

        useEffect(() => {
            if (typeof ref !== "function" && (!ref || !("current" in ref) || !ref.current)) return
            if (barRef.current) return

            const bar = new ProgressBar({
                // bg: 'path/to/background_image.png', // Optional: image for the background
                // fill: 'path/to/fill_image.png',     // Optional: image for the progress fill
                bg: new Graphics().fill(colors.gray).rect(0, 0, 200, 20).fill(),
                fill: new Graphics().fill(colors.green).rect(0, 0, 200, 20).fill(),
            })

            bar.label = "progress-bar"
            bar.width = 12
            bar.height = 2
            bar.zIndex = 2000
            bar.alpha = 0.85
            bar.progress = 0

            barRef.current = bar
            if (typeof ref === "function") {
                ref(bar)
            } else if (ref && "current" in ref && ref.current) {
                ref.current.addChild(bar)
            }
        }, [])

        useEffect(() => {
            if (!barRef.current) return
            const bar = barRef.current

            const sectionOne = Math.floor(max / 3)
            const sectionTwo = sectionOne * 2

            if (current <= sectionOne) {
                bar.setFill(new Graphics().fill(colors.yellow).rect(0, 0, 200, 20).fill())
            } else if (current <= sectionTwo) {
                bar.setFill(new Graphics().fill(colors.red).rect(0, 0, 200, 20).fill())
            }
            bar.progress = current
            if (position) {
                bar.x = position.x + bar.width / 2
                bar.y = position.y
            }
        }, [current, min, max, position])

        return <pixiContainer ref={ref} label="progress-bar" />
    }
)

CustomProgressBar.displayName = "ProgressBar"
export default CustomProgressBar
