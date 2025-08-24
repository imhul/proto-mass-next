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

export const eventConductor = (keys: { [key: string]: boolean }) => {
    const pressedKeysLength = Object.keys(keys).filter(key => keys[key]).length

    if (pressedKeysLength === 1) {
        if (keyBindings.moveup.codes.some(key => keys[key])) return "runn"
        if (keyBindings.movedown.codes.some(key => keys[key])) return "runs"
        if (keyBindings.moveleft.codes.some(key => keys[key])) return "runw"
        if (keyBindings.moveright.codes.some(key => keys[key])) return "rune"
    }

    if (pressedKeysLength === 2) {
        if (keyBindings.moveup.codes.some(key => keys[key]) && keyBindings.moveleft.codes.some(key => keys[key])) return "runnw"
        if (keyBindings.moveup.codes.some(key => keys[key]) && keyBindings.moveright.codes.some(key => keys[key])) return "runne"
        if (keyBindings.movedown.codes.some(key => keys[key]) && keyBindings.moveleft.codes.some(key => keys[key])) return "runsw"
        if (keyBindings.movedown.codes.some(key => keys[key]) && keyBindings.moveright.codes.some(key => keys[key])) return "runse"
    }

    return null
}
