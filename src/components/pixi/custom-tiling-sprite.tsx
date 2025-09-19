import { forwardRef, useEffect, useRef } from "react"
import { useExtend } from "@pixi/react"
import { TilingSprite } from "pixi.js"

const CustomTilingSprite = forwardRef<TilingSprite | null, all.game.CustomTilingSpriteProps>(
    ({ tilemap, filters = [] }, _) => {
        useExtend({ TilingSprite })
        const reffer = useRef<all.pixi.Container | null>(null)

        useEffect(() => {
            if (tilemap && reffer.current) {
                reffer.current.addChild(tilemap)
            }
        }, [tilemap, reffer.current])

        return tilemap ? (<pixiContainer ref={reffer} filters={filters} />) : null
    },
)

CustomTilingSprite.displayName = "CustomTilingSprite"
export default CustomTilingSprite
