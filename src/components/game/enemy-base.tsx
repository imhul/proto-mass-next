import { useEffect, useRef, useState } from "react"
import { Assets } from "pixi.js"
// hooks
import { useBirthAnimation } from "@hooks/useBirth"
// types
import { gameTypes, Texture, Sprite } from "@lib/types"

const EnemyBase = ({ isBirth, pos }: { isBirth: boolean, pos: gameTypes.Position }) => {
    const baseRef = useRef<Sprite | null>(null)
    const [texture, setTexture] = useState<Texture | null>(null)
    // const [hp, setHp] = useState<number>(100)

    useBirthAnimation(baseRef as React.RefObject<Sprite>, isBirth && !!texture, "base")

    useEffect(() => {
        if (!texture) Assets.load("/assets/ships/ship-1.png")
            .then((tex) => {
                setTexture(tex as Texture)
            })
    }, [])

    return texture ? (
        <pixiSprite
            ref={baseRef}
            texture={texture}
            anchor={0.5}
            interactive={true}
            width={texture.width}
            height={texture.height}
            scale={0.75}
            x={pos.x}
            y={pos.y}
            label="enemy-base"
        />
    ) : null
}

export default EnemyBase
