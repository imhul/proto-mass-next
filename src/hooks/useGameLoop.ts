import { useLayoutEffect, useEffect, useRef } from "react"
// store
import { usePersistedStore } from "@/store"
// utils
import { generateMapChunk } from "@lib/utils"
// config
import {
    zindex,
    heroSize,
    heroScale,
    heroJumpHeight,
    heroJumpDuration,
    defaultChunkSize,
    distanceToMapBorder,
} from "@lib/config"

type Store = all.store.PersistedStore

export const useGameLoop = ({ ref }: all.game.UseGameLoopProps) => {
    // refs
    const isJumpingRef = useRef(false)
    const jumpAnimationRef = useRef<number | null>(null)
    const pressedKeys = useRef<{ [key: string]: boolean }>({})
    const keyPressTimers = useRef<{ [key: string]: NodeJS.Timeout | null }>({})
    const animationFrameRef = useRef<number | null>(null)
    const blockedDirections = useRef<Set<all.game.MovementDirection>>(new Set())
    // store
    // const enemyColonies: all.store.Colonies = usePersistedStore((s: Store) => s.enemies)
    const heroSnapshot = usePersistedStore((s: Store) => s.hero)
    const keyBindings = usePersistedStore((s: Store) => s.preferences.keyBindings)
    const water = usePersistedStore((s: Store) => s.water)
    const paused = usePersistedStore((s: Store) => s.paused)
    const setHeroAction = usePersistedStore((s: Store) => s.setHeroAction)
    const setGameAction = usePersistedStore((s: Store) => s.setGameAction)
    // refs to Pixi elements
    const viewRef = useRef<all.view.Viewport | null>(null)
    const heroRef = useRef<all.game.PixiElementInstance | null>(null)
    const enemiesRef = useRef<all.game.PixiElementInstance[]>([])
    const bulletsRef = useRef<all.game.PixiElementInstance[]>([])

    useLayoutEffect(() => {
        if (!ref.current) return
        viewRef.current = ref.current
        heroRef.current = ref.current.getChildByLabel("hero")
        const enemyManager = ref.current.getChildByLabel("enemy-manager")
        if (enemyManager) {
            const colonyList = enemyManager.getChildrenByLabel("enemy-colony", true)
            enemiesRef.current = colonyList.flatMap(colony =>
                colony.getChildrenByLabel(/enemy/, true),
            )
        }

        bulletsRef.current = ref.current.getChildrenByLabel(/bullet/, true)
    }, [ref.current, heroSnapshot.state])

    const getView = (): all.view.Viewport => {
        if (!viewRef.current) throw new Error("Viewport is not ready yet")
        return viewRef.current
    }
    const getHero = (): all.game.PixiElementInstance => {
        if (!heroRef.current) throw new Error("Hero not found")
        return heroRef.current
    }

    // const getEnemies = (): all.game.PixiElementInstance[] => enemiesRef.current
    // const getBullets = (): all.game.PixiElementInstance[] => bulletsRef.current

    const checkContainerCollision = (position: all.game.Position) => {
        if (position.x < distanceToMapBorder) generateMapChunk(position, "left")
        if (position.y < distanceToMapBorder) generateMapChunk(position, "top")
        if (position.x > (defaultChunkSize * 2) - distanceToMapBorder) generateMapChunk(position, "right")
        if (position.y > (defaultChunkSize * 2) - distanceToMapBorder) generateMapChunk(position, "bottom")
    }

    const checkWaterCollision = (
        newPos: all.game.Position,
    ): { collision: boolean; direction: all.game.MovementDirection | null } => {
        let collidedDirection: all.game.MovementDirection | null = null
        const halfOfHero = heroSize / 2

        for (const object of water) {
            const dx = object.x - newPos.x + halfOfHero
            const dy = object.y - newPos.y - halfOfHero
            const distance = Math.hypot(dx, dy)

            // object radius
            if (distance < halfOfHero) {
                if (Math.abs(dx) > Math.abs(dy)) {
                    collidedDirection = dx > 0 ? "rune" : "runw"
                } else {
                    collidedDirection = dy > 0 ? "runs" : "runn"
                }
                return { collision: true, direction: collidedDirection }
            }
        }

        return { collision: false, direction: null }
    }

    const applyMove = (
        dx: number,
        dy: number,
        direction: all.game.MovementDirection,
    ) => {
        // -------------------------------------------------------
        const view = viewRef.current
        const hero = heroRef.current
        if (!hero || !view) return
        // -------------------------------------------------------
        const newHeroPosition = {
            x: hero.position.x + dx,
            y: hero.position.y + dy,
        }
        // -------------------------------------------------------
        checkContainerCollision(newHeroPosition)
        // -------------------------------------------------------
        const { collision, direction: obstacleDir } = checkWaterCollision(newHeroPosition)

        if (collision && obstacleDir) {
            blockedDirections.current.add(obstacleDir)
            stopRun(obstacleDir)
            return
        } else {
            blockedDirections.current.clear()
        }
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
            hero.scale.x = -heroScale
        } else if (["runne", "runse", "rune", "shoot-right", "jump-right"].includes(direction)) {
            hero.scale.x = heroScale
        }
        // -------------------------------------------------------
    }

    const runAnimation = (
        dx: number,
        dy: number,
        direction: all.game.MovementDirection,
    ) => {
        applyMove(dx, dy, direction)
        animationFrameRef.current = requestAnimationFrame(() =>
            runAnimation(dx, dy, direction),
        )
    }

    const startRun = (
        dx: number,
        dy: number,
        direction: all.game.MovementDirection,
    ) => {
        if (animationFrameRef.current)
            cancelAnimationFrame(animationFrameRef.current)
        runAnimation(dx, dy, direction)
    }

    const stopRun = (direction: all.game.MovementDirection | null = null) => {
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

        const hero = getHero()
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
        direction: all.game.MovementDirection | null,
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

    const eventConductor = (pressed: { [key: string]: boolean }): all.game.MovementDirection | null => {
        const up = keyBindings.moveup.codes.some((key: string) => pressed[key])
        const down = keyBindings.movedown.codes.some((key: string) => pressed[key])
        const left = keyBindings.moveleft.codes.some((key: string) => pressed[key])
        const right = keyBindings.moveright.codes.some((key: string) => pressed[key])
        const jump = keyBindings.jump.codes.some((key: string) => pressed[key])
        const shoot = keyBindings.shoot.codes.some((key: string) => pressed[key])
        const escape = keyBindings.pause.codes.some((key: string) => pressed[key])
        if (escape) {
            pressedKeys.current = {}
            setGameAction("pause")
            return null
        }

        // TODO: if hero after run-n-shoot releases the "run" key, he must stop and shoot

        // run & jump command (dedicated to Current Value)
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
        if (paused) return
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
        if (paused) return
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
        if (!keyBindings || paused) return
        window.addEventListener("keydown", onKeyDown)
        window.addEventListener("keyup", onKeyUp)

        if (ref?.current && (heroSnapshot.position.x !== 0 || heroSnapshot.position.y !== 0)) {
            ref.current.animate({
                time: 1200,
                position: heroSnapshot.position,
                ease: "easeOutSine",
            })
        }

        return () => {
            window.removeEventListener("keydown", onKeyDown)
            window.removeEventListener("keyup", onKeyUp)
        }
    }, [paused])
}
