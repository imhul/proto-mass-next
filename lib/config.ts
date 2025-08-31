// types
import type {
    uiTypes,
    gameTypes,
    storeTypes
} from '@lib/types'

export const angryState = "angry" as gameTypes.EnemyState
export const bigClusterSize = { min: 10, max: 20 }
export const defaultChunkSize = 1000
export const fakeStartPosition: gameTypes.Position = { x: 200, y: 200 }
export const idleState = "idle" as gameTypes.PrideState
export const maggotsCount = 50
export const maxDistanceFromBase = 200
export const maxEnemiesPerPride = 10
export const minute: number = 60 * 1000
export const objectsPerChunk = { min: 150, max: 220 }
export const seedLength = 16
export const smallClusterSize = { min: 1, max: 6 }
export const tileSize = 50

export const menu: uiTypes.MenuItem[] = [
    {
        label: "Home",
        id: "home",
    }, {
        label: "Game",
        id: "game",
    },
]

export const gameMenu: uiTypes.GameMenuItem[] = [
    {
        label: "Pause",
        id: "pause"
    }, {
        label: "Restart",
        id: "restart"
    }, {
        label: "Save",
        id: "save"
    }, {
        label: "Load",
        id: "load"
    }, {
        label: "Exit Game",
        id: "exit"
    }
]

export const themeMenu: uiTypes.Theme[] = [
    {
        label: "Light",
        id: "light"
    }, {
        label: "Dark",
        id: "dark"
    }, {
        label: "System",
        id: "system"
    }
]

export const breakpoints: Record<string, gameTypes.Breakpoint> = {
    sm: { id: "sm", value: 430, width: 320, height: 320 },
    md: { id: "md", value: 768, width: 640, height: 480 },
    lg: { id: "lg", value: 1024, width: 800, height: 600 },
    xl: { id: "xl", value: 1280, width: 1024, height: 768 },
}

export const numberOfObjectsPerChunk = Math.floor(Math.random()
    * (objectsPerChunk.max - objectsPerChunk.min + 1))
    + objectsPerChunk.min

export const heroTexturesConfig: Record<gameTypes.HeroState, { count: number, uid: number }> = {
    "idle": { count: 4, uid: 31 },
    "run": { count: 10, uid: 41 },
    "run-shot": { count: 10, uid: 51 },
    "shoot-up": { count: 1, uid: 61 },
    "stand": { count: 3, uid: 62 },
    "hurt": { count: 2, uid: 29 },
    "die": { count: 0, uid: 0 },
    "damage": { count: 0, uid: 0 },
    "lvlup": { count: 0, uid: 0 },
    "special": { count: 0, uid: 0 },
    "transform": { count: 0, uid: 0 },
}

export const enemyTexturesConfig: Record<gameTypes.EnemyState, { count: number, uid: number }> = {
    "angry": { count: 8, uid: 13 },
    "attack": { count: 8, uid: 13 },
    "idle": { count: 4, uid: 9 },
    "run": { count: 8, uid: 13 },
    "die": { count: 4, uid: 9 },
    "damage": { count: 8, uid: 13 },
    "lvlup": { count: 8, uid: 13 },
    "special": { count: 8, uid: 13 },
    "transform": { count: 8, uid: 13 },
}

export const zindex = {
    "ground": 1,
    "object": 2,
    "enemy": 3,
    "hero": 4,
}

export const gameGameDifficulties: gameTypes.GameDifficulty[] = [
    {
        label: "Easy",
        id: "easy"
    },
    {
        label: "Normal",
        id: "normal"
    },
    {
        label: "Hard",
        id: "hard"
    }
]

export const spawnMatrix: Record<number, number> = {
    2: minute / 2,
    3: minute,
    4: minute * 2.5,
    5: minute * 4.5,
    6: minute * 7,
    7: minute * 10,
    8: minute * 13.5,
    9: minute * 17.5,
    10: minute * 22
}

export const initialEnemyModel = {
    id: 1,
    uid: "356039fa-815d-4239-8491-6cb91b0b6ab7",
    state: "idle",
    timestamp: performance.now(),
    speed: 2.1,
    attackSpeed: 15,
    attackPower: 6,
    hp: 100,
    age: 0,
    zIndex: 99,
    name: "Enemy-" + 1,
    dead: false,
} as gameTypes.EnemyEntity

export const keycodes: storeTypes.KeyBindingCollectionItem[] = [
    {
        name: "backspace",
        keyCode: 8,
        key: "Backspace",
        code: "Backspace",
    },
    {
        name: "tab",
        keyCode: 9,
        key: "Tab",
        code: "Tab",
    },
    {
        name: "enter",
        keyCode: 13,
        key: "Enter",
        code: "Enter",
    },
    {
        name: "shift(left)",
        keyCode: 16,
        key: "Shift",
        code: "ShiftLeft",
        notes: "`event.shiftKey` is true"
    },
    {
        name: "shift(right)",
        keyCode: 16,
        key: "Shift",
        code: "ShiftRight",
        notes: "`event.shiftKey` is true"
    },
    {
        name: "ctrl(left)",
        keyCode: 17,
        key: "Control",
        code: "ControlLeft",
        notes: "`event.ctrlKey` is true"
    },
    {
        name: "ctrl(right)",
        keyCode: 17,
        key: "Control",
        code: "ControlRight",
        notes: "`event.ctrlKey` is true"
    },
    {
        name: "alt(left)",
        keyCode: 18,
        key: "Alt",
        code: "AltLeft",
        notes: "`event.altKey` is true"
    },
    {
        name: "alt(right)",
        keyCode: 18,
        key: "Alt",
        code: "AltRight",
        notes: "`event.altKey` is true"
    },
    {
        name: "pause/break",
        keyCode: 19,
        key: "Pause",
        code: "Pause",

    },
    {
        name: "caps lock",
        keyCode: 20,
        key: "CapsLock",
        code: "CapsLock",

    },
    {
        name: "escape",
        keyCode: 27,
        key: "Escape",
        code: "Escape",

    },
    {
        name: "space",
        keyCode: 32,
        key: "",
        code: "Space",
        notes: "The `event.key` value is a single space."
    },
    {
        name: "page up",
        keyCode: 33,
        key: "PageUp",
        code: "PageUp",

    },
    {
        name: "page down",
        keyCode: 34,
        key: "PageDown",
        code: "PageDown",

    },
    {
        name: "end",
        keyCode: 35,
        key: "End",
        code: "End",

    },
    {
        name: "home",
        keyCode: 36,
        key: "Home",
        code: "Home",

    },
    {
        name: "left arrow",
        keyCode: 37,
        key: "ArrowLeft",
        code: "ArrowLeft",

    },
    {
        name: "up arrow",
        keyCode: 38,
        key: "ArrowUp",
        code: "ArrowUp",

    },
    {
        name: "right arrow",
        keyCode: 39,
        key: "ArrowRight",
        code: "ArrowRight",

    },
    {
        name: "down arrow",
        keyCode: 40,
        key: "ArrowDown",
        code: "ArrowDown",

    },
    {
        name: "print screen",
        keyCode: 44,
        key: "PrintScreen",
        code: "PrintScreen",

    },
    {
        name: "insert",
        keyCode: 45,
        key: "Insert",
        code: "Insert",

    },
    {
        name: "delete",
        keyCode: 46,
        key: "Delete",
        code: "Delete",

    },
    {
        name: 0,
        keyCode: 48,
        key: 0,
        code: "Digit0",

    },
    {
        name: 1,
        keyCode: 49,
        key: 1,
        code: "Digit1",

    },
    {
        name: 2,
        keyCode: 50,
        key: 2,
        code: "Digit2",

    },
    {
        name: 3,
        keyCode: 51,
        key: 3,
        code: "Digit3",

    },
    {
        name: 4,
        keyCode: 52,
        key: 4,
        code: "Digit4",

    },
    {
        name: 5,
        keyCode: 53,
        key: 5,
        code: "Digit5",

    },
    {
        name: 6,
        keyCode: 54,
        key: 6,
        code: "Digit6",

    },
    {
        name: 7,
        keyCode: 55,
        key: 7,
        code: "Digit7",

    },
    {
        name: 8,
        keyCode: 56,
        key: 8,
        code: "Digit8",

    },
    {
        name: 9,
        keyCode: 57,
        key: 9,
        code: "Digit9",

    },
    {
        name: "a",
        keyCode: 65,
        key: "a",
        code: "KeyA",

    },
    {
        name: "b",
        keyCode: 66,
        key: "b",
        code: "KeyB",

    },
    {
        name: "c",
        keyCode: 67,
        key: "c",
        code: "KeyC",

    },
    {
        name: "d",
        keyCode: 68,
        key: "d",
        code: "KeyD",

    },
    {
        name: "e",
        keyCode: 69,
        key: "e",
        code: "KeyE",

    },
    {
        name: "f",
        keyCode: 70,
        key: "f",
        code: "KeyF",

    },
    {
        name: "g",
        keyCode: 71,
        key: "g",
        code: "KeyG",

    },
    {
        name: "h",
        keyCode: 72,
        key: "h",
        code: "KeyH",

    },
    {
        name: "i",
        keyCode: 73,
        key: "i",
        code: "KeyI",

    },
    {
        name: "j",
        keyCode: 74,
        key: "j",
        code: "KeyJ",

    },
    {
        name: "k",
        keyCode: 75,
        key: "k",
        code: "KeyK",

    },
    {
        name: "l",
        keyCode: 76,
        key: "l",
        code: "KeyL",

    },
    {
        name: "m",
        keyCode: 77,
        key: "m",
        code: "KeyM",

    },
    {
        name: "n",
        keyCode: 78,
        key: "n",
        code: "KeyN",

    },
    {
        name: "o",
        keyCode: 79,
        key: "o",
        code: "KeyO",

    },
    {
        name: "p",
        keyCode: 80,
        key: "p",
        code: "KeyP",

    },
    {
        name: "q",
        keyCode: 81,
        key: "q",
        code: "KeyQ",

    },
    {
        name: "r",
        keyCode: 82,
        key: "r",
        code: "KeyR",

    },
    {
        name: "s",
        keyCode: 83,
        key: "s",
        code: "KeyS",

    },
    {
        name: "t",
        keyCode: 84,
        key: "t",
        code: "KeyT",

    },
    {
        name: "u",
        keyCode: 85,
        key: "u",
        code: "KeyU",

    },
    {
        name: "v",
        keyCode: 86,
        key: "v",
        code: "KeyV",

    },
    {
        name: "w",
        keyCode: 87,
        key: "w",
        code: "KeyW",

    },
    {
        name: "x",
        keyCode: 88,
        key: "x",
        code: "KeyX",

    },
    {
        name: "y",
        keyCode: 89,
        key: "y",
        code: "KeyY",

    },
    {
        name: "z",
        keyCode: 90,
        key: "z",
        code: "KeyZ",

    },
    {
        name: "left window key",
        keyCode: 91,
        key: "Meta",
        code: "MetaLeft",
    },
    {
        name: "right window key",
        keyCode: 92,
        key: "Meta",
        code: "MetaRight",
    },
    {
        name: "select key (Context Menu)",
        keyCode: 93,
        key: "ContextMenu",
        code: "ContextMenu",
    },
    {
        name: "numpad 0",
        keyCode: 96,
        key: 0,
        code: "Numpad0",

    },
    {
        name: "numpad 1",
        keyCode: 97,
        key: 1,
        code: "Numpad1",

    },
    {
        name: "numpad 2",
        keyCode: 98,
        key: 2,
        code: "Numpad2",

    },
    {
        name: "numpad 3",
        keyCode: 99,
        key: 3,
        code: "Numpad3",

    },
    {
        name: "numpad 4",
        keyCode: 100,
        key: 4,
        code: "Numpad4",

    },
    {
        name: "numpad 5",
        keyCode: 101,
        key: 5,
        code: "Numpad5",

    },
    {
        name: "numpad 6",
        keyCode: 102,
        key: 6,
        code: "Numpad6",

    },
    {
        name: "numpad 7",
        keyCode: 103,
        key: 7,
        code: "Numpad7",

    },
    {
        name: "numpad 8",
        keyCode: 104,
        key: 8,
        code: "Numpad8",

    },
    {
        name: "numpad 9",
        keyCode: 105,
        key: 9,
        code: "Numpad9",

    },
    {
        name: "multiply",
        keyCode: 106,
        key: "*",
        code: "NumpadMultiply",

    },
    {
        name: "add",
        keyCode: 107,
        key: "+",
        code: "NumpadAdd",

    },
    {
        name: "subtract",
        keyCode: 109,
        key: "-",
        code: "NumpadSubtract",

    },
    {
        name: "decimal point",
        keyCode: 110,
        key: ".",
        code: "NumpadDecimal",

    },
    {
        name: "divide",
        keyCode: 111,
        key: "/",
        code: "NumpadDivide",

    },
    {
        name: "f1",
        keyCode: 112,
        key: "F1",
        code: "F1",

    },
    {
        name: "f2",
        keyCode: 113,
        key: "F2",
        code: "F2",

    },
    {
        name: "f3",
        keyCode: 114,
        key: "F3",
        code: "F3",

    },
    {
        name: "f4",
        keyCode: 115,
        key: "F4",
        code: "F4",

    },
    {
        name: "f5",
        keyCode: 116,
        key: "F5",
        code: "F5",

    },
    {
        name: "f6",
        keyCode: 117,
        key: "F6",
        code: "F6",

    },
    {
        name: "f7",
        keyCode: 118,
        key: "F7",
        code: "F7",

    },
    {
        name: "f8",
        keyCode: 119,
        key: "F8",
        code: "F8",

    },
    {
        name: "f9",
        keyCode: 120,
        key: "F9",
        code: "F9",

    },
    {
        name: "f10",
        keyCode: 121,
        key: "F10",
        code: "F10",

    },
    {
        name: "f11",
        keyCode: 122,
        key: "F11",
        code: "F11",

    },
    {
        name: "f12",
        keyCode: 123,
        key: "F12",
        code: "F12",

    },
    {
        name: "num lock",
        keyCode: 144,
        key: "NumLock",
        code: "NumLock",

    },
    {
        name: "scroll lock",
        keyCode: 145,
        key: "ScrollLock",
        code: "ScrollLock",

    },
    {
        name: "audio volume mute",
        keyCode: 173,
        key: "AudioVolumeMute",
        code: "",
        notes: "⚠️ The `event.keyCode` value is 181 in Firefox. Also FF provides the code value as, `VolumeMute`"
    },
    {
        name: "audio volume down",
        keyCode: 174,
        key: "AudioVolumeDown",
        code: "",
        notes: "⚠️ The `event.keyCode` value is 182 in Firefox. Also FF provides the code value as, `VolumeDown`"
    },
    {
        name: "audio volume up",
        keyCode: 175,
        key: "AudioVolumeUp",
        code: "",
        notes: "⚠️ The `event.keyCode` value is 183 in Firefox. Also FF provides the code value as, `VolumeUp`"
    },
    {
        name: "media player",
        keyCode: 181,
        key: "LaunchMediaPlayer",
        code: "",
        notes: "⚠️ The `event.keyCode` value is 0(no value) in Firefox. Also FF provides the code value as, `MediaSelect`"
    },
    {
        name: "launch application 1",
        keyCode: 182,
        key: "LaunchApplication1",
        code: "",
        notes: "⚠️ The `event.keyCode` value is 0(no value) in Firefox. Also FF provides the code value as, `LaunchApp1`"
    },
    {
        name: "launch application 2",
        keyCode: 183,
        key: "LaunchApplication2",
        code: "",
        notes: "⚠️ The `event.keyCode` value is 0(no value) in Firefox. Also FF provides the code value as, `LaunchApp2`"
    },
    {
        name: "semi-colon",
        keyCode: 186,
        key: ";",
        code: "Semicolon",
        notes: "⚠️ The `event.keyCode` value is 59 in Firefox"
    },
    {
        name: "equal sign",
        keyCode: 187,
        key: "=",
        code: "Equal",
        notes: "⚠️ The `event.keyCode` value is 61 in Firefox"
    },
    {
        name: "comma",
        keyCode: 188,
        key: ",",
        code: "Comma",

    },
    {
        name: "dash",
        keyCode: 189,
        key: "-",
        code: "Minus",
        notes: "⚠️ The `event.keyCode` value is 173 in Firefox"
    },
    {
        name: "period",
        keyCode: 190,
        key: ".",
        code: "Period",

    },
    {
        name: "forward slash",
        keyCode: 191,
        key: "/",
        code: "Slash",

    },
    {
        name: "Backquote/Grave accent",
        keyCode: 192,
        key: "`",
        code: "Backquote",

    },
    {
        name: "open bracket",
        keyCode: 219,
        key: "[",
        code: "BracketLeft",

    },
    {
        name: "back slash",
        keyCode: 220,
        key: "\\",
        code: "Backslash",

    },
    {
        name: "close bracket",
        keyCode: 221,
        key: "]",
        code: "BracketRight",

    },
    {
        name: "single quote",
        keyCode: 222,
        key: "'",
        code: "Quote",

    }
]

export const generatedObjects: gameTypes.GameObjectEntity[] = []
