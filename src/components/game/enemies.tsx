import { useState, useEffect } from "react"
// store
import { usePersistedStore } from "@/store"
// components
import EnemiesColony from "@/components/game/enemies-colony"
// types
import type { storeTypes, gameTypes } from "@lib/types"
// config
import {
    initialColonyModel,
    maxColoniesPerChunk,
    enemiesColoniesSpawnMatrix
} from "@lib/config"

const Enemies = ({ ref }: gameTypes.EnemiesProps) => {
    const [colonies, setColonies] = useState<gameTypes.ColonyEntity[]>([])
    // store
    const paused = usePersistedStore((state: storeTypes.PersistedStore) => state.paused)
    const enemiesList = usePersistedStore((state: storeTypes.PersistedStore) => state.enemies)

    // Ініціалізація (відновлення збережених колоній або створення першої)
    useEffect(() => {
        if (paused) return

        if (colonies.length === 0) {
            const enemiesListKeys = enemiesList ? Object.keys(enemiesList) : []

            if (enemiesListKeys.length > 0) {
                // Відновлюємо колонії зі стору
                setColonies(
                    enemiesListKeys.map((key, index) => ({
                        id: index + 1,
                        uid: key,
                    }))
                )
            } else {
                // Якщо у сторі пусто – створюємо першу колонію
                setColonies([initialColonyModel])
            }
        }
    }, [paused, enemiesList, colonies.length])

    // Контроль спавну нових колоній
    useEffect(() => {
        if (paused || colonies.length === 0) return

        if (colonies.length < maxColoniesPerChunk) {
            const nextCount = colonies.length + 1
            const pauseToNextBirth = enemiesColoniesSpawnMatrix[nextCount]

            if (pauseToNextBirth) {
                const timer = setTimeout(() => {
                    setColonies(prev => [
                        ...prev,
                        { id: prev.length + 1, uid: crypto.randomUUID() }
                    ])
                }, pauseToNextBirth)

                return () => clearTimeout(timer)
            }
        }
    }, [paused, colonies])

    return (
        <pixiContainer sortableChildren={true}>
            {colonies.map(colony => (
                <EnemiesColony colony={colony} key={colony.uid} ref={ref} />
            ))}
        </pixiContainer>
    )
}

export default Enemies
