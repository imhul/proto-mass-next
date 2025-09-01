import { useState, useEffect } from "react"
// store
import { usePersistedStore } from "@/store"
// components
import Enemy from "@components/enemy"
import EnemyBase from "@/components/enemy-base"
// utils
import { getRandomInt } from "@lib/utils"
// types
import type { storeTypes, gameTypes } from "@lib/types"
// config
import {
    spawnMatrix,
    defaultChunkSize,
    initialEnemyModel,
    maxEnemiesPerPride,
    maxDistanceFromEnemyBase,
} from "@lib/config"

const Enemies = ({ ref }: gameTypes.EnemiesProps) => {
    const [enemies, setEnemies] = useState<gameTypes.EnemyEntity[]>([])
    const [prideState, setPrideState] = useState<gameTypes.PrideState>("idle")
    const [max, setMax] = useState(1)
    const maxIdinList = Math.max(...enemies.map(enemy => enemy.id), 0)
    const paused = usePersistedStore((state: storeTypes.PersistedStore) => state.paused)

    const getRandomPositionNearBase = (base: gameTypes.Position) => {
        const x = getRandomInt(base.x - maxDistanceFromEnemyBase, base.x + maxDistanceFromEnemyBase)
        const y = getRandomInt(base.y - maxDistanceFromEnemyBase, base.y + maxDistanceFromEnemyBase)
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
        if (paused) return
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
                x: getRandomInt(1, defaultChunkSize * 2),
                y: getRandomInt(1, defaultChunkSize * 2),
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
    }, [max, paused])

    // Spawn control
    useEffect(() => {
        if (paused || enemies.length === 0) return
        if (enemies.length < maxEnemiesPerPride) {
            const nextCount = enemies.length + 1
            const pauseToNextBirth = spawnMatrix[nextCount]
            if (pauseToNextBirth) {
                const timer = setTimeout(() => {
                    setMax((prev) => Math.min(prev + 1, maxEnemiesPerPride))
                }, pauseToNextBirth)
                return () => clearTimeout(timer)
            }
        }
    }, [enemies, paused])

    return (
        <pixiContainer sortableChildren={true}>
            {enemies.length > 0 ? (<>
                <EnemyBase pos={enemies[0].base} />
                {enemies.map((enemy) => (
                    <Enemy
                        key={enemy.id}
                        item={enemy}
                        ref={ref}
                        base={enemies[0].base}
                        prideState={prideState}
                        setPrideState={setPrideState}
                    />
                ))}
            </>) : null}

        </pixiContainer>
    )
}

export default Enemies
