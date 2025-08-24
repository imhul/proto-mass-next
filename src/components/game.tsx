import { useEffect, useState, useRef } from 'react'
import { useApplication } from '@pixi/react'
// store
import { useStore, usePersistedStore } from "@/store"
// components
import { Assets } from 'pixi.js'
import Hero from '@components/hero'
import CustomTilingSprite from '@components/pixi/custom-tiling-sprite'
import InitialScene from '@components/initial-scene'
import Camera from '@components/camera'
import Objects from '@components/objects'
// types
import type {
    Texture,
    GlobalStore,
    AnimatedSprite,
    PersistedStore,
    gameTypes,
    heroTypes,
    commonTypes,
} from '@lib/types'
// utils
import { eventConductor } from '@lib/events'
// config
import { defaultChunkSize, generatedObjects } from '@lib/config'

const Game = ({ parentRef }: gameTypes.GameProps) => {
    // app
    const { app } = useApplication()
    // refs
    const pressedKeys = useRef<{ [key: string]: boolean }>({})
    const keyPressTimers = useRef<{ [key: string]: NodeJS.Timeout | null }>({})
    const viewportRef = useRef<gameTypes.CameraProps>(null)
    const animationFrameRef = useRef<number | null>(null)
    // state
    const [texture, setTexture] = useState<Texture | null>(null)
    const [heroState, setHeroState] = useState<heroTypes.HeroState>("stand")
    // store
    const isGameInit = usePersistedStore((state: PersistedStore) => state.init)
    const setGameAction = usePersistedStore((state: PersistedStore) => state.setGameAction)
    const heroSnapshot = useStore((state: GlobalStore) => state.hero)
    const gameSize = usePersistedStore((state: PersistedStore) => state.gameSize)

    const resize = () => {
        const width = parentRef.current?.clientWidth || window.innerWidth
        const height = parentRef.current?.clientHeight || window.innerHeight
        setGameAction("resize", { width: width * 2, height: height * 2 })
        viewportRef.current?.resize(width, height)
    }

    const createNewMapChunk = (position: commonTypes.Position) => {
        // TODO: 1. write function
    }

    const checkContainerCollision = (position: commonTypes.Position) => {
        // TODO: 2. check collision with map boundaries and run createNewMapChunk(position)
        // TODO: 3. check collision with map obstacles and stop movement
        return true // Placeholder
    }

    const getClosestObjectToHero = (pos: commonTypes.Position): gameTypes.ClosestObject => {
        let closestObject: gameTypes.GameObject | null = null
        let closestDistance = Infinity

        generatedObjects.forEach((object) => {
            const distance = Math.hypot(object.position.x - pos.x, object.position.y - pos.y)
            if (distance < closestDistance) {
                closestDistance = distance
                closestObject = object
            }
        })

        if (!closestObject) return null
        const { position, zIndex } = closestObject

        return { position, zIndex }
    }

    const applyMove = (dx: number, dy: number, direction: heroTypes.MovementDirection) => {
        const vp = viewportRef?.current
        if (!vp) return
        const hero: AnimatedSprite = vp.children.find((c: any) => c?.label === 'hero') as AnimatedSprite
        if (!hero.position || !hero.scale || !hero.zIndex) return
        // -------------------------------------------------------
        const newHeroPosition = {
            x: hero.position.x + dx,
            y: hero.position.y + dy,
        }
        if (!checkContainerCollision(newHeroPosition)) return
        // -------------------------------------------------------
        // no-easing variant: vp.moveCenter(newCameraPosition.x, newCameraPosition.y)
        // easing variant:
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
        const closestObject = getClosestObjectToHero(newHeroPosition)
        if (!closestObject?.position) return
        if (closestObject.position.y < hero.position.y) {
            hero.zIndex = closestObject.zIndex + 1
        } else {
            hero.zIndex = hero.zIndex < closestObject.zIndex ? hero.zIndex : closestObject.zIndex - 1
        }
    }

    const runAnimation = (dx: number, dy: number, direction: heroTypes.MovementDirection) => {
        applyMove(dx, dy, direction);
        animationFrameRef.current = requestAnimationFrame(() => runAnimation(dx, dy, direction));
    };

    const startRun = (dx: number, dy: number, direction: heroTypes.MovementDirection) => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        runAnimation(dx, dy, direction);
    };

    const stopRun = () => {
        setHeroState("stand")
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current)
            animationFrameRef.current = null
        }
    };

    const move = (direction: heroTypes.MovementDirection | null, isKeyDown: boolean = true) => {
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
            default: stopRun()
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
        Assets.load("/assets/tile_0209.png")
            .then((tex) => {
                setTexture(tex as Texture)
                resize()
            })
    }, [])

    useEffect(() => {
        window.addEventListener("keydown", onKeyDown)
        window.addEventListener("keyup", onKeyUp)
        window.addEventListener("resize", resize)

        resize()

        return () => {
            window.removeEventListener("keydown", onKeyDown)
            window.removeEventListener("keyup", onKeyUp)
            window.removeEventListener("resize", resize)
        }
    }, [])

    return (<>
        {(isGameInit && parentRef.current && app.renderer && gameSize && texture)
            ? (<Camera
                ref={viewportRef}
                events={app.renderer.events}
                gameSize={gameSize}
            >
                <CustomTilingSprite
                    texture={texture}
                    width={gameSize.width}
                    height={gameSize.height}
                />
                {viewportRef && (<Hero state={heroState} ref={viewportRef} />)}
                <Objects size={gameSize} />
            </Camera>)
            : (<InitialScene />)
        }
    </>)
}

export default Game
