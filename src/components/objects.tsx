import { useState, useEffect } from "react"
import { Assets, Rectangle, Sprite, Graphics } from "pixi.js"
import { useExtend } from "@pixi/react"
// store
import { usePersistedStore } from "@/store"
// components
import DevHitbox from "@components/dev-hitbox"
// types
import type { gameTypes, Texture, storeTypes } from "@lib/types"
// config
import {
    defaultChunkSize,
    numberOfObjectsPerChunk,
} from "@lib/config"

const Objects = ({ size }: gameTypes.ObjectsProps) => {
    const [textures, setTextures] = useState<Texture[] | null>(null)
    const setGameAction = usePersistedStore(
        (state: storeTypes.PersistedStore) => state.setGameAction,
    )
    const objectsMap = usePersistedStore(
        (state: storeTypes.PersistedStore) => state.objectsMap,
    )

    useExtend({ Sprite, Graphics })

    const generateObjects = () => {
        if (!textures?.length) return
        const result = []
        const widthFactor = Math.ceil(size.width / defaultChunkSize)
        const heightFactor = Math.ceil(size.height / defaultChunkSize)
        const objectsPerChunk = Math.ceil(
            (numberOfObjectsPerChunk * (widthFactor * heightFactor)) / 2,
        )

        for (let i = 0; i < objectsPerChunk; i++) {
            const id = i + 100
            const y = Math.random() * size.height
            const x = Math.random() * size.width
            result.push({
                id,
                position: { x, y },
                hp: 100,
                state: "idle" as gameTypes.GameObjectState,
                age: Math.random() * 10,
                name: `game-object-container-id-${id}`,
                dead: false,
                timestamp: performance.now(),
                zIndex: y + 1,
                texture: Math.ceil(Math.random() * textures.length) - 1,
            })
        }

        setGameAction("saveMap", result)
    }

    const renderObjects = () => {
        if (!textures || !objectsMap.length) return null

        return objectsMap.map((object: gameTypes.GameObjectEntity) => {
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
                        <DevHitbox
                            x={object.position.x}
                            y={object.position.y}
                            width={tex.width * 2}
                            height={tex.height * 2}
                            label={`object-dev-hitbox`}
                        />
                        <pixiSprite
                            position={{ x: object.position.x, y: object.position.y }}
                            interactive={true}
                            texture={tex}
                            scale={1}
                            label={object.name}
                            zIndex={object.zIndex}
                            anchor={0.5}
                        />
                    </pixiContainer>
                )
            )
        })
    }

    useEffect(() => {
        if (!objectsMap.length) Assets.load([
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
            const texArray = Object.values(tex) as Texture[]
            setTextures(texArray)
        })
    }, [])

    useEffect(() => {
        if (textures && !objectsMap.length) generateObjects()
    }, [textures])

    return <>{renderObjects()}</>
}

export default Objects
