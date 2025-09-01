import { useEffect, useState, } from "react"
import { Assets } from "pixi.js"
// store
import { usePersistedStore } from "@/store"
// utils
import { CompositeTilemap } from '@pixi/tilemap'
import { generateMap } from "@lib/utils"
import { toast } from "sonner"
// types
import type { gameTypes, storeTypes } from "@lib/types"
// config
import {
    zindex,
    tileSize,
    defaultChunkSize,
    waterTextureIndex,
    bigClusterPercent,
    smallClusterPercent,
} from "@lib/config"

import CustomTilingSprite from "@components/pixi/custom-tiling-sprite"

const Ground = () => {
    // const isDev = usePersistedStore((state: storeTypes.PersistedStore) => state.isDev)
    const seed = usePersistedStore((state: storeTypes.PersistedStore) => state.seed)
    const setGameAction = usePersistedStore((state: storeTypes.PersistedStore) => state.setGameAction)
    // state
    const [tilemap, setTilemap] = useState<CompositeTilemap | null>(null)
    const gameSize = defaultChunkSize * 2
    const side = Math.floor(gameSize / tileSize)
    const gmap = generateMap({
        seed,
        width: side,
        height: side,
        bigClusterPercent,
        smallClusterPercent,
        materials: [1, 2, 3]
    })

    useEffect(() => {
        if (!tilemap && gmap) Assets.load('/assets/map/ground.json').then(() => {
            const tiledmap = new CompositeTilemap()
            tiledmap.interactive = true
            tiledmap.zIndex = zindex.ground
            tiledmap.label = "ground"
            const water: gameTypes.Position[] = []

            gmap.forEach((firstLevel, x) => {
                firstLevel.forEach((tile, y) => {
                    if (tile === waterTextureIndex) water.push({ x: x * tileSize, y: y * tileSize })
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
                toast.info("click", {
                    description: `x: ${props.global.x}, y: ${props.global.y}`,
                })
            })
            setGameAction("saveWater", water)
            setTilemap(tiledmap)
        })
    }, [])

    return (
        <CustomTilingSprite tilemap={tilemap} />
    )
}

export default Ground
