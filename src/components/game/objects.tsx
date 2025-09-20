import { useState, useEffect } from "react"
import { Assets, Rectangle, Sprite, Graphics } from "pixi.js"
import { useExtend } from "@pixi/react"
import Rand from 'rand-seed'
// store
import { usePersistedStore } from "@/store"
// components
import DevDot from "@components/game/dev-dot"
import DevHitbox from "@components/game/dev-hitbox"
// utils
import { getRandomInt, dropShadowFilter } from "@lib/utils"
// config
import {
    tileSize,
    defaultChunkSize,
    numberOfObjectsPerChunk,
} from "@lib/config"

type Store = all.store.PersistedStore

const Objects = ({ size }: all.game.ObjectsProps) => {
    useExtend({ Sprite, Graphics })
    const [textures, setTextures] = useState<all.pixi.Texture[] | null>(null)
    const [objectsMap, setObjectsMap] = useState<all.game.GameObjectEntity[]>([])
    const seed = usePersistedStore((s: Store) => s.seed)
    const rand = new Rand(seed)
    const water: all.game.Position[] = usePersistedStore((s: Store) => s.water)
    const showObjectHitboxes = usePersistedStore((s: Store) => s.showObjectHitboxes)

    const generateObjects = () => {
        if (!textures?.length) return
        const result: all.game.GameObjectEntity[] = []
        const widthFactor = Math.ceil(size.width / defaultChunkSize)
        const heightFactor = Math.ceil(size.height / defaultChunkSize)
        const objectsPerChunk = Math.ceil(
            (numberOfObjectsPerChunk * (widthFactor * heightFactor)) / 2,
        )

        let i = 0
        while (result.length < objectsPerChunk && i < objectsPerChunk * 10) {
            i++
            const id = result.length + 100
            const y = getRandomInt(0, size.height, rand)
            const x = getRandomInt(0, size.width, rand)
            const randomIndex = Math.ceil(getRandomInt(0, textures.length - 1, rand))
            const texture = textures[randomIndex]
            const isWater = water.some(
                (w) =>
                    Math.abs(w.x - x) < tileSize / 2 &&
                    Math.abs(w.y - y) < tileSize / 2
            )
            if (isWater) continue

            result.push({
                id,
                position: { x, y },
                hp: 100,
                totalHp: 100,
                state: "idle" as all.game.GameObjectState,
                age: getRandomInt(0, 1, rand) * 10,
                name: `game-object-container-id-${id}`,
                dead: false,
                timestamp: performance.now(),
                zIndex: y - texture.height / 2,
                texture: randomIndex,
                damage: 0,
                obstacle: false,
            })
        }

        setObjectsMap(result)
    }


    const renderObjects = () => {
        if (!textures?.length || !objectsMap?.length) return null

        return objectsMap.map((object: all.game.GameObjectEntity) => {
            const tex = textures[object.texture]

            return (
                !!tex && (
                    <pixiContainer
                        key={object.id}
                        width={tex.width * 2}
                        height={tex.height * 2}
                        label={object.name}
                        hitArea={new Rectangle(0, 0, tex.width * 2, tex.height * 2)}
                    >
                        {showObjectHitboxes && (<DevHitbox
                            x={object.position.x}
                            y={object.position.y}
                            width={tex.width}
                            height={tex.height}
                            label={`object-dev-hitbox`}
                        />)}
                        <DevDot
                            x={object.position.x}
                            y={object.position.y}
                            width={tex.width}
                            height={tex.height}
                            label={`object-dev-dot`}
                        />
                        <pixiSprite
                            position={{ x: object.position.x, y: object.position.y }}
                            interactive={true}
                            texture={tex}
                            scale={1}
                            label={object.name}
                            zIndex={object.zIndex}
                            anchor={0.5}
                            filters={[dropShadowFilter.object]}
                        />
                    </pixiContainer>
                )
            )
        })
    }

    useEffect(() => {
        if (!objectsMap.length || !textures) Assets.load([
            "/assets/objects/Eye_plant_shadow1_1.png",
            "/assets/objects/Eye_plant_shadow1_2.png",
            "/assets/objects/Eye_plant_shadow1_3.png",
            "/assets/objects/Fetus_shadow1_1.png",
            "/assets/objects/Fetus_shadow1_2.png",
            "/assets/objects/Fetus_shadow1_3.png",
            "/assets/objects/Jaws_plant_shadow1_1.png",
            "/assets/objects/Jaws_plant_shadow1_2.png",
            "/assets/objects/Jaws_plant_shadow1_3.png",
            "/assets/objects/Many_eyes_plant_shadow1_1.png",
            "/assets/objects/Many_eyes_plant_shadow1_2.png",
            "/assets/objects/Many_eyes_plant_shadow1_3.png",
            "/assets/objects/Pustules_shadow1_1.png",
            "/assets/objects/Pustules_shadow1_2.png",
            "/assets/objects/Pustules_shadow1_3.png",
            "/assets/objects/Tentacle_plant_shadow1_1.png",
            "/assets/objects/Tentacle_plant_shadow1_2.png",
            "/assets/objects/Tentacle_plant_shadow1_3.png",
            "/assets/objects/Tubular_plant_shadow1_1.png",
            "/assets/objects/Tubular_plant_shadow1_2.png",
            "/assets/objects/Tubular_plant_shadow1_3.png",
            "/assets/objects/Veins_shadow1_1.png",
            "/assets/objects/Veins_shadow1_2.png",
            "/assets/objects/Veins_shadow1_3.png",
            "/assets/objects/Veins_shadow1_4.png"
        ]).then((tex) => {
            const texArray = Object.values(tex) as all.pixi.Texture[]
            setTextures(texArray)
        })
    }, [])

    useEffect(() => {
        if (textures && !objectsMap.length) generateObjects()
    }, [textures])

    return <>{renderObjects()}</>
}

export default Objects
