import { useEffect, useRef } from "react"
import { useApplication } from "@pixi/react"
import { Viewport } from "pixi-viewport"
// store
import { usePersistedStore } from "@/store"
// hooks
import { useGameLoop } from "@hooks/useGameLoop"
// components
import Hero from "@components/game/hero"
import Enemies from "@/components/game/enemies"
import Camera from "@components/game/camera"
import Maggots from "@components/game/maggots"
import Objects from "@components/game/objects"
import Ground from "@components/game/ground"
import Bullets from "@components/game/bullets"

const Game = ({ parentRef }: all.game.GameProps) => {
    const { app } = useApplication()
    globalThis.__PIXI_APP__ = app
    const viewportRef = useRef<Viewport | null>(null)
    const gameSize = usePersistedStore((state: all.store.PersistedStore) => state.gameSize)
    useGameLoop({ ref: viewportRef })

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
                gameSize) ? (<Camera
                    ref={viewportRef}
                    events={app.renderer.events}
                    gameSize={gameSize}
                    label="camera"
                >
                    {viewportRef ? (<>
                        <Ground size={gameSize} />
                        <Maggots width={gameSize.width} height={gameSize.height} />
                        <Enemies ref={viewportRef} />
                        <Bullets ref={viewportRef} />
                        <Hero ref={viewportRef} />
                        <Objects size={gameSize} />
                    </>) : null}
                </Camera>) : null
            }
        </>
    )
}

export default Game
