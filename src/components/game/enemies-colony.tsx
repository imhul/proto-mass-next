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
    minute,
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

    const [enemyColonyState, setEnemyColonyState] =
        useState<gameTypes.EnemyColonyState>("idle")

    const getRandomPositionNearBase = (base: gameTypes.Position) => {
        const x = getRandomInt(base.x - maxDistanceFromEnemyBase, base.x + maxDistanceFromEnemyBase)
        const y = getRandomInt(base.y - maxDistanceFromEnemyBase, base.y + maxDistanceFromEnemyBase)
        return { x, y }
    }

    useEffect(() => {
        if (paused) return
        const enemies = enemiesList[colony.uid] || []

        if (enemies.length === 0) {
            const base = {
                x: getRandomInt(1, defaultChunkSize * 2),
                y: getRandomInt(1, defaultChunkSize * 2),
            }
            const newEnemy: gameTypes.EnemyEntity = {
                ...initialEnemyModel,
                id: 1,
                uid: crypto.randomUUID(),
                base,
                colony,
                position: getRandomPositionNearBase(base),
            }
            setGameAction("setEnemies", { colonyUid: colony.uid, newEnemy })
            return
        }

        if (enemies.length < maxEnemiesPerColony) {
            const enemySpawnMatrix: Record<number, number> = {
                2: getRandomInt(minute / 2, minute, null, false),
                3: getRandomInt(minute, minute * 1.5, null, false),
                4: getRandomInt(minute * 2, minute * 3, null, false),
                5: getRandomInt(minute * 4, minute * 5, null, false),
                6: getRandomInt(minute * 6, minute * 8, null, false),
                7: getRandomInt(minute * 9, minute * 12, null, false),
                8: getRandomInt(minute * 13, minute * 15, null, false),
                9: getRandomInt(minute * 16, minute * 19, null, false),
                10: getRandomInt(minute * 20, minute * 25, null, false)
            }
            const nextCount = enemies.length + 1
            const pauseToNextBirth = enemySpawnMatrix[nextCount]

            if (pauseToNextBirth) {
                const timer = setTimeout(() => {
                    const newEnemy: gameTypes.EnemyEntity = {
                        ...initialEnemyModel,
                        id: enemies.length + 1,
                        uid: crypto.randomUUID(),
                        colony,
                        base: enemies[0].base,
                        position: getRandomPositionNearBase(enemies[0].base),
                    }
                    setGameAction("setEnemies", { colonyUid: colony.uid, newEnemy })
                }, pauseToNextBirth)

                return () => clearTimeout(timer)
            }
        }
    }, [paused, enemiesList, colony, setGameAction])

    return (
        <pixiContainer sortableChildren={true} label="enemy-colony">
            {ref.current && enemiesList[colony.uid]?.length > 0 ? (
                <>
                    <EnemyBase
                        isBirth={enemiesList[colony.uid].length < 2}
                        pos={enemiesList[colony.uid][0].base}
                    />
                    {enemiesList[colony.uid].map(enemy => (
                        <Enemy
                            key={enemy.id}
                            item={enemy}
                            ref={ref}
                            base={enemiesList[colony.uid][0].base}
                            enemyColonyState={enemyColonyState}
                            setEnemyColonyState={setEnemyColonyState}
                        />
                    ))}
                </>
            ) : null}
        </pixiContainer>
    )
}

export default EnemiesColony
