import { forwardRef } from "react"
import { extend } from "@pixi/react"
import { TilingSprite, Texture } from "pixi.js"

extend({ TilingSprite })

type Props = {
    texture: Texture
    tileScale?: { x: number; y: number }
    tilePosition?: { x: number; y: number }
    width: number
    height: number
}

const CustomTilingSprite = forwardRef<any, Props>(
    ({ texture, tileScale, tilePosition, width, height, ...props }, ref) => {
        return (
            // @ts-ignore
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
