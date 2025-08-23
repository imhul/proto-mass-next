// types
import type { heroTypes } from '@lib/types'

export const keyBindings = {
    moveup: {
        keys: ['ArrowUp', 'w'],
        codes: ['ArrowUp', 'KeyW'],
        keyCodes: [87, 38]
    },
    movedown: {
        keys: ['ArrowDown', 's'],
        codes: ['ArrowDown', 'KeyS'],
        keyCodes: [83, 40]
    },
    moveleft: {
        keys: ['ArrowLeft', 'a'],
        codes: ['ArrowLeft', 'KeyA'],
        keyCodes: [65, 37]
    },
    moveright: {
        keys: ['ArrowRight', 'd'],
        codes: ['ArrowRight', 'KeyD'],
        keyCodes: [68, 39]
    },
}

export const eventConductor = (e: KeyboardEvent, isDiagonal: boolean) => {
    const eventType = e.type
    console.info("Keyboard event detected:", e)

    if (eventType === 'keydown') {
        if (!isDiagonal) {
            if (keyBindings.moveup.keys.includes(e.key) || keyBindings.moveup.codes.includes(e.code)) return "runn"
            if (keyBindings.movedown.keys.includes(e.key) || keyBindings.movedown.codes.includes(e.code)) return "runs"
            if (keyBindings.moveleft.keys.includes(e.key) || keyBindings.moveleft.codes.includes(e.code)) return "runw"
            if (keyBindings.moveright.keys.includes(e.key) || keyBindings.moveright.codes.includes(e.code)) return "rune"
        } else {
            // TODO: Handle diagonal movement by 2 keys
            if (keyBindings.moveup.keys.includes(e.key) && keyBindings.moveleft.keys.includes(e.key)) return "runnw"
            if (keyBindings.moveup.keys.includes(e.key) && keyBindings.moveright.keys.includes(e.key)) return "runne"
            if (keyBindings.movedown.keys.includes(e.key) && keyBindings.moveleft.keys.includes(e.key)) return "runsw"
            if (keyBindings.movedown.keys.includes(e.key) && keyBindings.moveright.keys.includes(e.key)) return "runse"
        }
    }

    return null
}
