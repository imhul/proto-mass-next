// store
import { usePersistedStore } from "@/store"

const DevDot = ({ x, y, width, height, ...props }: all.game.DevComponentProps) => {
    const showDots = usePersistedStore((state: all.store.PersistedStore) => state.showDots)

    return showDots ? (
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