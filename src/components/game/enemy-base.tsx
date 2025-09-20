import { useEffect, useRef, useState } from "react"
import { Assets } from "pixi.js"
// components
import Explosion from "@/components/game/explosion"
// store
import { usePersistedStore } from "@/store"
// hooks
import { useBirthAnimation } from "@hooks/useBirth"
// utils
import { dropShadowFilter } from "@lib/utils"

type Store = all.store.PersistedStore

const EnemyBase = ({ isBirth, isDeath, uid, pos }: all.game.EnemyBaseProps) => {
    const baseRef = useRef<all.pixi.AnimatedSprite | null>(null)
    const [angry, setAngry] = useState<boolean>(false)
    const [size, setSize] = useState<all.game.BaseSize>({ width: 0, height: 0 })
    const [textures, setTextures] = useState<all.pixi.AnimatedSpriteFrames | null>(null)
    // store
    const paused = usePersistedStore((s: Store) => s.paused)
    const enemiesList = usePersistedStore((s: Store) => s.enemies)
    const setGameAction = usePersistedStore((s: Store) => s.setGameAction)

    useBirthAnimation(
        baseRef as React.RefObject<all.pixi.Sprite>,
        isBirth && !!textures,
        "base"
    )

    useEffect(() => {
        if (!textures) Assets.load("/assets/enemy/enemy-base.json")
            .then((tex) => {
                const values = Object.values(tex.textures) as all.pixi.Texture[]
                setSize({ width: values[0]?.width || 100, height: values[0]?.height || 100 })
                const animation = Object.values(tex.textures).map((texture) => texture)
                setTextures(animation as all.pixi.AnimatedSpriteFrames)
            })
    }, [textures, uid])

    useEffect(() => {
        if (baseRef.current && textures) {
            if (paused) {
                baseRef.current.stop()
            } else {
                baseRef.current.play()
            }
        }
    }, [textures, paused, uid])

    useEffect(() => {
        const colony = enemiesList[uid]
        if (!colony) return
        const angry = colony.angry
        setAngry(angry)
    }, [uid, enemiesList])

    return textures ? (<>
        <pixiAnimatedSprite
            ref={baseRef}
            textures={textures}
            anchor={0.5}
            interactive={true}
            width={size.width}
            height={size.height}
            animationSpeed={angry ? 0.2 : 0.1}
            scale={0.75}
            x={pos.x + ((size.width / 2) * 0.75)}
            y={pos.y + size.height}
            label="enemy-base"
            filters={[dropShadowFilter.enemyBase]}
            autoPlay
            loop
        />
        {isDeath ? (<Explosion
            position={pos}
            scale={0.75}
            onComplete={() => setGameAction("removeColony", { uid })}
        />) : null}
    </>) : null
}

export default EnemyBase
