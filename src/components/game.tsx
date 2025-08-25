import { useEffect, useState, useRef } from "react"
import { useApplication } from "@pixi/react"
import { Assets } from "pixi.js"
// store
import { usePersistedStore } from "@/store"
// hooks
import { useMove } from "@hooks/useMove"
// components
import Hero from "@components/hero"
import Camera from "@components/camera"
import Maggots from "@components/maggots"
import Objects from "@components/objects"
import InitialScene from "@components/initial-scene"
import CustomTilingSprite from "@components/pixi/custom-tiling-sprite"
// types
import type { Texture, PersistedStore, gameTypes } from "@lib/types"

const Game = ({ parentRef }: gameTypes.GameProps) => {
    // app
    const { app } = useApplication()
    globalThis.__PIXI_APP__ = app
    // refs
    const viewportRef = useRef<gameTypes.CameraProps>(
        null,
    ) as React.RefObject<gameTypes.CameraProps>
    // state
    const [texture, setTexture] = useState<Texture | null>(null)
    // store
    const isGameInit = usePersistedStore((state: PersistedStore) => state.init)
    const setGameAction = usePersistedStore(
        (state: PersistedStore) => state.setGameAction,
    )
    const gameSize = usePersistedStore((state: PersistedStore) => state.gameSize)
    // hooks
    const { heroState } = useMove({ viewportRef })

    const resize = () => {
        const width = parentRef.current?.clientWidth || window.innerWidth
        const height = parentRef.current?.clientHeight || window.innerHeight
        setGameAction("resize", { width: width * 2, height: height * 2 })
        viewportRef.current?.resize(width, height)
    }

    useEffect(() => {
        Assets.load("/assets/tile_0209.png").then((tex) => {
            setTexture(tex as Texture)
            resize()
        })
    }, [])

    useEffect(() => {
        window.addEventListener("resize", resize)
        resize()

        return () => {
            window.removeEventListener("resize", resize)
        }
    }, [])

    return (
        <>
            {isGameInit &&
                parentRef.current &&
                app.renderer &&
                gameSize &&
                texture ? (
                <Camera
                    ref={viewportRef}
                    events={app.renderer.events}
                    gameSize={gameSize}
                >
                    <CustomTilingSprite
                        texture={texture}
                        width={gameSize.width}
                        height={gameSize.height}
                    />
                    <Maggots width={gameSize.width} height={gameSize.height} />
                    <Objects size={gameSize} />
                    {viewportRef && <Hero state={heroState} ref={viewportRef} />}
                </Camera>
            ) : (
                <InitialScene />
            )}
        </>
    )
}

export default Game
