import { useEffect } from "react"
import { ColorMatrixFilter } from "pixi.js"
// types
import type { Sprite, AnimatedSprite } from "@lib/types"
// utils
import { delay } from '@lib/utils'
// config
import { birthAnimationSteps } from '@lib/config'

export const useBirthAnimation = (
    ref: React.RefObject<Sprite | AnimatedSprite> | null = null,
    active: boolean,
    type: "enemy" | "base"
) => {
    useEffect(() => {
        if (!ref?.current) return
        const sprite = ref.current
        if (!sprite) return

        if (!active) {
            sprite.alpha = 1
            sprite.filters = []
            return
        }

        let cancelled = false
        // console.info("useBirthAnimation called: ", { type, active, sprite })

        const runAnimation = async () => {
            for (const step of Object.values(birthAnimationSteps)) {
                if (cancelled) break
                sprite.alpha = step.opacity
                sprite.filters = step.filter ? [new ColorMatrixFilter({ resolution: 2, blendMode: "multiply" })] : []
                await delay(step.duration)
            }
        }

        runAnimation()

        return () => {
            cancelled = true
            sprite.filters = []
        }
    }, [active, ref, type])
}
