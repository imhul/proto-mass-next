import { useEffect, useRef } from "react"
import { useApplication } from "@pixi/react"
// store
import { usePersistedStore } from "@/store"
// components
import Hero from "@components/hero"
import Enemies from "@components/enemies"
import Camera from "@components/camera"
import Maggots from "@components/maggots"
import Objects from "@components/objects"
import Ground from "@components/ground"
// types
import type { storeTypes, gameTypes } from "@lib/types"

const Game = ({ parentRef }: gameTypes.GameProps) => {
    const { app } = useApplication()
    globalThis.__PIXI_APP__ = app
    const viewportRef = useRef<gameTypes.CameraProps>(
        null,
    ) as React.RefObject<gameTypes.CameraProps>
    const gameSize = usePersistedStore((state: storeTypes.PersistedStore) => state.gameSize)

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

    return (
        <>
            {(parentRef.current &&
                app.renderer &&
                gameSize) ? (
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
            ) : null
            }
        </>
    )
}

export default Game
