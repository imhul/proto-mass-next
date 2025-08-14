import { useState, useEffect, useRef } from 'react'
import { Application, extend } from '@pixi/react'
// components
import Bunny from './bunny'
import {
    Container,
    Graphics,
    Sprite,
} from 'pixi.js'
// types
import type { MovementDirection, Breakpoint, Position } from '@/lib/types'
// utils
import { eventConductor } from '@/lib/events'

// extend tells @pixi/react what Pixi.js components are available
extend({
    Container,
    Graphics,
    Sprite,
})

const Game = () => {
    const parentRef = useRef<HTMLDivElement>(null)
    const moveIntervalRef = useRef<NodeJS.Timeout | null>(null)
    const [position, setPosition] = useState<Position>({ x: 100, y: 100 })

    const checkContainerCollision = (position: Position) => {
        const width = parentRef.current?.clientWidth ?? 0
        const height = parentRef.current?.clientHeight ?? 0

        return (
            position.x >= 0 &&
            position.y >= 0 &&
            position.x <= width &&
            position.y <= height
        )
    }

    const applyMove = (dx: number, dy: number) => {
        setPosition((pos) => {
            const newPos = { x: pos.x + dx, y: pos.y + dy }
            if (!checkContainerCollision(newPos)) return pos
            return newPos
        })
    }

    const startRun = (dx: number, dy: number) => {
        // очищаємо попередній інтервал
        if (moveIntervalRef.current) clearInterval(moveIntervalRef.current);

        moveIntervalRef.current = setInterval(() => {
            applyMove(dx, dy);
        }, 100);
    }

    const stopRun = () => {
        if (moveIntervalRef.current) {
            clearInterval(moveIntervalRef.current);
            moveIntervalRef.current = null;
        }
    }

    const move = (direction: MovementDirection, isKeyDown: boolean = true) => {
        switch (direction) {
            case "stepup":
                applyMove(0, -5);
                break;
            case "stepdown":
                applyMove(0, 5);
                break;
            case "stepleft":
                applyMove(-5, 0);
                break;
            case "stepright":
                applyMove(5, 0);
                break;
            case "runup":
                if (isKeyDown) startRun(0, -5);
                else stopRun();
                break;
            case "rundown":
                if (isKeyDown) startRun(0, 5);
                else stopRun();
                break;
            case "runleft":
                if (isKeyDown) startRun(-5, 0);
                else stopRun();
                break;
            case "runright":
                if (isKeyDown) startRun(5, 0);
                else stopRun();
                break;
        }
    }

    const keyPressTimers = useRef<{ [key: string]: NodeJS.Timeout | null }>({});

    const onKeyDown = (event: KeyboardEvent) => {
        const direction = eventConductor(event);
        if (!direction) return;

        // If already running, do nothing
        if (keyPressTimers.current[event.code]) return;

        // Start a timer to detect long press
        keyPressTimers.current[event.code] = setTimeout(() => {
            // Trigger run movement after 1 second
            move(`run${direction.replace('step', '')}` as MovementDirection, true);
        }, 1000);

        // Trigger step movement immediately
        move(direction, true);
    };

    const onKeyUp = (event: KeyboardEvent) => {
        const direction = eventConductor(event);
        if (!direction) return;

        // Clear the timer if it exists
        if (keyPressTimers.current[event.code]) {
            clearTimeout(keyPressTimers.current[event.code]!);
            keyPressTimers.current[event.code] = null;
        }

        // Stop run movement if it was started
        if (direction.startsWith('step')) {
            move(`run${direction.replace('step', '')}` as MovementDirection, false);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("keyup", onKeyUp);
        };
    }, []);

    return (
        <div ref={parentRef} className="game-container">
            <Application resizeTo={parentRef}>
                <pixiContainer >
                    <Bunny position={position} />
                </pixiContainer>
            </Application>
        </div>
    )
}

export default Game
