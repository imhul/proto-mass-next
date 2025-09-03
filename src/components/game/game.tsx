import { useEffect, useState, useRef } from "react"
import { useApplication } from "@pixi/react"
// store
import { usePersistedStore } from "@/store"
// components
import Hero from "@components/game/hero"
import Enemies from "@/components/game/enemies"
import Camera from "@components/game/camera"
import Maggots from "@components/game/maggots"
import Objects from "@components/game/objects"
import Ground from "@components/game/ground"
import CustomProgressBar from "@components/pixi/custom-progress-bar"
// types
import type { storeTypes, gameTypes } from "@lib/types"
// config
import { maxEnemyProgress } from "@lib/config"

const Game = ({ parentRef }: gameTypes.GameProps) => {
    const { app } = useApplication()
    globalThis.__PIXI_APP__ = app
    const viewportRef = useRef<gameTypes.CameraProps>(
        null,
    ) as React.RefObject<gameTypes.CameraProps>
    const gameSize = usePersistedStore((state: storeTypes.PersistedStore) => state.gameSize)
    const enemiesList = usePersistedStore((state: storeTypes.PersistedStore) => state.enemies)
    const [enemiesLength, setEnemiesLength] = useState(0)

    const resize = () => {
        if (!viewportRef.current) return
        const width = parentRef.current?.clientWidth || window.innerWidth
        const height = parentRef.current?.clientHeight || window.innerHeight
        viewportRef.current.resize(width, height)
    }

    useEffect(() => {
        window.addEventListener("resize", resize)
        resize()

        return () => {
            window.removeEventListener("resize", resize)
        }
    }, [])

    useEffect(() => {
        if (enemiesList) {
            const total = Object.values(enemiesList).reduce((acc, enemies) => acc + enemies.length, 0)
            setEnemiesLength(total)
        }
    }, [enemiesList])

    return (
        <>
            {(parentRef.current &&
                app.renderer &&
                gameSize) ? (<>
                    <Camera
                        ref={viewportRef}
                        events={app.renderer.events}
                        gameSize={gameSize}
                    >
                        <Ground />
                        <Maggots width={gameSize.width} height={gameSize.height} />
                        <Objects size={gameSize} />
                        <Enemies ref={viewportRef} />
                        {viewportRef ? (<Hero ref={viewportRef} />) : null}
                    </Camera>
                    {viewportRef.current?.position ? (<CustomProgressBar
                        position={viewportRef.current.position}
                        min={0}
                        max={maxEnemyProgress}
                        current={enemiesLength}
                    />) : null}
                </>) : null
            }
        </>
    )
}

export default Game
