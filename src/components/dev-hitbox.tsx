// store
import { usePersistedStore } from "@/store"
// types
import type { PersistedStore } from "@lib/types"

export type DevHitboxProps = {
    x: number
    y: number
    width: number
    height: number
    [key: string]: unknown
}

const DevHitbox = ({ x, y, width, height, ...props }: DevHitboxProps) => {
    const isDev = usePersistedStore((state: PersistedStore) => state.isDev)

    return isDev ? (
        <pixiGraphics
            draw={(g) => {
                g.clear()
                g.rect(x - width / 2, y - height / 2, width, height)
                g.setStrokeStyle({
                    width: 4,
                    color: 0xff0000,
                    alpha: 0.4,
                }).stroke()
            }}
            {...props}
        />
    ) : null
}

export default DevHitbox
