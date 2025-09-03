import { useState, useEffect } from "react"
// store
import { usePersistedStore } from "@/store"
// components
import Enemy from "@components/game/enemy"
import EnemyBase from "@/components/game/enemy-base"
// utils
import { getRandomInt } from "@lib/utils"
// types
import type { storeTypes, gameTypes } from "@lib/types"
// config
import {
    enemySpawnMatrix,
    defaultChunkSize,
    initialEnemyModel,
    maxEnemiesPerColony,
    maxDistanceFromEnemyBase,
} from "@lib/config"

const EnemiesColony = ({ ref, colony }: gameTypes.ColonyProps) => {
    // store
    const paused = usePersistedStore((state: storeTypes.PersistedStore) => state.paused)
    const enemiesList = usePersistedStore((state: storeTypes.PersistedStore) => state.enemies)
    const setGameAction = usePersistedStore((state: storeTypes.PersistedStore) => state.setGameAction)
    // state
    const [enemyColonyState, setEnemyColonyState] = useState<gameTypes.EnemyColonyState>("idle")
    const [max, setMax] = useState(1)
    const maxIdinList = enemiesList[colony.uid] ? Math.max(...enemiesList[colony.uid].map(enemy => enemy.id), 0) : 0

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
        if (paused || !enemiesList) return
        const enemies = enemiesList[colony.uid] || []
        if (enemies.length) {
            if (enemies.length < max) {
                const newEnemy = {
                    ...colony,
                    ...nextEnemyModel,
                    position: {
                        x: getRandomPositionNearBase({ x: enemies[0].base.x, y: enemies[0].base.y }).x,
                        y: getRandomPositionNearBase({ x: enemies[0].base.x, y: enemies[0].base.y }).y,
                    },
                    base: {
                        x: enemies[0].base.x,
                        y: enemies[0].base.y,
                    }
                }
                setGameAction("setEnemies", { colonyUid: colony.uid, newEnemy })
            }
        } else {
            // First enemy spawn
            const base = {
                x: getRandomInt(1, defaultChunkSize * 2),
                y: getRandomInt(1, defaultChunkSize * 2),
            }
            const newEnemy = {
                ...colony,
                ...initialEnemyModel,
                uid: colony.id + initialEnemyModel.uid,
                base,
                position: {
                    x: getRandomPositionNearBase(base).x,
                    y: getRandomPositionNearBase(base).y,
                },
            }
            setGameAction("setEnemies", { colonyUid: colony.uid, newEnemy })
        }
    }, [max, paused, colony])

    // Spawn control
    useEffect(() => {
        if (!enemiesList) return
        const enemies = enemiesList[colony.uid] || []
        if (paused || enemies.length === 0) return
        if (enemies.length < maxEnemiesPerColony) {
            const nextCount = enemies.length + 1
            const pauseToNextBirth = enemySpawnMatrix[nextCount]
            if (pauseToNextBirth) {
                const timer = setTimeout(() => {
                    setMax((prev) => Math.min(prev + 1, maxEnemiesPerColony))
                }, pauseToNextBirth)
                return () => clearTimeout(timer)
            }
        }
    }, [enemiesList, paused])

    return (
        <pixiContainer sortableChildren={true} >
            {ref.current && enemiesList[colony.uid]?.length > 0 ? (<>
                <EnemyBase isBirth={enemiesList[colony.uid].length < 2} pos={enemiesList[colony.uid][0].base} />
                {enemiesList[colony.uid].map((enemy) => (
                    <Enemy
                        key={enemy.id}
                        item={enemy}
                        ref={ref}
                        base={enemiesList[colony.uid][0].base}
                        enemyColonyState={enemyColonyState}
                        setEnemyColonyState={setEnemyColonyState}
                    />
                ))}
            </>) : null}
        </pixiContainer>
    )
}

export default EnemiesColony
