import { useEffect, useState } from "react"
import { Assets } from "pixi.js"
// types
import type { gameTypes, storeTypes, Texture } from "@lib/types"
// store
import { usePersistedStore } from "@/store"
// components
import Bullet from "@components/game/bullet"
// utils
import { getTextures } from "@lib/utils"

const Bullets = () => {
    const [textures, setTextures] = useState<Texture[]>([])
    const bullets = usePersistedStore((state: storeTypes.PersistedStore) => state.bullets)
    const setGameAction = usePersistedStore((state: storeTypes.PersistedStore) => state.setGameAction)

    useEffect(() => {
        if (!textures.length) {
            Assets.load("/assets/hero/atlas.json").then(
                (result: gameTypes.AtlasJSON) => {
                    const tex = getTextures(result, "hero")
                    setTextures(tex!["shot"])
                },
            )
        }
    }, [textures])

    return (
        <>
            {textures && bullets.length > 0 && bullets.map((bullet: gameTypes.BulletEntity) => (
                <Bullet
                    key={bullet.id}
                    textures={textures}
                    onComplete={() => setGameAction("removeBullet", bullet.id)}
                    {...bullet}
                />
            ))}
        </>
    )
}

export default Bullets
