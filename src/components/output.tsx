import { useRef } from "react"
// components
import { Application, useExtend } from "@pixi/react"
import Game from "@components/game"
import {
    AnimatedSprite,
    TilingSprite,
    Container,
    Graphics,
    Sprite,
} from "pixi.js"

export const Output = () => {
    const parentRef = useRef<HTMLDivElement>(null)

    useExtend({
        AnimatedSprite,
        TilingSprite,
        Container,
        Graphics,
        Sprite,
    })

    return (
        <div ref={parentRef} className="game-container">
            <Application resizeTo={parentRef}>
                <Game parentRef={parentRef} />
            </Application>
        </div>
    )
}
