import { useEffect, useState, useRef } from "react"
import { useApplication } from "@pixi/react"
import type { Container } from "pixi.js"
// store
import { useStore, usePersistedStore } from "@/store"
// types
import type {
    Sprite,
    GlobalStore,
    AnimatedSprite,
    PersistedStore,
    gameTypes,
    heroTypes,
    commonTypes,
} from "@lib/types"
// utils
import { eventConductor } from "@lib/events"
// config
import { generatedObjects } from "@lib/config"

export type UseMoveProps = {
    viewportRef: React.RefObject<gameTypes.CameraProps>
}

export const useMove = ({ viewportRef }: UseMoveProps) => {
    // app
    const { app } = useApplication()
    // refs
    const pressedKeys = useRef<{ [key: string]: boolean }>({})
    const keyPressTimers = useRef<{ [key: string]: NodeJS.Timeout | null }>({})
    const animationFrameRef = useRef<number | null>(null)
    // state
    const [heroState, setHeroState] = useState<heroTypes.HeroState>("stand")
    // store
    const isGameInit = usePersistedStore((state: PersistedStore) => state.init)
    const setGameAction = usePersistedStore(
        (state: PersistedStore) => state.setGameAction,
    )
    const heroSnapshot = useStore((state: GlobalStore) => state.hero)

    const createNewMapChunk = (position: commonTypes.Position) => {
        // TODO: 1. write function
    }

    const checkContainerCollision = (position: commonTypes.Position) => {
        // TODO: 2. check collision with map boundaries and run createNewMapChunk(position)
        // TODO: 3. check collision with map obstacles and stop movement
        return true // Placeholder
    }

    const getClosestObjectToHero = (
        pos: commonTypes.Position,
    ): gameTypes.ClosestObject => {
        let closestObject: gameTypes.GameObject | null = null
        let closestDistance = Infinity

        generatedObjects.forEach((object) => {
            const distance = Math.hypot(
                object.position.x - pos.x,
                object.position.y - pos.y,
            )
            if (distance < closestDistance) {
                closestDistance = distance
                closestObject = object
            }
        })

        if (!closestObject) return null
        const { position, zIndex, width, height, name } = closestObject
        return { position, zIndex, width, height, name }
    }

    const checkObjectCollision = (
        newHeroPosition: commonTypes.Position,
        hero: AnimatedSprite,
    ) => {
        const closest = getClosestObjectToHero(newHeroPosition)
        if (!closest || !hero.width) return
        const closestObject = app.stage.children[0].children.find(
            (c: Container) => c?.children[0]?.label === closest?.name,
        )?.children[0] as Sprite
        if (!closestObject) return
        const bounds1 = hero.getBounds()
        const bounds2 = closestObject.getBounds()

        return {
            closestObject,
            intersected:
                bounds1.x < bounds2.x + bounds2.width &&
                bounds1.x + bounds1.width > bounds2.x &&
                bounds1.y < bounds2.y + bounds2.height &&
                bounds1.y + bounds1.height > bounds2.y,
        }
    }

    const applyMove = (
        dx: number,
        dy: number,
        direction: heroTypes.MovementDirection,
    ) => {
        const vp = viewportRef?.current
        if (!vp) return
        const hero: AnimatedSprite = vp.children.find(
            (c: any) => c?.label === "hero",
        ) as AnimatedSprite
        if (!hero.position || !hero.scale || !hero.zIndex) return
        // -------------------------------------------------------
        const newHeroPosition = {
            x: hero.position.x + dx,
            y: hero.position.y + dy,
        }
        if (!checkContainerCollision(newHeroPosition)) return
        // -------------------------------------------------------
        // worked no-easing variant: vp.moveCenter(newCameraPosition.x, newCameraPosition.y)
        // worked easing variant:
        vp.animate({
            time: 1200,
            position: newHeroPosition,
            ease: "easeOutSine",
        })
        // -------------------------------------------------------
        hero.position.set(newHeroPosition.x, newHeroPosition.y)
        if (["runnw", "runsw", "runw"].includes(direction)) {
            hero.scale.x = -3
        } else if (["runne", "runse", "rune"].includes(direction)) {
            hero.scale.x = 3
        }
        // -------------------------------------------------------
        // TODO: need to rework zIndex changing
        const collisionResult = checkObjectCollision(newHeroPosition, hero)
        if (collisionResult) {
            if (collisionResult.intersected) {
                if (hero.zIndex > collisionResult.closestObject.zIndex) {
                    const dist = hero.zIndex - collisionResult.closestObject.zIndex
                    hero.zIndex = hero.zIndex - dist
                } else {
                    hero.zIndex = 100
                }
            } else {
                hero.zIndex = hero.zIndex > 100 ? hero.zIndex : 100
            }
        }
    }

    const runAnimation = (
        dx: number,
        dy: number,
        direction: heroTypes.MovementDirection,
    ) => {
        applyMove(dx, dy, direction)
        animationFrameRef.current = requestAnimationFrame(() =>
            runAnimation(dx, dy, direction),
        )
    }

    const startRun = (
        dx: number,
        dy: number,
        direction: heroTypes.MovementDirection,
    ) => {
        if (animationFrameRef.current)
            cancelAnimationFrame(animationFrameRef.current)
        runAnimation(dx, dy, direction)
    }

    const stopRun = () => {
        setHeroState("stand")
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current)
            animationFrameRef.current = null
        }
    }

    const move = (
        direction: heroTypes.MovementDirection | null,
        isKeyDown: boolean = true,
    ) => {
        setHeroState("run")
        let tempDirection: heroTypes.MovementDirection | "run" = "run"
        const heroSpeed = heroSnapshot.speed
        if (direction !== null) tempDirection = direction
        const dir = direction ?? tempDirection

        switch (dir) {
            case "runn":
                if (isKeyDown) startRun(0, -heroSpeed, dir)
                else stopRun()
                break
            case "runs":
                if (isKeyDown) startRun(0, heroSpeed, dir)
                else stopRun()
                break
            case "runw":
                if (isKeyDown) startRun(-heroSpeed, 0, dir)
                else stopRun()
                break
            case "rune":
                if (isKeyDown) startRun(heroSpeed, 0, dir)
                else stopRun()
                break
            case "runnw":
                if (isKeyDown) startRun(-heroSpeed, -heroSpeed, dir)
                else stopRun()
                break
            case "runne":
                if (isKeyDown) startRun(heroSpeed, -heroSpeed, dir)
                else stopRun()
                break
            case "runse":
                if (isKeyDown) startRun(heroSpeed, heroSpeed, dir)
                else stopRun()
                break
            case "runsw":
                if (isKeyDown) startRun(-heroSpeed, heroSpeed, dir)
                else stopRun()
                break
            default:
                stopRun()
                break
        }
    }

    const onKeyDown = (event: KeyboardEvent) => {
        if (!isGameInit) setGameAction("init")
        pressedKeys.current[event.code] = true
        const direction = eventConductor(pressedKeys.current)
        // If already running, do nothing
        if (keyPressTimers.current[event.code] || !direction) return
        // Start a timer to detect long press
        keyPressTimers.current[event.code] = setTimeout(() => {
            move(direction)
        }, 1000)

        move(direction)
    }

    const onKeyUp = (event: KeyboardEvent) => {
        // Clear the timer if it exists
        if (keyPressTimers.current[event.code]) {
            clearTimeout(keyPressTimers.current[event.code]!)
            keyPressTimers.current[event.code] = null
        }
        pressedKeys.current[event.code] = false
        move(null)
    }

    useEffect(() => {
        window.addEventListener("keydown", onKeyDown)
        window.addEventListener("keyup", onKeyUp)

        return () => {
            window.removeEventListener("keydown", onKeyDown)
            window.removeEventListener("keyup", onKeyUp)
        }
    }, [])

    return { heroState }
}
