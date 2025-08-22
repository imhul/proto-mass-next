// types
import { MovementDirection } from './types'

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

type EventConductorReturn = MovementDirection | null;

export const eventConductor = (e: KeyboardEvent): EventConductorReturn => {
    const eventType = e.type

    if (eventType === 'keydown') {
        if (keyBindings.moveup.keys.includes(e.key) || keyBindings.moveup.codes.includes(e.code) || keyBindings.moveup.keyCodes.includes(e.keyCode)) return "runup"
        if (keyBindings.movedown.keys.includes(e.key) || keyBindings.movedown.codes.includes(e.code) || keyBindings.movedown.keyCodes.includes(e.keyCode)) return "rundown"
        if (keyBindings.moveleft.keys.includes(e.key) || keyBindings.moveleft.codes.includes(e.code) || keyBindings.moveleft.keyCodes.includes(e.keyCode)) return "runleft"
        if (keyBindings.moveright.keys.includes(e.key) || keyBindings.moveright.codes.includes(e.code) || keyBindings.moveright.keyCodes.includes(e.keyCode)) return "runright"
    }

    return null
}
