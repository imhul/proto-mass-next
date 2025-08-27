import { useEffect, useRef } from "react"
import { useApplication } from "@pixi/react"
// store
import { usePersistedStore } from "@/store"
// hooks
import { useMove } from "@hooks/useMove"
// components
import Hero from "@components/hero"
import Enemy from "@components/enemy"
import Camera from "@components/camera"
import Maggots from "@components/maggots"
import Objects from "@components/objects"
import InitialScene from "@components/initial-scene"
import CustomTilingSprite from "@components/pixi/custom-tiling-sprite"
// types
import type { storeTypes, gameTypes } from "@lib/types"

const Game = ({ parentRef }: gameTypes.GameProps) => {
    // app
    const { app } = useApplication()
    globalThis.__PIXI_APP__ = app
    // refs
    const viewportRef = useRef<gameTypes.CameraProps>(
        null,
    ) as React.RefObject<gameTypes.CameraProps>
    // store
    const isGameInit = usePersistedStore((state: storeTypes.PersistedStore) => state.init)
    const setGameAction = usePersistedStore(
        (state: storeTypes.PersistedStore) => state.setGameAction,
    )
    const gameSize = usePersistedStore((state: storeTypes.PersistedStore) => state.gameSize)
    // hooks
    const { heroState } = useMove({ viewportRef })

    const resize = () => {
        const width = parentRef.current?.clientWidth || window.innerWidth
        const height = parentRef.current?.clientHeight || window.innerHeight
        setGameAction("resize", { width: width * 2, height: height * 2 })
        viewportRef.current?.resize(width, height)
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
            {(isGameInit &&
                parentRef.current &&
                app.renderer &&
                gameSize) ? (
                <Camera
                    ref={viewportRef}
                    events={app.renderer.events}
                    gameSize={gameSize}
                >
                    <CustomTilingSprite />
                    <Maggots width={gameSize.width} height={gameSize.height} />
                    <Objects size={gameSize} />
                    <Enemy ref={viewportRef} />
                    {viewportRef && <Hero state={heroState} ref={viewportRef} />}
                </Camera>
            ) : (<InitialScene />)
            }
        </>
    )
}

export default Game
