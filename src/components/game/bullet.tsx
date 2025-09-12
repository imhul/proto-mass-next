
import { useEffect, useRef, useState, useLayoutEffect } from "react"
// store
import { usePersistedStore } from "@/store"
// types
import type { storeTypes, gameTypes, AnimatedSprite } from "@lib/types"
// components
import { Rectangle } from "pixi.js"
// config
import { zindex } from "@lib/config"

export const getEnemyByUid = (colonies: storeTypes.Colonies, uid: string) => {
    for (const colonyId in colonies) {
        const enemy = colonies[colonyId].find((enemy) => enemy.uid === uid)
        if (enemy) return enemy
    }
}

const Bullet = ({
    x,
    y,
    id,
    ref,
    speed,
    owner,
    damage,
    distance,
    textures,
    direction,
    onComplete,
}: gameTypes.BulletProps) => {
    // refs
    const bulletRef = useRef<AnimatedSprite | null>(null)
    const animationFrameRef = useRef<number | null>(null)
    const enemiesRef = useRef<gameTypes.PixiElementInstance[]>([])
    // store
    const hero = usePersistedStore((state: storeTypes.PersistedStore) => state.hero)
    const paused = usePersistedStore((state: storeTypes.PersistedStore) => state.paused)
    const colonies = usePersistedStore((state: storeTypes.PersistedStore) => state.enemies)
    const setGameAction = usePersistedStore((state: storeTypes.PersistedStore) => state.setGameAction)
    // state
    const [started, setStarted] = useState(false)

    const collision = (uid: string) => {
        stopBullet()

        if (owner === "hero") {
            const enemy = getEnemyByUid(colonies, uid)
            if (enemy) {
                const damaged = {
                    ...enemy,
                    damage,
                    hp: enemy.totalHp - damage,
                }
                if (damaged.hp > 0) {
                    setGameAction("updateEnemy", damaged)
                } else {
                    setGameAction("removeEnemy", damaged)
                }
            }
        } else if (owner === "enemy") {
            console.info("hero collision !!!!")
        }
    }

    const stopBullet = () => {
        if (!bulletRef?.current) return
        bulletRef.current.stop()
        animationFrameRef.current && cancelAnimationFrame(animationFrameRef.current)
        onComplete()
    }

    const startBullet = () => {
        if (!bulletRef?.current || !direction) return
        setStarted(true)

        const angle = Math.atan2(
            direction.y - y,
            direction.x - x,
        )

        const velocity = {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed,
        }
        let distanceTraveled = 0

        const updateBullet = () => {
            const bullet = bulletRef.current
            if (!bullet) return
            bullet.x += velocity.x
            bullet.y += velocity.y
            distanceTraveled += speed

            for (const enemy of enemiesRef.current) {
                if (!enemy) continue
                const bulletBounds = bullet.getBounds()
                const enemyBounds = enemy.getBounds()

                if (bulletBounds.containsPoint(enemyBounds.x, enemyBounds.y) || enemyBounds.containsPoint(bulletBounds.x, bulletBounds.y)) {
                    const enemyUid = enemy.label.replace("enemy-", "") || ""
                    collision(enemyUid)
                    break // ?
                }
            }

            if (distanceTraveled < distance) {
                animationFrameRef.current = requestAnimationFrame(updateBullet)
            } else {
                stopBullet()
            }
        }
        animationFrameRef.current = requestAnimationFrame(updateBullet)
    }

    useLayoutEffect(() => {
        if (!ref?.current) return
        const enemyManager = ref.current.getChildByLabel("enemy-manager")
        if (enemyManager) {
            const colonyList = enemyManager.getChildrenByLabel("enemy-colony", true)
            enemiesRef.current = colonyList.flatMap((colony) =>
                colony.getChildrenByLabel(/enemy/, true),
            )
        }
    }, [ref.current])

    useEffect(() => {
        if (!bulletRef.current) return
        if (paused) {
            bulletRef.current.stop()
            animationFrameRef.current && cancelAnimationFrame(animationFrameRef.current)
        } else if (!started && !paused) {
            startBullet()
            bulletRef.current.play()
        }
    }, [hero.state, paused, bulletRef.current, started])

    if (!textures || !Array.isArray(textures) || textures.length === 0) return null

    return (<pixiAnimatedSprite
        textures={textures}
        ref={bulletRef}
        anchor={0.5}
        eventMode={"static"}
        scale={2}
        animationSpeed={0.1}
        x={x}
        y={y}
        interactive={true}
        hitArea={new Rectangle(0, 0, 2, 2)}
        zIndex={zindex.bullet}
        label={`bullet-${owner}-${id}`}
        autoPlay
        loop
    />)
}

export default Bullet
