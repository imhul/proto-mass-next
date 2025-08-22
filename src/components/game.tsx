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
    const [gameSize, setGameSize] = useState<{ width: number; height: number } | null>(null)
    const [heroState, setHeroState] = useState<HeroState>("stand")
    // store
    const isGameInit = usePersistedStore((state: PersistedStore) => state.init)
    const setGameInit = usePersistedStore((state: PersistedStore) => state.setGameAction)
    const heroSnapshot = useStore((state: GlobalStore) => state.hero)

    const checkContainerCollision = (position: Position) => {
        if (!parentRef.current || !gameSize) return false
        if (gameSize.width === 0 || gameSize.height === 0) return true

        return (
            position?.x >= 0 &&
            position?.y >= 0 &&
            position?.x <= gameSize.width &&
            position?.y <= gameSize.height
        )
    }

    // TODO: Потрібно налаштувати все так, 
    // щоб розмір CustomTilingSprite був вдвічі більший, 
    // ніж parentRef.current або window.clientWidth/clientHeight
    // а розміри камери дорівнювали parentRef.current або window.clientWidth/clientHeight
    // Також необхідно дописати функцію applyMove, щоб вона пересувала камеру залежно від отриманих параметрів
    const applyMove = (dx: number, dy: number) => {
        const vp = viewportRef.current
        if (!vp) return
        const newPosition = {
            x: vp.center.x + dx,
            y: vp.center.y + dy,
        }
        if (!checkContainerCollision(newPosition)) return
        vp.moveCenter(newPosition.x, newPosition.y)
    }

    const startRun = (dx: number, dy: number) => {
        if (moveIntervalRef.current) clearInterval(moveIntervalRef.current)

        moveIntervalRef.current = setInterval(() => {
            applyMove(dx, dy)
        }, 100)
    }

    const stopRun = () => {
        if (moveIntervalRef.current) {
            clearInterval(moveIntervalRef.current)
            moveIntervalRef.current = null
            setHeroState("stand")
        }
    }

    const move = (direction: MovementDirection, isKeyDown: boolean = true) => {
        setHeroState("run")
        const heroSpeed = heroSnapshot.speed
        switch (direction) {
            case "stepup": applyMove(0, -heroSpeed); break
            case "stepdown": applyMove(0, heroSpeed); break
            case "stepleft": applyMove(-heroSpeed, 0); break
            case "stepright": applyMove(heroSpeed, 0); break
            case "runup": isKeyDown ? startRun(0, -heroSpeed) : stopRun(); break
            case "rundown": isKeyDown ? startRun(0, heroSpeed) : stopRun(); break
            case "runleft": isKeyDown ? startRun(-heroSpeed, 0) : stopRun(); break
            case "runright": isKeyDown ? startRun(heroSpeed, 0) : stopRun(); break
        }
    }

    const onKeyDown = (event: KeyboardEvent) => {
        const direction = eventConductor(event)
        if (!isGameInit) {
            setGameInit("init")
            return
        }
        // If already running, do nothing
        if (keyPressTimers.current[event.code] || !direction) return
        // Start a timer to detect long press
        keyPressTimers.current[event.code] = setTimeout(() => {
            move(`run${direction.replace('step', '')}` as MovementDirection, true)
        }, 1000)

        move(direction, true)
    }

    const onKeyUp = (event: KeyboardEvent) => {
        const direction = eventConductor(event)
        if (!direction) return
        // Clear the timer if it exists
        if (keyPressTimers.current[event.code]) {
            clearTimeout(keyPressTimers.current[event.code]!)
            keyPressTimers.current[event.code] = null
        }
        // Stop run movement if it was started
        if (direction.startsWith('step')) {
            move(`run${direction.replace('step', '')}` as MovementDirection, false)
        }
    }

    const resize = () => {
        const width = parentRef.current?.clientWidth || window.innerWidth
        const height = parentRef.current?.clientHeight || window.innerHeight
        setGameSize({ width: width * 2, height: height * 2 })
        viewportRef.current?.resize(width, height)
    }

    useEffect(() => {
        Assets.load("/assets/tile_0209.png")
            .then((tex) => {
                setTexture(tex as Texture)
            })
    }, [])

    useEffect(() => {
        window.addEventListener("keydown", onKeyDown)
        window.addEventListener("keyup", onKeyUp)
        window.addEventListener("resize", resize)

        if (!gameSize) resize()

        return () => {
            window.removeEventListener("keydown", onKeyDown)
            window.removeEventListener("keyup", onKeyUp)
            window.removeEventListener("resize", resize)
        }
    }, [])

    return (<>
        {(isGameInit && parentRef.current && app.renderer && gameSize)
            ? (<Camera
                ref={viewportRef}
                events={app.renderer.events}
                gameSize={gameSize}
            >
                {texture && (<CustomTilingSprite
                    texture={texture}
                    width={gameSize.width}
                    height={gameSize.height}
                />)}
                <Hero state={heroState} ref={parentRef.current} />
            </Camera>)
            : (<InitialScene />)
        }
    </>)
}

export default Game
