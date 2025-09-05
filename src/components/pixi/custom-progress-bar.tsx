import { forwardRef, useEffect, useRef } from "react"
import { useExtend } from "@pixi/react"
import { Graphics } from "pixi.js"
import { ProgressBar } from "@pixi/ui"
// types
import type { gameTypes, Container } from "@lib/types"

const CustomProgressBar = forwardRef<ProgressBar | null, gameTypes.ProgressBarProps>(
    ({ position, min, max, current }, _) => {
        useExtend({ ProgressBar })
        const containerRef = useRef<Container | null>(null)
        const barRef = useRef<ProgressBar | null>(null)

        // 1️⃣ Створюємо ProgressBar тільки один раз
        useEffect(() => {
            if (!containerRef.current) return
            if (barRef.current) return // вже є

            const bar = new ProgressBar({
                // bg: 'path/to/background_image.png', // Optional: image for the background
                // fill: 'path/to/fill_image.png',     // Optional: image for the progress fill
                bg: new Graphics().fill(0x555555).rect(0, 0, 200, 20).fill(),
                fill: new Graphics().fill(0x00ff00).rect(0, 0, 200, 20).fill(),
            })

            bar.label = "progress-bar"
            bar.width = 600
            bar.height = 10
            bar.zIndex = 1000
            bar.alpha = 0.8
            bar.progress = 0

            barRef.current = bar
            containerRef.current.addChild(bar)
        }, [])

        // 2️⃣ Оновлюємо позицію і прогрес при зміні current / position
        useEffect(() => {
            if (!barRef.current) return
            const bar = barRef.current
            const progress = Math.min(Math.max(current, min), max)

            bar.progress = progress
            if (position) {
                bar.x = position.x + bar.width / 2
                bar.y = position.y
            }
        }, [current, min, max, position])

        return <pixiContainer ref={containerRef} />
    }
)

CustomProgressBar.displayName = "ProgressBar"
export default CustomProgressBar


// const bar = new ProgressBar({
//     // bg: 'path/to/background_image.png', // Optional: image for the background
//     // fill: 'path/to/fill_image.png',     // Optional: image for the progress fill
//     bg: new Graphics().fill(0x555555).rect(0, 0, 200, 20).fill(),
//     fill: new Graphics().fill(0x00ff00).rect(0, 0, 200, 20).fill(),
// })

// bar.label = "progress-bar"
// bar.width = 600
// bar.height = 10
// bar.zIndex = 1000
// bar.alpha = 0.8
// bar.progress = 0

// const CustomProgressBar = forwardRef<ProgressBar | null, gameTypes.ProgressBarProps>(
//     ({ position, min, max, current }, _) => {
//         useExtend({ ProgressBar })
//         const containerRef = useRef<Container | null>(null)
//         const progress = Math.min(Math.max(current, min), max)
//         console.info("Rendering ProgressBar: ", { position, progress })

//         useEffect(() => {
//             if (containerRef.current && bar && position) {
//                 bar.progress = progress
//                 bar.x = position.x + bar.width / 2
//                 bar.y = position.y
//                 if (containerRef.current.children.length) {
//                     const readyBar = containerRef.current.children[0] as ProgressBar
//                     readyBar.progress = progress
//                     readyBar.x = position.x + bar.width / 2
//                     readyBar.y = position.y
//                     console.info("bar already exists: ", { ...position, readyBar })
//                     return
//                 }
//                 containerRef.current.addChild(bar)
//             }
//         }, [bar, position, containerRef, progress])

//         return (<pixiContainer ref={containerRef} />)
//     },
// )
