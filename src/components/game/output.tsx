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
// config
import { maxEnemyProgress } from "@lib/config"

type Store = all.store.PersistedStore

export const Output = () => {
    // refs
    const parentRef = useRef<HTMLDivElement>(null)
    // store
    const paused = usePersistedStore((s: Store) => s.paused)
    const showFPS = usePersistedStore((s: Store) => s.showFPS)
    const isGameInit = usePersistedStore((s: Store) => s.init)
    const enemiesList = usePersistedStore((s: Store) => s.enemies)
    const showCharts = usePersistedStore((s: Store) => s.showCharts)
    const preferences = usePersistedStore((s: Store) => s.preferences)
    const showEnemyProgress = usePersistedStore((s: Store) => s.showEnemyProgress)
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
            const total = Object.values(enemiesList).reduce((acc, enemies) => acc + enemies.list?.length, 0)
            setEnemiesLength(total)
        }
    }, [enemiesList])

    return (
        <div ref={parentRef} className="game-container">
            {isGameInit ? (<>
                {showEnemyProgress && (<ProgressBar min={0} max={maxEnemyProgress} current={enemiesLength} />)}
                {showFPS && (<DevFPS />)}
                {showCharts && (<DevChart currentValue={enemiesLength} />)}
                <Application resizeTo={parentRef} antialias={preferences.antialias} autoDensity={true} >
                    <Game />
                </Application>
                <PauseModal open={paused} />
            </>) : (<InitialScene />)}
        </div>
    )
}
