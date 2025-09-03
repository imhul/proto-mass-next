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
            // First colony spawn
            setColonies((prev) => [...prev, initialColonyModel])
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
