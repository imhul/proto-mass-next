import { useEffect, useRef, useState } from "react"
import { Application, useExtend } from "@pixi/react"
// store
import { usePersistedStore } from "@/store"
// components
import Game from "@components/game/game"
import DevFPS from "@components/ux/dev-fps"
import DevChart from "@components/ux/dev-chart"
import PauseModal from "@components/ux/pause-modal"
import ProgressBar from "@components/ux/progress-bar"
import InitialScene from "@components/ux/initial-scene"
import {
    AnimatedSprite,
    TilingSprite,
    Container,
    Graphics,
    Sprite,
} from "pixi.js"
// types
import type { storeTypes } from "@lib/types"
// config
import { maxEnemyProgress } from "@lib/config"

export const Output = () => {
    // refs
    const parentRef = useRef<HTMLDivElement>(null)
    // store
    const paused = usePersistedStore((state: storeTypes.PersistedStore) => state.paused)
    const showFPS = usePersistedStore((state: storeTypes.PersistedStore) => state.showFPS)
    const isGameInit = usePersistedStore((state: storeTypes.PersistedStore) => state.init)
    const enemiesList = usePersistedStore((state: storeTypes.PersistedStore) => state.enemies)
    const showCharts = usePersistedStore((state: storeTypes.PersistedStore) => state.showCharts)
    const showEnemyProgress = usePersistedStore((state: storeTypes.PersistedStore) => state.showEnemyProgress)
    // state
    const [enemiesLength, setEnemiesLength] = useState(0)

    useExtend({
        AnimatedSprite,
        TilingSprite,
        Container,
        Graphics,
        Sprite,
    })

    useEffect(() => {
        if (enemiesList) {
            const total = Object.values(enemiesList).reduce((acc, enemies) => acc + enemies.length, 0)
            setEnemiesLength(total)
        }
    }, [enemiesList])

    return (
        <div ref={parentRef} className="game-container">
            {isGameInit ? (<>
                {showEnemyProgress && (<ProgressBar min={0} max={maxEnemyProgress} current={enemiesLength} />)}
                {showFPS && (<DevFPS />)}
                {showCharts && (<DevChart currentValue={enemiesLength} />)}
                <Application resizeTo={parentRef}>
                    <Game parentRef={parentRef} />
                </Application>
                <PauseModal open={paused} />
            </>) : (<InitialScene />)}
        </div>
    )
}
