import { useEffect, useRef, useState } from "react"
import Explosion from "@/components/game/explosion"
import { Assets } from "pixi.js"
// store
import { usePersistedStore } from "@/store"
// hooks
import { useBirthAnimation } from "@hooks/useBirth"

const EnemyBase = ({ isBirth, isDeath, uid, pos }: all.game.EnemyBaseProps) => {
    const baseRef = useRef<all.pixi.Sprite | null>(null)
    const [texture, setTexture] = useState<all.pixi.Texture | null>(null)
    const setGameAction = usePersistedStore(
        (state: all.store.PersistedStore) => state.setGameAction
    )

    useBirthAnimation(
        baseRef as React.RefObject<all.pixi.Sprite>,
        isBirth && !!texture,
        "base"
    )

    useEffect(() => {
        if (!texture) Assets.load("/assets/ships/ship-1.png")
            .then((tex) => {
                setTexture(tex as all.pixi.Texture)
            })
    }, [])

    return texture ? (<>
        <pixiSprite
            ref={baseRef}
            texture={texture}
            anchor={0.5}
            interactive={true}
            width={texture.width}
            height={texture.height}
            scale={0.75}
            x={pos.x + (texture.width / 2 * 0.75)}
            y={pos.y + texture.height}
            label="enemy-base"
        />
        {isDeath ? (<Explosion
            position={pos}
            scale={0.75}
            onComplete={() => setGameAction("removeColony", { uid })}
        />) : null}
    </>) : null
}

export default EnemyBase
