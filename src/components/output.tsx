import { useRef } from "react"
import { Application, useExtend } from "@pixi/react"
// store
import { usePersistedStore } from "@/store"
// components
import Game from "@components/game"
import InitialScene from "@components/initial-scene"
import {
    AnimatedSprite,
    TilingSprite,
    Container,
    Graphics,
    Sprite,
} from "pixi.js"
// types
import type { storeTypes } from "@lib/types"

export const Output = () => {
    const parentRef = useRef<HTMLDivElement>(null)
    const isGameInit = usePersistedStore((state: storeTypes.PersistedStore) => state.init)

    useExtend({
        AnimatedSprite,
        TilingSprite,
        Container,
        Graphics,
        Sprite,
    })

    return (
        <div ref={parentRef} className="game-container">
            {isGameInit ? (<Application resizeTo={parentRef}>
                <Game parentRef={parentRef} />
            </Application>) : (<InitialScene />)}
        </div>
    )
}
