import { forwardRef, useEffect, useState } from "react"
import { useExtend } from "@pixi/react"
import { Assets } from "pixi.js"
import { GifSprite, type GifSource } from "pixi.js/gif"

const CustomGifSprite = forwardRef<GifSprite, { url: string }>(
    ({ url }, ref) => {
        useExtend({ GifSprite })
        const [source, setSource] = useState<GifSource | null>(null)

        useEffect(() => {
            if (url) {
                Assets.load(url).then((asset: GifSource) => setSource(asset))
            }
        }, [url])

        if (!source) return null

        return (
            <pixiGifSprite
                ref={ref}
                source={source}
                x={100}
                y={100}
                loop={false}
                autoPlay={true}
                animationSpeed={1}
            />
        )
    }
)

CustomGifSprite.displayName = "CustomGifSprite"
export default CustomGifSprite
