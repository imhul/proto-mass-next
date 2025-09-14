import { useEffect, useState } from "react"
import { Assets } from "pixi.js"
// store
import { usePersistedStore } from "@/store"
// components
import Bullet from "@components/game/bullet"
// utils
import { getTextures } from "@lib/utils"

type Store = all.store.PersistedStore

const Bullets = ({ ref }: all.game.BulletsProps) => {
    const [textures, setTextures] = useState<all.pixi.Texture[]>([])
    const bullets = usePersistedStore((state: Store) => state.bullets)
    const setGameAction = usePersistedStore((state: Store) => state.setGameAction)

    useEffect(() => {
        if (!textures.length) {
            Assets.load("/assets/hero/atlas.json").then(
                (result: all.game.AtlasJSON) => {
                    const tex = getTextures(result, "hero")
                    setTextures(tex!["shot"])
                },
            )
        }
    }, [textures])

    return (
        <>
            {textures && bullets.length > 0 && bullets.map((bullet: all.game.BulletEntity) => (
                <Bullet
                    ref={ref}
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
