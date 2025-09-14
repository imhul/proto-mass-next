import { forwardRef, useEffect, useState } from "react"
import { GifSprite, type GifSource } from "pixi.js/gif"
import { useExtend } from "@pixi/react"
import { Assets } from "pixi.js"

const CustomGifSprite = forwardRef<GifSprite, all.game.CustomGifSpriteProps>(
    ({
        url,
        position,
        loop = false,
        auto = true,
        speed = 1,
        scale = 1,
        onComplete,
    }, ref) => {
        useExtend({ GifSprite })
        const [source, setSource] = useState<GifSource | null>(null)

        useEffect(() => {
            if (url && !source) {
                Assets.load(url).then((asset: GifSource) => setSource(asset))
            }
        }, [url])

        return source ? (
            <pixiGifSprite
                ref={ref}
                loop={loop}
                scale={scale}
                x={position.x}
                y={position.y}
                source={source}
                autoPlay={auto}
                animationSpeed={speed}
                onComplete={onComplete}
            />
        ) : null
    }
)

CustomGifSprite.displayName = "CustomGifSprite"
export default CustomGifSprite
