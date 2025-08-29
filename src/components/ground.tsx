import { useEffect, useState, } from "react"
import { Assets } from "pixi.js"
// store
// import { usePersistedStore } from "@/store"
// utils
import { CompositeTilemap } from '@pixi/tilemap'
import { generateMap } from "@lib/utils"
import { toast } from "sonner"
// types
// import type { } from "@lib/types"
// config
import { z, tileSize, defaultChunkSize } from "@lib/config"

import CustomTilingSprite from "@components/pixi/custom-tiling-sprite"

const Ground = () => {
    // const isDev = usePersistedStore((state: storeTypes.PersistedStore) => state.isDev)
    // state
    const [tilemap, setTilemap] = useState<CompositeTilemap | null>(null)
    const gameSize = defaultChunkSize * 2
    const side = Math.floor(gameSize / tileSize)
    const gmap = generateMap({
        width: side,
        height: side,
        bigClusterPercent: 5,
        smallClusterPercent: 10,
        materials: [1, 2, 3]
    })

    useEffect(() => {
        Assets.load('/assets/map/ground.json').then(() => {
            const tiledmap = new CompositeTilemap()
            tiledmap.interactive = true
            tiledmap.zIndex = z.ground

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

    return (
        <CustomTilingSprite tilemap={tilemap} />
    )
}

export default Ground
