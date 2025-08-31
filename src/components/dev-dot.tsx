// store
import { usePersistedStore } from "@/store"
// types
import type { storeTypes, gameTypes } from "@lib/types"

const DevDot = ({ x, y, width, height, ...props }: gameTypes.DevComponentProps) => {
    const isDev = usePersistedStore((state: storeTypes.PersistedStore) => state.isDev)

    return isDev ? (
        <pixiGraphics
            draw={(g) => {
                g.clear()
                g.rect(x, y - (height / 2), 2, 2)
                g.zIndex = 1000
                g.setStrokeStyle({
                    width: 4,
                    color: 0xff0000,
                    alpha: 1,
                }).stroke()
            }}
            {...props}
        />
    ) : null
}

export default DevDot