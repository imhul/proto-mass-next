import { useState, useEffect } from "react"
import { Assets, Rectangle, Sprite, Graphics } from "pixi.js"
import { useExtend } from "@pixi/react"
// store
import { usePersistedStore } from "@/store"
// components
import DevHitbox from "@components/dev-hitbox"
// types
import type { gameTypes, Texture, PersistedStore } from "@lib/types"
// config
import {
    defaultChunkSize,
    numberOfObjectsPerChunk,
    generatedObjects,
} from "@lib/config"

const Objects = ({ size }: gameTypes.ObjectsProps) => {
    const [textures, setTextures] = useState<Texture[] | null>(null)
    const setGameAction = usePersistedStore(
        (state: PersistedStore) => state.setGameAction,
    )
    const objectsMap = usePersistedStore(
        (state: PersistedStore) => state.getObjectsMap,
    )

    useExtend({ Sprite, Graphics })

    const generateObjects = () => {
        const result = []
        const widthFactor = Math.ceil(size.width / defaultChunkSize)
        const heightFactor = Math.ceil(size.height / defaultChunkSize)
        const objectsPerChunk = Math.ceil(
            (numberOfObjectsPerChunk * (widthFactor * heightFactor)) / 2,
        )

        for (let i = 0; i < objectsPerChunk; i++) {
            const id = i + 100
            result.push({
                id,
                position: {
                    x: Math.random() * size.width,
                    y: Math.random() * size.height,
                },
                hp: 100,
                state: "idle" as gameTypes.GameObjectState,
                age: Math.random() * 10,
                name: `game-object-container-id-${id}`,
                dead: false,
                timestamp: Date.now(),
                zIndex: id,
                texture: Math.ceil(Math.random() * textures!.length) - 1,
            })
        }

        setGameAction("saveMap", result)
    }

    const renderObjects = () => {
        // almost worked!
        // const objects = objectsMap()
        // if (!textures || !objects.length) return null
        if (!textures) return null

        return generatedObjects.map((object: gameTypes.GameObject) => {
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
                            scale={2}
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
        const objects = objectsMap()
        if (!objects.length) Assets.load([
                "/assets/tree01.png",
                "/assets/tree02.png",
                "/assets/tree03.png",
            ]).then((tex) => {
                const texArray = Object.values(tex) as Texture[]
                setTextures(texArray)
            })
    }, [])

    // worked!
    // useEffect(() => {
    //     const objects = objectsMap()
    //     if (textures && !objects.length) generateObjects()
    // }, [textures])

    return <>{renderObjects()}</>
}

export default Objects
