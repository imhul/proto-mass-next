"use client"

import { useState, useEffect, useRef } from 'react'
import { Application, extend } from '@pixi/react'
// components
import Bunny from './bunny'
import InitialScene from '@/components/initial-scene'
import CustomTilingSprite from '@/components/pixi/custom-tiling-sprite'
import {
    TilingSprite,
    Container,
    Graphics,
    Assets,
    Sprite,
} from 'pixi.js'
// types
import type { MovementDirection, Position } from '@/lib/types'
import type { Texture } from 'pixi.js'
// utils
import { eventConductor } from '@/lib/events'
import {
    saveToLocalStorage,
    readFromLocalStorage,
} from '@/lib/utils'

extend({
    TilingSprite,
    Container,
    Graphics,
    Sprite,
})

const speed = 10

const Game = () => {
    const parentRef = useRef<HTMLDivElement>(null)
    const moveIntervalRef = useRef<NodeJS.Timeout | null>(null)
    const [position, setPosition] = useState<Position>()
    const keyPressTimers = useRef<{ [key: string]: NodeJS.Timeout | null }>({})
    const [texture, setTexture] = useState<Texture | null>(null)
    const [gameSize, setGameSize] = useState<{ width: number; height: number }>({
        width: 0,
        height: 0,
    })


    const checkContainerCollision = (position: Position) => {
        if (!parentRef.current) return false
        if (gameSize.width === 0 || gameSize.height === 0) return true

        return (
            position?.x >= 0 &&
            position?.y >= 0 &&
            position?.x <= gameSize.width &&
            position?.y <= gameSize.height
        )
    }

    const applyMove = (dx: number, dy: number) => {
        setPosition((pos) => {
            if (!pos) return { x: 0, y: 0 }
            const newPos = { x: pos.x + dx, y: pos.y + dy }
            if (!checkContainerCollision(newPos)) return pos
            return newPos
        })
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
        }
    }

    const move = (direction: MovementDirection, isKeyDown: boolean = true) => {
        switch (direction) {
            case "stepup":
                applyMove(0, -speed)
                break
            case "stepdown":
                applyMove(0, speed)
                break
            case "stepleft":
                applyMove(-speed, 0)
                break
            case "stepright":
                applyMove(speed, 0)
                break
            case "runup":
                if (isKeyDown) startRun(0, -speed)
                else stopRun()
                break
            case "rundown":
                if (isKeyDown) startRun(0, speed)
                else stopRun()
                break
            case "runleft":
                if (isKeyDown) startRun(-speed, 0)
                else stopRun()
                break
            case "runright":
                if (isKeyDown) startRun(speed, 0)
                else stopRun()
                break
        }
    }

    const onKeyDown = (event: KeyboardEvent) => {
        const local = readFromLocalStorage("init")
        const direction = eventConductor(event, local)
        if (!local) {
            saveToLocalStorage("init", true)
            direction && move(direction, true)
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

    useEffect(() => {
        window.addEventListener("keydown", onKeyDown)
        window.addEventListener("keyup", onKeyUp)

        return () => {
            window.removeEventListener("keydown", onKeyDown)
            window.removeEventListener("keyup", onKeyUp)
        }
    }, [])

    useEffect(() => {
        const ref = parentRef?.current
        if (!ref) return
        setPosition({ x: ref.clientWidth / 2, y: ref.clientHeight / 2 })
        setGameSize({ width: ref.clientWidth, height: ref.clientHeight })
    }, [])

    useEffect(() => {
        const local = readFromLocalStorage("init")
        if (local) saveToLocalStorage("init", false)
    }, [])

    useEffect(() => {
        Assets.load("/assets/tile_0209.png").then((tex) => {
            setTexture(tex as Texture)
        })
    }, [])

    return (
        <div ref={parentRef} className="game-container">
            <Application resizeTo={parentRef}>
                {texture && (
                    <CustomTilingSprite
                        // ref={parentRef}
                        texture={texture}
                        width={parentRef?.current?.clientWidth ?? 800}
                        height={parentRef?.current?.clientHeight ?? 600}
                    />
                )}
                {(parentRef && position)
                    ? (<Bunny position={position} />)
                    : (<InitialScene />)}
            </Application>
        </div>
    )
}

export default Game
