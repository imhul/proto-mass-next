import { forwardRef, useEffect, useState, useRef } from "react"
import { useExtend } from "@pixi/react"
import { TilingSprite, Assets } from "pixi.js"
// store
// import { usePersistedStore } from "@/store"
// utils
import { CompositeTilemap } from '@pixi/tilemap'
import { generateMap } from "@lib/utils"
import { toast } from "sonner"
// types
import type {
    gameTypes,
    // storeTypes,
    Container,
    PixiTilingSprite,
} from "@lib/types"
// config
import { tileSize, defaultChunkSize } from "@lib/config"

const CustomTilingSprite = forwardRef<PixiTilingSprite | null, gameTypes.CustomTilingSpriteProps>(
    () => {
        useExtend({ TilingSprite })
        // const isDev = usePersistedStore((state: storeTypes.PersistedStore) => state.isDev)
        // state
        const [tilemap, setTilemap] = useState<CompositeTilemap | null>(null)
        const gameSize = defaultChunkSize * 2
        const side = Math.floor(gameSize / tileSize)
        const gmap = generateMap(side, side, 5, 10, [1, 2, 3])
        const ref = useRef<Container | null>(null)

        useEffect(() => {
            Assets.load('/assets/map/ground.json').then(() => {
                const tiledmap = new CompositeTilemap()
                tiledmap.interactive = true

                gmap.forEach((firstLevel, x) => {
                    firstLevel.forEach((tile, y) => {
                        tiledmap.tile(
                            `${tile}.png`,
                            x * tileSize,
                            y * tileSize,
                            {
                                tileWidth: tileSize,
                                tileHeight: tileSize,
                            },
                        )
                    })
                })
                // TODO: just for testing
                tiledmap.on("click", (props) => {
                    // if (isDev)
                    toast.info("click", {
                        description: `x: ${props.global.x}, y: ${props.global.y}`,
                    })
                })
                setTilemap(tiledmap)
            })
        }, [])

        useEffect(() => {
            if (tilemap && ref.current) {
                ref.current.addChild(tilemap)
            }
        }, [tilemap, ref.current])

        return tilemap ? (<pixiContainer ref={ref} />) : null
    },
)

CustomTilingSprite.displayName = "CustomTilingSprite"

export default CustomTilingSprite
