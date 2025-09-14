import { useState, useEffect } from "react"
// store
import { usePersistedStore } from "@/store"
// components
import EnemiesColony from "@/components/game/enemies-colony"
// utils
import { getRandomInt } from "@lib/utils"
// config
import { minute, initialColonyModel, maxColoniesPerChunk } from "@lib/config"

const Enemies = ({ ref }: all.game.EnemiesProps) => {
    const [colonies, setColonies] = useState<all.game.ColonyEntity[]>([])
    // store
    const paused = usePersistedStore(
        (state: all.store.PersistedStore) => state.paused
    )
    const enemiesList = usePersistedStore(
        (state: all.store.PersistedStore) => state.enemies
    )

    useEffect(() => {
        if (paused) return
        if (colonies.length === 0) {
            const enemiesListKeys = enemiesList ? Object.keys(enemiesList) : []

            if (enemiesListKeys.length > 0) {
                setColonies(
                    enemiesListKeys.map((key, index) => ({
                        id: index + 1,
                        uid: key,
                    }))
                )
            } else {
                setColonies([initialColonyModel])
            }
        } else if (colonies.length !== 0 && colonies.length < maxColoniesPerChunk) {
            const enemiesColoniesSpawnMatrix: Record<number, number> = {
                2: getRandomInt(minute, minute * 2, null, false),
                3: getRandomInt(minute * 3, minute * 5, null, false),
                4: getRandomInt(minute * 7, minute * 10, null, false),
                5: getRandomInt(minute * 13, minute * 17, null, false),
            }
            const nextCount = colonies.length + 1
            const pauseToNextBirth = enemiesColoniesSpawnMatrix[nextCount]

            if (pauseToNextBirth) {
                const timer = setTimeout(() => {
                    setColonies((prev) => [
                        ...prev,
                        { id: prev.length + 1, uid: crypto.randomUUID() },
                    ])
                }, pauseToNextBirth)
                return () => clearTimeout(timer)
            }
        }
    }, [paused, colonies])

    return (
        <pixiContainer sortableChildren={true} label="enemy-manager">
            {colonies.map((colony) => (
                <EnemiesColony colony={colony} key={colony.uid} ref={ref} />
            ))}
        </pixiContainer>
    )
}

export default Enemies
