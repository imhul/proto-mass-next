import { useEffect, useState, useRef } from "react"
// store
import { useStore, usePersistedStore } from "@/store"
// types
import type {
    AnimatedSprite,
    gameTypes,
    storeTypes,
} from "@lib/types"
// utils
import { eventConductor } from "@lib/events"
// config
import { generatedObjects } from "@lib/config"

export const useMove = ({ viewportRef }: gameTypes.UseMoveProps) => {
    // refs
    const pressedKeys = useRef<{ [key: string]: boolean }>({})
    const keyPressTimers = useRef<{ [key: string]: NodeJS.Timeout | null }>({})
    const animationFrameRef = useRef<number | null>(null)
    const blockedDirections = useRef<Set<gameTypes.MovementDirection>>(new Set())
    // state
    const [heroState, setHeroState] = useState<gameTypes.HeroState>("stand")
    // store
    const isGameInit = usePersistedStore((state: storeTypes.PersistedStore) => state.init)
    const setGameAction = usePersistedStore(
        (state: storeTypes.PersistedStore) => state.setGameAction,
    )
    const heroSnapshot = useStore((state: storeTypes.GlobalStore) => state.hero)

    const createNewMapChunk = (position: gameTypes.Position) => {
        // TODO: 2. write function
    }

    const checkContainerCollision = (position: gameTypes.Position) => {
        // TODO: 1. check collision with map boundaries and run createNewMapChunk(position)
        let collision = true // fake
        if (collision) createNewMapChunk(position)
    }

    const getClosestObjectToHero = (
        pos: gameTypes.Position,
    ): gameTypes.ClosestObject | null => {
        let closestObject: gameTypes.GameObjectEntity | null = null
        let closestDistance = Infinity

        generatedObjects.forEach((object: gameTypes.GameObjectEntity) => {
            const dx = object.position.x - pos.x
            const dy = object.position.y - pos.y
            const distance = Math.hypot(dx, dy)
            if (distance < closestDistance) {
                closestDistance = distance
                closestObject = {
                    dx,
                    dy,
                    ...object,
                }
            }
        })

        if (!closestObject || closestDistance > 10) return null
        let direction: gameTypes.MovementDirection
        const { dx, dy, name, zIndex } = closestObject

        if (Math.abs(dx) > Math.abs(dy)) {
            direction = dx > 0 ? 'rune' : 'runw'
        } else {
            direction = dy > 0 ? 'runs' : 'runn'
        }

        if (Math.abs(dx) > 5 && Math.abs(dy) > 5) {
            if (dx > 0 && dy > 0) direction = 'runse'
            if (dx < 0 && dy > 0) direction = 'runsw'
            if (dx > 0 && dy < 0) direction = 'runne'
            if (dx < 0 && dy < 0) direction = 'runnw'
        }

        return {
            name,
            zIndex,
            direction,
        }
    }

    const checkObjectCollision = (pos: gameTypes.Position): gameTypes.CheckObjectCollision => {
        const vp = viewportRef?.current
        const closest = getClosestObjectToHero(pos)
        if (!closest || !vp) return { collision: false }
        const hero = vp.getChildByLabel("hero")
        const closestEl = vp.getChildByLabel(closest.name)
        if (!closestEl || !hero) return { collision: false }
        const boundsA = hero.getBounds()
        const boundsB = closestEl.getBounds()
        if (!boundsA || !boundsB) return { collision: false }

        return {
            collision: (((boundsA.x < boundsB.x) + boundsB.width) &&
                ((boundsA.x + boundsA.width) > boundsB.x) &&
                ((boundsA.y < boundsB.y) + boundsB.height) &&
                ((boundsA.y + boundsA.height) > boundsB.y)),
            obstacle: {
                direction: closest.direction,
                zIndex: closest.zIndex,
                label: closest.name,
                position: {
                    x: closestEl.children[0].position.x,
                    y: closestEl.children[0].position.y
                }
            },
        }
    }

    const applyMove = (
        dx: number,
        dy: number,
        direction: gameTypes.MovementDirection,
    ) => {
        // -------------------------------------------------------
        const vp = viewportRef?.current
        if (!vp) return
        const hero: AnimatedSprite = vp.getChildByLabel("hero")
        if (!hero.position || !hero.scale || !hero.zIndex) return
        // -------------------------------------------------------
        const newHeroPosition = {
            x: hero.position.x + dx,
            y: hero.position.y + dy,
        }
        // -------------------------------------------------------
        checkContainerCollision(newHeroPosition)
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
        const { collision, obstacle } = checkObjectCollision(newHeroPosition)

        if (collision && obstacle) {
            if (hero.zIndex > obstacle.zIndex) hero.zIndex = obstacle.zIndex - 1
            stopRun(obstacle.direction)
        } else if (!collision) {
            blockedDirections.current.forEach((dir) => {
                if (direction !== dir) blockedDirections.current.delete(dir)
            })
        }
    }

    const runAnimation = (
        dx: number,
        dy: number,
        direction: gameTypes.MovementDirection,
    ) => {
        applyMove(dx, dy, direction)
        animationFrameRef.current = requestAnimationFrame(() =>
            runAnimation(dx, dy, direction),
        )
    }

    const startRun = (
        dx: number,
        dy: number,
        direction: gameTypes.MovementDirection,
    ) => {
        if (animationFrameRef.current)
            cancelAnimationFrame(animationFrameRef.current)
        runAnimation(dx, dy, direction)
    }

    const stopRun = (direction: gameTypes.MovementDirection | null = null) => {
        if (direction) blockedDirections.current.add(direction)
        setHeroState("stand")
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current)
            animationFrameRef.current = null
        }
    }

    const move = (
        direction: gameTypes.MovementDirection | null,
        isKeyDown: boolean = true,
    ) => {
        if (direction && blockedDirections.current.has(direction))
            return stopRun(direction)

        setHeroState("run")
        const heroSpeed = heroSnapshot.speed

        switch (direction) {
            case "runn":
                if (isKeyDown) startRun(0, -heroSpeed, direction)
                else stopRun()
                break
            case "runs":
                if (isKeyDown) startRun(0, heroSpeed, direction)
                else stopRun()
                break
            case "runw":
                if (isKeyDown) startRun(-heroSpeed, 0, direction)
                else stopRun()
                break
            case "rune":
                if (isKeyDown) startRun(heroSpeed, 0, direction)
                else stopRun()
                break
            case "runnw":
                if (isKeyDown) startRun(-heroSpeed, -heroSpeed, direction)
                else stopRun()
                break
            case "runne":
                if (isKeyDown) startRun(heroSpeed, -heroSpeed, direction)
                else stopRun()
                break
            case "runse":
                if (isKeyDown) startRun(heroSpeed, heroSpeed, direction)
                else stopRun()
                break
            case "runsw":
                if (isKeyDown) startRun(-heroSpeed, heroSpeed, direction)
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
