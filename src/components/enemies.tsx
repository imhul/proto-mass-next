import { useState, useEffect } from "react"
// components
import Enemy from "@components/enemy"
import BotBase from "@components/bot-base"
// utils
import { getRandomInt } from "@lib/utils"
// types
import type { gameTypes } from "@lib/types"
// config
import {
    angryState,
    defaultChunkSize,
    initialEnemyModel,
    maxDistanceFromBase,
} from "@lib/config"

const maxEnemiesPerPride = 10
const minute: number = 60 * 1000
const spawnMatrix: Record<number, number> = {
    2: minute / 2,
    3: minute,
    4: minute * 2.5,
    5: minute * 4.5,
    6: minute * 7,
    7: minute * 10,
    8: minute * 13.5,
    9: minute * 17.5,
    10: minute * 22
}

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
    }, [max])

    useEffect(() => {
        if (enemies.length === 0) return
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
    }, [enemies])

    return (
        <pixiContainer sortableChildren={true}>
            {enemies.length > 0 ? (<>
                <BotBase pos={enemies[0].base} />
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
