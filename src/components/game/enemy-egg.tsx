import { useState, useEffect, useRef } from "react"
import { Assets } from "pixi.js"
// store
import { usePersistedStore } from "@/store"
// utils
import { getTextures } from "@lib/utils"

type Store = all.store.PersistedStore

const enemyEgg = ({ position, state, uid }: all.game.EnemyEggProps) => {
    const eggRef = useRef<all.pixi.AnimatedSprite | null>(null)

    const [textures, setTextures] = useState<all.game.TexturesCollection>(null)

    const paused = usePersistedStore((s: Store) => s.paused)

    useEffect(() => {
        if (!textures) Assets
            .load("/assets/enemy/enemy-egg.json")
            .then((result: all.game.AtlasJSON) => {
                console.info("Enemy egg textures loaded: ", result)
                setTextures(getTextures(result, "enemy-egg"))
            })
    }, [textures])

    useEffect(() => {
        if (eggRef.current && textures) {
            if (paused) {
                eggRef.current.stop()
            } else {
                eggRef.current.play()
            }
        }
    }, [textures, paused, uid])

    return textures ? (<pixiAnimatedSprite
        textures={textures[state]}
        ref={eggRef}
        anchor={0.5}
        x={position.x}
        y={position.y}
        animationSpeed={0.1}
    />) : null
}

export default enemyEgg
