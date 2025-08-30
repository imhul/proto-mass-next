import type { gameTypes } from "@lib/types"
// config
// import { keyBindings } from "@lib/config"

export const eventConductor = (pressedKeys: { [key: string]: boolean }): gameTypes.MovementDirection | null => {
    const up = pressedKeys["ArrowUp"] || pressedKeys["KeyW"];
    const down = pressedKeys["ArrowDown"] || pressedKeys["KeyS"];
    const left = pressedKeys["ArrowLeft"] || pressedKeys["KeyA"];
    const right = pressedKeys["ArrowRight"] || pressedKeys["KeyD"];

    if (up && left) return "runnw";
    if (up && right) return "runne";
    if (down && left) return "runsw";
    if (down && right) return "runse";
    if (up) return "runn";
    if (down) return "runs";
    if (left) return "runw";
    if (right) return "rune";

    return null;
}

// export const eventConductor = (keys: { [key: string]: boolean }) => {
//     const pressedKeysLength = Object.keys(keys).filter(key => keys[key]).length

//     if (pressedKeysLength === 1) {
//         if (keyBindings.moveup.codes.some(key => keys[key])) return "runn"
//         if (keyBindings.movedown.codes.some(key => keys[key])) return "runs"
//         if (keyBindings.moveleft.codes.some(key => keys[key])) return "runw"
//         if (keyBindings.moveright.codes.some(key => keys[key])) return "rune"
//     }

//     if (pressedKeysLength === 2) {
//         if (keyBindings.moveup.codes.some(key => keys[key]) && keyBindings.moveleft.codes.some(key => keys[key])) return "runnw"
//         if (keyBindings.moveup.codes.some(key => keys[key]) && keyBindings.moveright.codes.some(key => keys[key])) return "runne"
//         if (keyBindings.movedown.codes.some(key => keys[key]) && keyBindings.moveleft.codes.some(key => keys[key])) return "runsw"
//         if (keyBindings.movedown.codes.some(key => keys[key]) && keyBindings.moveright.codes.some(key => keys[key])) return "runse"
//     }

//     return null
// }
