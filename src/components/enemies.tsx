import { useState, useEffect } from "react"
// components
import Enemy from "@components/enemy"
// utils
import { getRandomInt } from "@lib/utils"
// types
import type { gameTypes } from "@lib/types"
// config
import {
    angryState,
    spawnMatrix,
    defaultChunkSize,
    initialEnemyModel,
    maxDistanceFromBase,
} from "@lib/config"

const Enemies = ({ ref }: gameTypes.EnemiesProps) => {
    const [enemies, setEnemies] = useState<gameTypes.EnemyEntity[]>([])
    const [prideState, setPrideState] = useState<gameTypes.PrideState>("idle")
    const [max, setMax] = useState(1)
    const maxIdinList = Math.max(...enemies.map(enemy => enemy.id), 0)

    const getRandomPositionNearBase = (base: gameTypes.Position) => {
        const x = getRandomInt(base.x - maxDistanceFromBase, base.x + maxDistanceFromBase)
        const y = getRandomInt(base.y - maxDistanceFromBase, base.y + maxDistanceFromBase)
        return { x, y }
    }

    const nextEnemyModel: gameTypes.EnemyEntity = {
        ...initialEnemyModel,
        id: maxIdinList + 1,
        uid: crypto.randomUUID(),
        timestamp: performance.now(),
        name: "Enemy-" + (maxIdinList + 1),
    }

    useEffect(() => {
        if (enemies.length) {
            if (enemies.length < max) {
                setEnemies((prevEnemies) => [...prevEnemies, {
                    ...nextEnemyModel,
                    position: {
                        x: getRandomPositionNearBase({ x: enemies[0].base.x, y: enemies[0].base.y }).x,
                        y: getRandomPositionNearBase({ x: enemies[0].base.x, y: enemies[0].base.y }).y,
                    },
                    base: {
                        x: enemies[0].base.x,
                        y: enemies[0].base.y,
                    }
                }])
            }
        } else {
            // First enemy spawn
            const base = {
                x: getRandomInt(1, (ref.current?.screenWidth || defaultChunkSize) * 2),
                y: getRandomInt(1, (ref.current?.screenHeight || defaultChunkSize) * 2),
            }
            setEnemies((prevEnemies) => [...prevEnemies, {
                ...initialEnemyModel,
                base,
                position: {
                    x: getRandomPositionNearBase(base).x,
                    y: getRandomPositionNearBase(base).y,
                },
            }])
        }
    }, [max])

    useEffect(() => {
        const now = performance.now()
        if (enemies.length === 0) return
        const pauseToNextBirth = spawnMatrix[enemies.length + 1]
        // TODO: Implement enemy spawning logic
    }, [])

    useEffect(() => {
        console.info("Enemies updated:", enemies)
    }, [enemies])

    return (
        <pixiContainer sortableChildren={true}>
            {enemies.map((enemy) => (
                <Enemy
                    key={enemy.id}
                    item={enemy}
                    ref={ref}
                    prideState={prideState}
                    setPrideState={setPrideState}
                />
            ))}
        </pixiContainer>
    )
}

export default Enemies
