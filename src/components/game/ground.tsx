import { useEffect, useState, } from "react"
import { Assets } from "pixi.js"
// store
import { usePersistedStore } from "@/store"
// utils
import { CompositeTilemap } from '@pixi/tilemap'
import { generateMap } from "@lib/utils"
import { toast } from "sonner"
// config
import {
    zindex,
    tileSize,
    waterTextureIndex,
    bigClusterPercent,
    smallClusterPercent,
} from "@lib/config"

type Store = all.store.PersistedStore

import CustomTilingSprite from "@components/pixi/custom-tiling-sprite"

const Ground = ({ size }: { size: all.game.BaseSize }) => {
    const isDev = usePersistedStore((s: Store) => s.isDev)
    const seed = usePersistedStore((s: Store) => s.seed)
    const setGameAction = usePersistedStore((s: Store) => s.setGameAction)
    // state
    const [tilemap, setTilemap] = useState<CompositeTilemap | null>(null)
    const width = Math.floor(size.width / tileSize)
    const height = Math.floor(size.height / tileSize)
    const gmap = generateMap({
        seed,
        width,
        height,
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
            const water: all.game.Position[] = []

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
            if (isDev()) {
                tiledmap.on("click", (props) => {
                    toast.info("click", {
                        description: `x: ${props.global.x}, y: ${props.global.y}`,
                    })
                })
            }
            setGameAction("saveWater", water)
            setTilemap(tiledmap)
        })
    }, [])

    return (
        <CustomTilingSprite tilemap={tilemap} />
    )
}

export default Ground
