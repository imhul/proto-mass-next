import { useEffect, useState, useRef } from "react"
// store
import { useStore, usePersistedStore } from "@/store"
// utils
import { generateMapChunk } from "@lib/utils"
import { Tween, Easing } from "@tweenjs/tween.js"
// types
import type { gameTypes, storeTypes } from "@lib/types"
// config
import {
    zindex,
    heroSize,
    heroJumpHeight,
    heroJumpDuration,
    defaultChunkSize,
    distanceToMapBorder,
} from "@lib/config"

export const useMove = ({ ref }: gameTypes.UseMoveProps) => {
    // refs
    const isJumpingRef = useRef(false)
    const jumpAnimationRef = useRef<number | null>(null)
    const pressedKeys = useRef<{ [key: string]: boolean }>({})
    const keyPressTimers = useRef<{ [key: string]: NodeJS.Timeout | null }>({})
    const animationFrameRef = useRef<number | null>(null)
    const blockedDirections = useRef<Set<gameTypes.MovementDirection>>(new Set())
    // store
    const heroSnapshot = useStore((state: storeTypes.GlobalStore) => state.hero)
    const keyBindings = usePersistedStore((state: storeTypes.PersistedStore) => state.preferences.keyBindings)
    const water = usePersistedStore((state: storeTypes.PersistedStore) => state.water)
    const setHeroAction = useStore(
        (state: storeTypes.GlobalStore) => state.setHeroAction,
    )

    const checkContainerCollision = (position: gameTypes.Position) => {
        if (position.x < distanceToMapBorder) generateMapChunk(position, "left")
        if (position.y < distanceToMapBorder) generateMapChunk(position, "top")
        if (position.x > (defaultChunkSize * 2) - distanceToMapBorder) generateMapChunk(position, "right")
        if (position.y > (defaultChunkSize * 2) - distanceToMapBorder) generateMapChunk(position, "bottom")
    }

    // TODO: 4. Completely overhaul the water collision checking and hero stopping system, including:
    // getClosestObjectToHero
    // checkObjectCollision
    // applyMove (stopping and continuing movement after collision in certain directions) logic
    const getClosestObjectToHero = (
        pos: gameTypes.Position,
    ): gameTypes.MovementDirection | null => {
        let closestWater: gameTypes.ClosestWater | null = null
        let closestDistance = Infinity

        water.forEach((object: gameTypes.Position) => {
            const dx = object.x - pos.x
            const dy = object.y - pos.y
            const distance = Math.hypot(dx, dy)
            if (distance < closestDistance) {
                closestDistance = distance
                closestWater = { dx, dy }
            }
        })

        if (!closestWater || closestDistance > 10) return null
        let direction: gameTypes.MovementDirection
        const { dx, dy } = closestWater

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

        return direction
    }

    // const checkObjectCollision = (pos: gameTypes.Position): gameTypes.CheckObjectCollision => {
    //     const view = ref?.current
    //     const closest = getClosestObjectToHero(pos)
    //     if (!closest || !view) return { collision: false }
    //     const hero = view.getChildByLabel("hero")
    //     const closestEl = view.getChildByLabel(closest.name)
    //     if (!closestEl || !hero) return { collision: false }
    //     const boundsA = hero.getBounds()
    //     const boundsB = closestEl.getBounds()
    //     if (!boundsA || !boundsB) return { collision: false }

    //     return {
    //         collision: (((boundsA.x < boundsB.x) + boundsB.width) &&
    //             ((boundsA.x + boundsA.width) > boundsB.x) &&
    //             ((boundsA.y < boundsB.y) + boundsB.height) &&
    //             ((boundsA.y + boundsA.height) > boundsB.y)),
    //         obstacle: {
    //             direction: closest.direction,
    //             label: closest.name,
    //             position: {
    //                 x: closestEl.children[0].position.x,
    //                 y: closestEl.children[0].position.y
    //             }
    //         },
    //     }
    // }

    const applyMove = (
        dx: number,
        dy: number,
        direction: gameTypes.MovementDirection,
    ) => {
        // -------------------------------------------------------
        const view = ref?.current
        if (!view) return
        const hero: gameTypes.HeroInstance = view.getChildByLabel("hero")
        if (!hero?.position || !hero?.scale) return
        // -------------------------------------------------------
        const newHeroPosition = {
            x: hero.position.x + dx,
            y: hero.position.y + dy,
        }
        // -------------------------------------------------------
        checkContainerCollision(newHeroPosition)
        // -------------------------------------------------------
        // worked no-easing variant: view.moveCenter(newCameraPosition.x, newCameraPosition.y)
        // worked easing variant:
        view.animate({
            time: 1200,
            position: newHeroPosition,
            ease: "easeOutSine",
        })
        // -------------------------------------------------------
        hero.zIndex = (hero.zIndex < zindex.hero || newHeroPosition.y < zindex.hero)
            ? zindex.hero
            : Math.floor(newHeroPosition.y - heroSize / 2)
        // -------------------------------------------------------
        hero.position.set(newHeroPosition.x, newHeroPosition.y)
        if (["runnw", "runsw", "runw", "shoot-left", "jump-left"].includes(direction)) {
            hero.scale.x = -3
        } else if (["runne", "runse", "rune", "shoot-right", "jump-right"].includes(direction)) {
            hero.scale.x = 3
        }
        // -------------------------------------------------------
        // TODO:
        // const { collision, obstacle } = checkObjectCollision(newHeroPosition)

        // if (collision && obstacle) {
        //     stopRun(obstacle.direction)
        // } else if (!collision) {
        //     blockedDirections.current.forEach((dir) => {
        //         if (direction !== dir) blockedDirections.current.delete(dir)
        //     })
        // }
        // -------------------------------------------------------
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
        setHeroAction("player-idle")
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current)
            animationFrameRef.current = null
        }
    }

    const jump = () => {
        if (isJumpingRef.current) return
        isJumpingRef.current = true

        setHeroAction("player-jump")

        const view = ref?.current
        if (!view) return
        const hero: gameTypes.HeroInstance = view.getChildByLabel("hero")
        if (!hero?.position) return

        const startY = hero.position.y
        const radius = heroJumpHeight
        const startTime = performance.now()

        const animate = (time: number): void => {
            if (!hero?.position) return
            const elapsed = time - startTime
            const progress = Math.min(elapsed / (heroJumpDuration * 2), 1)
            const angle = progress * Math.PI
            hero.position.y = startY - radius * Math.sin(angle)

            if (progress < 1) {
                jumpAnimationRef.current = requestAnimationFrame(animate)
            } else {
                isJumpingRef.current = false
                if (jumpAnimationRef.current) {
                    cancelAnimationFrame(jumpAnimationRef.current)
                    jumpAnimationRef.current = null
                }
                if (pressedKeys.current["Space"]) {
                    jump()
                }
            }
        }

        jumpAnimationRef.current = requestAnimationFrame(animate)
    }


    const move = (
        direction: gameTypes.MovementDirection | null,
        isKeyDown: boolean = true,
    ) => {
        if (direction && blockedDirections.current.has(direction))
            return stopRun(direction)

        setHeroAction("player-run")
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
            case "jump":
                jump()
                setHeroAction("player-jump")
                break
            case "shoot":
                setHeroAction("player-stand")
                break
            case "shoot-left":
                setHeroAction("player-run-shot")
                break
            case "shoot-right":
                setHeroAction("player-run-shot")
                break
            default:
                stopRun()
                break
        }
    }

    const eventConductor = (pressed: { [key: string]: boolean }): gameTypes.MovementDirection | null => {
        const up = keyBindings.moveup.codes.some((key: string) => pressed[key])
        const down = keyBindings.movedown.codes.some((key: string) => pressed[key])
        const left = keyBindings.moveleft.codes.some((key: string) => pressed[key])
        const right = keyBindings.moveright.codes.some((key: string) => pressed[key])
        const jump = keyBindings.jump.codes.some((key: string) => pressed[key])
        const shoot = keyBindings.shoot.codes.some((key: string) => pressed[key])

        // run & jump (dedicated to Current Value)
        if (jump) return "jump"

        // // run & shoot
        if (((up && left) || (down && left) || left) && shoot) return "shoot-left"
        if (((up && right) || (down && right) || right) && shoot) return "shoot-right"
        if (shoot) return "shoot"

        // run
        if (up && left) return "runnw"
        if (up && right) return "runne"
        if (down && left) return "runsw"
        if (down && right) return "runse"
        if (up) return "runn"
        if (down) return "runs"
        if (left) return "runw"
        if (right) return "rune"

        return null
    }

    const onKeyDown = (event: KeyboardEvent) => {
        pressedKeys.current[event.code] = true
        const direction = eventConductor(pressedKeys.current)
        if (!direction) return

        if (direction === "jump") {
            if (!isJumpingRef.current) {
                jump()
            }
            return
        }

        if (keyPressTimers.current[event.code]) return
        keyPressTimers.current[event.code] = setTimeout(() => {
            move(direction)
        }, 1000)
        move(direction)
    }

    const onKeyUp = (event: KeyboardEvent) => {
        if (keyPressTimers.current[event.code]) {
            clearTimeout(keyPressTimers.current[event.code]!);
            keyPressTimers.current[event.code] = null;
        }
        pressedKeys.current[event.code] = false;
        const direction = eventConductor(pressedKeys.current);
        if (direction) {
            move(direction)
        } else {
            stopRun()
        }
    }

    useEffect(() => {
        if (!keyBindings) return
        window.addEventListener("keydown", onKeyDown)
        window.addEventListener("keyup", onKeyUp)

        return () => {
            window.removeEventListener("keydown", onKeyDown)
            window.removeEventListener("keyup", onKeyUp)
        }
    }, [])
}
