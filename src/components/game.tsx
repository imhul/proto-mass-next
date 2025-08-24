import { useEffect, useState, useRef } from 'react'
import { useApplication } from '@pixi/react'
// store
import { usePersistedStore } from "@/store"
// hooks
import { useMove } from '@hooks/useMove'
// components
import { Assets } from 'pixi.js'
import Hero from '@components/hero'
import CustomTilingSprite from '@components/pixi/custom-tiling-sprite'
import InitialScene from '@components/initial-scene'
import Camera from '@components/camera'
import Objects from '@components/objects'
// types
import type {
    Texture,
    PersistedStore,
    gameTypes,
} from '@lib/types'

const Game = ({ parentRef }: gameTypes.GameProps) => {
    // app
    const { app } = useApplication()
    // refs
    const viewportRef = useRef<gameTypes.CameraProps>(null) as React.RefObject<gameTypes.CameraProps>
    // state
    const [texture, setTexture] = useState<Texture | null>(null)
    // store
    const isGameInit = usePersistedStore((state: PersistedStore) => state.init)
    const setGameAction = usePersistedStore((state: PersistedStore) => state.setGameAction)
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
        Assets.load("/assets/tile_0209.png")
            .then((tex) => {
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

    return (<>
        {(isGameInit && parentRef.current && app.renderer && gameSize && texture)
            ? (<Camera
                ref={viewportRef}
                events={app.renderer.events}
                gameSize={gameSize}
            >
                <CustomTilingSprite
                    texture={texture}
                    width={gameSize.width}
                    height={gameSize.height}
                />
                {viewportRef && (<Hero state={heroState} ref={viewportRef} />)}
                <Objects size={gameSize} />
            </Camera>)
            : (<InitialScene />)
        }
    </>)
}

export default Game
