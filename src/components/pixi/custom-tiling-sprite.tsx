import { forwardRef } from "react"
import { useExtend } from "@pixi/react"
import { TilingSprite } from "pixi.js"
// types
import type { commonTypes, PixiTilingSprite } from "@lib/types"

const CustomTilingSprite = forwardRef<PixiTilingSprite | null, commonTypes.CustomTilingSpriteProps>(
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
    },
)

CustomTilingSprite.displayName = "CustomTilingSprite"

export default CustomTilingSprite
