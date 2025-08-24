import { forwardRef } from "react"
import { useExtend } from "@pixi/react"
import { TilingSprite, Texture } from "pixi.js"

type Props = {
    texture: Texture
    tileScale?: { x: number; y: number }
    tilePosition?: { x: number; y: number }
    width: number
    height: number
}

const CustomTilingSprite = forwardRef<any, Props>(
    ({ texture, tileScale, tilePosition, width, height, ...props }, ref) => {
        useExtend({ TilingSprite })

        return (
            <tilingSprite
                ref={ref}
                texture={texture}
                width={width}
                height={height}
                tileScale={tileScale || { x: 1, y: 1 }}
                tilePosition={tilePosition || { x: 0, y: 0 }}
                {...props}
            />
        )
    }
)

CustomTilingSprite.displayName = "CustomTilingSprite"

export default CustomTilingSprite
