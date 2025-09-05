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
    const [max, setMax] = useState(1)
    const maxIdinList = Math.max(...colonies.map(colony => colony.id), 0)
    // store
    const paused = usePersistedStore((state: storeTypes.PersistedStore) => state.paused)
    const enemiesList = usePersistedStore((state: storeTypes.PersistedStore) => state.enemies)

    useEffect(() => {
        if (paused) return
        if (colonies.length) {
            if (colonies.length < max) {
                setColonies((prev) => [...prev, {
                    id: maxIdinList + 1,
                    uid: crypto.randomUUID(),
                }])
            }
        } else {
            const enemiesListKeys = enemiesList ? Object.keys(enemiesList) : []
            if (enemiesListKeys.length > 0 && enemiesListKeys.length < maxColoniesPerChunk) {
                setColonies(enemiesListKeys.map((key, index) => ({
                    id: index + 1,
                    uid: key,
                })))
                setMax(Object.keys(enemiesList).length + 1)
                return
            }
            // First colony spawn
            setColonies(() => [initialColonyModel])
        }
    }, [max, paused])

    // Spawn control
    useEffect(() => {
        if (paused || colonies.length === 0) return
        if (colonies.length < maxColoniesPerChunk) {
            const nextCount = colonies.length + 1
            const pauseToNextBirth = enemiesColoniesSpawnMatrix[nextCount]
            if (pauseToNextBirth) {
                const timer = setTimeout(() => {
                    setMax((prev) => Math.min(prev + 1, maxColoniesPerChunk))
                }, pauseToNextBirth)
                return () => clearTimeout(timer)
            }
        }
    }, [colonies, paused])

    return (
        <pixiContainer sortableChildren={true}>
            {colonies.length > 0 ? (<>
                {colonies.map((colony) => (<EnemiesColony colony={colony} key={colony.uid} ref={ref} />))}
            </>) : null}
        </pixiContainer>
    )
}

export default Enemies
