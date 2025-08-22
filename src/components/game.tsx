import { useEffect, useState, useRef } from 'react'
import { useApplication } from '@pixi/react'
// store
import { useStore, usePersistedStore } from "@store"
// components
import { Assets } from 'pixi.js'
import Hero from '@components/hero'
import CustomTilingSprite from '@/components/pixi/custom-tiling-sprite'
import InitialScene from '@components/initial-scene'
import Camera from '@/components/camera'
// types
import type {
    Texture,
    Position,
    HeroState,
    GameProps,
    GlobalStore,
    CameraProps,
    AnimatedSprite,
    PersistedStore,
    MovementDirection,
} from '@lib/types'
// utils
import { eventConductor } from '@lib/events'

const Game = ({ parentRef }: GameProps) => {
    // app
    const { app } = useApplication()
    // refs
    const moveIntervalRef = useRef<NodeJS.Timeout | null>(null)
    const keyPressTimers = useRef<{ [key: string]: NodeJS.Timeout | null }>({})
    const viewportRef = useRef<CameraProps>(null)
    // state
    const [texture, setTexture] = useState<Texture | null>(null)
    const [heroState, setHeroState] = useState<HeroState>("stand")
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


    const createNewMapChunk = (position: Position) => {
        // TODO: 1. write function
    }

    const checkContainerCollision = (position: Position) => {
        // TODO: 2. check collision with map boundaries and run createNewMapChunk(position)
        // TODO: 3. check collision with map obstacles and stop movement
        return true // Placeholder
    }

    const applyMove = (dx: number, dy: number, direction: MovementDirection) => {
        const vp = viewportRef?.current
        if (!vp) return
        const newPosition = {
            x: vp.center.x + dx,
            y: vp.center.y + dy,
        }
        if (!checkContainerCollision(newPosition)) return
        vp.moveCenter(newPosition.x, newPosition.y)
        const hero: AnimatedSprite = vp.children.find((c: any) => c?.label === 'hero') as AnimatedSprite
        if (!hero.position || !hero.scale) return
        hero.position.set(newPosition.x, newPosition.y)
        if (direction.endsWith("left")) {
            hero.scale.x = -3
        } else if (direction.endsWith("right")) {
            hero.scale.x = 3
        }
    }

    const startRun = (dx: number, dy: number, direction: MovementDirection) => {
        if (moveIntervalRef.current) clearInterval(moveIntervalRef.current)

        moveIntervalRef.current = setInterval(() => {
            applyMove(dx, dy, direction)
        }, 100)
    }

    const stopRun = () => {
        if (moveIntervalRef.current) {
            clearInterval(moveIntervalRef.current)
            moveIntervalRef.current = null
            setHeroState("stand")
        }
    }

    const move = (direction: MovementDirection | null, isKeyDown: boolean = true) => {
        setHeroState("run")
        const heroSpeed = heroSnapshot.speed
        switch (direction) {
            case "runup":
                if (isKeyDown) startRun(0, -heroSpeed, direction)
                else stopRun()
                break
            case "rundown":
                if (isKeyDown) startRun(0, heroSpeed, direction)
                else stopRun()
                break
            case "runleft":
                if (isKeyDown) startRun(-heroSpeed, 0, direction)
                else stopRun()
                break
            case "runright":
                if (isKeyDown) startRun(heroSpeed, 0, direction)
                else stopRun()
                break
            default: stopRun(); break
        }
    }

    const onKeyDown = (event: KeyboardEvent) => {
        const direction = eventConductor(event)
        if (!isGameInit) setGameAction("init")
        // If already running, do nothing
        if (keyPressTimers.current[event.code] || !direction) {
            return
        }
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
        // Stop run movement if it was started
        move(null)
    }

    useEffect(() => {
        Assets.load("/assets/tile_0209.png")
            .then((tex) => {
                setTexture(tex as Texture)
            })
            .finally(() => {
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
            </Camera>)
            : (<InitialScene />)
        }
    </>)
}

export default Game
