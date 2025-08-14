import { useState, useEffect, useRef } from 'react';
import { Application, extend } from '@pixi/react';
// components
import Bunny from './bunny';
import {
    Container,
    Graphics,
    Sprite,
} from 'pixi.js';
// types
import type { MovementDirection, Breakpoint, Position } from '@/lib/types';
// utils
import { eventConductor } from '@/lib/events';
// config
import { breakpoints } from '@/lib/configuration';

// extend tells @pixi/react what Pixi.js components are available
extend({
    Container,
    Graphics,
    Sprite,
});

const getGameSize = (callback: (size: Breakpoint) => void) => {
    const windowWidth = window.innerWidth || window.screen.width;

    if (windowWidth <= breakpoints.sm.value) {
        callback(breakpoints.sm);
    } else if (windowWidth <= breakpoints.md.value) {
        callback(breakpoints.md);
    } else if (windowWidth <= breakpoints.lg.value) {
        callback(breakpoints.lg);
    } else if (windowWidth <= breakpoints.xl.value) {
        callback(breakpoints.xl);
    }
}

const getBreakpointByWidth = (width: number): Breakpoint => {
    if (width <= breakpoints.sm.value) {
        return breakpoints.sm
    } else if (width <= breakpoints.md.value) {
        return breakpoints.md
    } else if (width <= breakpoints.lg.value) {
        return breakpoints.lg
    } else if (width <= breakpoints.xl.value) {
        return breakpoints.xl
    } else {
        return breakpoints.lg
    }
}

const Game = () => {
    const parentRef = useRef(null)
    const [position, setPosition] = useState<Position>({ x: 100, y: 100 });
    const [gameSize, setGameSize] = useState<Breakpoint>(breakpoints.lg);

    const checkContainerCollision = (position: Position) => {
        const container = parentRef.current;
        if (!container) return false;
        const htmlContainer = container as HTMLElement;
        const { left, top, right, bottom } = htmlContainer.getBoundingClientRect();
        const { x, y } = position;

        return x >= left && x <= right && y >= top && y <= bottom;
    }

    const move = (direction: MovementDirection) => {
        switch (direction) {
            case "stepup":
                setPosition((pos) => {
                    const newPos = { x: pos.x, y: pos.y - 5 }
                    if (!checkContainerCollision(newPos)) return pos;
                    return newPos
                });
                break;
            case "stepdown":
                setPosition((pos) => {
                    const newPos = { x: pos.x, y: pos.y + 5 }
                    if (!checkContainerCollision(newPos)) return pos;
                    return newPos
                });
                break;
            case "stepleft":
                setPosition((pos) => {
                    const newPos = { x: pos.x - 5, y: pos.y }
                    if (!checkContainerCollision(newPos)) return pos;
                    return newPos
                });
                break;
            case "stepright":
                setPosition((pos) => {
                    const newPos = { x: pos.x + 5, y: pos.y }
                    if (!checkContainerCollision(newPos)) return pos;
                    return newPos
                });
                break;
            case "runup":
                const runUpInterval = setInterval(() => {
                    setPosition((pos) => {
                        const newPos = { x: pos.x, y: pos.y - 5 };
                        if (!checkContainerCollision(newPos)) return pos;
                        return newPos;
                    });
                }, 100);

                return () => clearInterval(runUpInterval);

        }
    }

    const onKeyEvent = (event: KeyboardEvent) => {
        const direction = eventConductor(event);
        if (direction) move(direction);
    }

    useEffect(() => {
        window.addEventListener("keyup", onKeyEvent);
        window.addEventListener("keydown", onKeyEvent);
        window.addEventListener("resize", () => getGameSize(setGameSize));

        return () => {
            window.removeEventListener("keyup", onKeyEvent);
            window.removeEventListener("keydown", onKeyEvent);
            window.removeEventListener("resize", () => getGameSize(setGameSize));
        };
    }, []);

    useEffect(() => getGameSize(setGameSize), []);

    useEffect(() => {
        const windowWidth = window.innerWidth || window.screen.width;
        const windowHeight = window.innerHeight || window.screen.height;
        const breakpoint = getBreakpointByWidth(windowWidth)

        if (windowHeight < breakpoint.height) {
            if (breakpoint.id === "md") {
                setGameSize(breakpoints.sm);
            } else if (breakpoint.id === "lg") {
                setGameSize(breakpoints.md);
            } else if (breakpoint.id === "xl") {
                setGameSize(breakpoints.lg);
            }
        }
    }, [gameSize])

    console.info("gameSize: ", gameSize)

    return (
        <div ref={parentRef} className="game-container">
            <Application resizeTo={parentRef} height={gameSize.height}>
                <pixiContainer >
                    <Bunny position={position} />
                </pixiContainer>
            </Application>
        </div>
    );
}

export default Game;
