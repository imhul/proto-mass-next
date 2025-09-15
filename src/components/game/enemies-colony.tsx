import { useState, useEffect } from "react"
// store
import { usePersistedStore } from "@/store"
// components
import Enemy from "@components/game/enemy"
import EnemyBase from "@/components/game/enemy-base"
// utils
import { getRandomInt } from "@lib/utils"
// config
import {
    minute,
    defaultChunkSize,
    initialEnemyModel,
    maxEnemiesPerColony,
    maxDistanceFromEnemyBase,
} from "@lib/config"

type Store = all.store.PersistedStore

const EnemiesColony = ({ ref, colony }: all.game.ColonyProps) => {
    // store
    const isDev = usePersistedStore((state: Store) => state.isDev)
    const paused = usePersistedStore((state: Store) => state.paused)
    const enemiesList = usePersistedStore((state: Store) => state.enemies)
    const setGameAction = usePersistedStore(
        (state: Store) => state.setGameAction
    )
    // state
    const [enemies, setEnemies] = useState<all.game.EnemyEntity[]>([])
    const [basePos, setBasePos] = useState<all.game.Position>({ x: 0, y: 0 })
    const [enemyColonyState, setEnemyColonyState] =
        useState<all.game.EnemyColonyState>("idle")

    const getRandomPositionNearBase = (base: all.game.Position) => {
        const x = getRandomInt(
            base.x - maxDistanceFromEnemyBase,
            base.x + maxDistanceFromEnemyBase
        )
        const y = getRandomInt(
            base.y - maxDistanceFromEnemyBase,
            base.y + maxDistanceFromEnemyBase
        )
        return { x, y }
    }

    useEffect(() => {
        if (paused) return
        if (enemies.length < maxEnemiesPerColony) {
            const dev = isDev()
            const enemySpawnMatrix: Record<number, number> = {
                1: dev ? minute / 4 : getRandomInt(minute / 2, minute, null, false),
                2: dev ? minute / 4 : getRandomInt(minute / 2, minute * 1.5, null, false),
                3: dev ? minute / 4 : getRandomInt(minute, minute * 2, null, false),
                4: dev ? minute / 4 : getRandomInt(minute * 2.5, minute * 3, null, false),
                5: dev ? minute / 4 : getRandomInt(minute * 4, minute * 5, null, false),
                6: dev ? minute / 4 : getRandomInt(minute * 6, minute * 8, null, false),
                7: dev ? minute / 4 : getRandomInt(minute * 9, minute * 12, null, false),
                8: dev ? minute / 4 : getRandomInt(minute * 13, minute * 15, null, false),
                9: dev ? minute / 4 : getRandomInt(minute * 16, minute * 19, null, false),
                10: dev ? minute / 4 : getRandomInt(minute * 20, minute * 25, null, false),
            }
            const nextCount = enemies.length + 1
            const pauseToNextBirth = enemySpawnMatrix[nextCount]

            if (pauseToNextBirth) {
                const currentColony = enemiesList[colony.uid]
                const dirty = currentColony ? currentColony.dirty : false
                const timer = setTimeout(() => {
                    const base = {
                        x: getRandomInt(1, defaultChunkSize * 2),
                        y: getRandomInt(1, defaultChunkSize * 2),
                    }
                    if (enemies.length === 0 && dirty) {
                        const newEnemy: all.game.EnemyEntity = {
                            ...initialEnemyModel,
                            id: `${colony.id}-1`,
                            uid: crypto.randomUUID(),
                            base,
                            colony,
                            position: getRandomPositionNearBase(base),
                        }
                        setBasePos(base)
                        setGameAction("setEnemies", { colonyUid: colony.uid, newEnemy })
                        return
                    }
                    const enemyBase = dirty ? (enemies[0]?.base ?? base) : base
                    const newEnemy: all.game.EnemyEntity = {
                        ...initialEnemyModel,
                        id: `${colony.id}-${enemies.length + 1}`,
                        uid: crypto.randomUUID(),
                        colony,
                        base: enemyBase,
                        timestamp: performance.now(),
                        position: getRandomPositionNearBase(enemyBase),
                    }
                    setGameAction("setEnemies", { colonyUid: colony.uid, newEnemy })
                }, pauseToNextBirth)

                return () => clearTimeout(timer)
            }
        }
    }, [paused, enemies, colony, setGameAction, enemiesList])

    useEffect(() => {
        const colonyData = enemiesList[colony.uid]

        if (!colonyData) {
            setEnemies([])
            setBasePos({ x: 0, y: 0 })
            return
        }

        const list = colonyData.list || []
        setEnemies(list)

        if (list.length > 0) {
            setBasePos(list[0].base)
        }
    }, [enemiesList, colony])

    const colonyData = enemiesList[colony.uid]

    if (!colonyData) {
        return null
    }

    return (
        <pixiContainer sortableChildren={true} label="enemy-colony">
            {(ref.current && (basePos.x !== 0 || basePos.y !== 0)) ? (
                <>
                    <EnemyBase
                        isDeath={!enemies.length && colonyData.dirty}
                        isBirth={!enemies.length && !colonyData.dirty}
                        pos={basePos}
                        uid={colony.uid}
                    />
                    {enemies.length > 0 &&
                        enemies.map((enemy) => (
                            <Enemy
                                key={enemy.id}
                                item={enemy}
                                ref={ref}
                                base={basePos}
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
