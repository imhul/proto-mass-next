export const angryState = "angry" as all.game.EnemyState
export const bigClusterPercent = 5
export const bigClusterSize = { min: 10, max: 20 }
export const bulletDamage = 10
export const bulletSpeed = 4
export const defaultChunkSize = 1000
export const distanceToMapBorder = 200
export const enemyScale = 0.5
export const fakeStartPosition: all.game.Position = { x: 200, y: 200 }
export const heroJumpHeight = 100
export const heroJumpLength = 100
export const heroJumpDuration = 500
export const heroScale = 2
export const heroSize = 80
export const idleState = "idle" as all.game.EnemyState
export const maggotsCount = 20
export const maxBirthEnemyDistance = 50
export const maxBulletDistance = 200
export const maxChanceOfEnemyClucking = 0.2
export const maxColoniesPerChunk = 5
export const maxDistanceFromEnemyBase = 200
export const maxEnemiesPerColony = 10
export const maxEnemyProgress = maxEnemiesPerColony * maxColoniesPerChunk
export const maxEnemySoundsAtOnce = 3
export const minChanceOfEnemyClucking = 0.05
export const minute: number = 60 * 1000
export const objectsPerChunk = { min: 150, max: 220 }
export const runState = "run" as all.game.EnemyState
export const seedLength = 16
export const smallClusterPercent = 10
export const smallClusterSize = { min: 1, max: 6 }
export const tileSize = 50
export const waterTextureIndex = 3

export const colors: Record<string, number> = {
    gray: 0x555555,
    green: 0x00ff00,
    yellow: 0xff2200,
    red: 0xffdd00,
}

export const menu: all.ui.MenuItem[] = [
    {
        label: "Home",
        id: "home",
    }, {
        label: "Game",
        id: "game",
    },
]

export const devMenu: all.ui.MenuItem[] = [
    {
        label: "Dots",
        id: "dots",
        checked: false,
    }, {
        label: "Charts",
        id: "charts",
        checked: false,
    }, {
        label: "God Mode",
        id: "god-mode",
        checked: false,
    }, {
        label: "FPS Monitor",
        id: "fps",
        checked: false,
    }, {
        label: "Hero Hitbox",
        id: "hero-hitbox",
        checked: false,
    }, {
        label: "Enemy Hitboxes",
        id: "enemy-hitboxes",
        checked: false,
    }, {
        label: "Object Hitboxes",
        id: "object-hitboxes",
        checked: false,
    }, {
        label: "Enemy Progress",
        id: "enemy-progress",
        checked: false,
    }, {
        label: "Hero Action Menu",
        id: "hero-action-menu",
        checked: false,
    }
]

export const gameMenu: all.ui.MenuItem[] = [
    {
        label: "Pause",
        id: "pause"
    }, {
        label: "Restart",
        id: "restart"
    }, {
        label: "Exit Game",
        id: "exit"
    }
]

export const heroActionsMenu: all.ui.MenuItem[] = [
    {
        label: "Crab Idle",
        id: "crab-idle"
    },
    {
        label: "Crab Walk",
        id: "crab-walk"
    },
    {
        label: "Enemy Death",
        id: "enemy-death"
    },
    {
        label: "Impact",
        id: "impact"
    },
    {
        label: "Jumper Idle",
        id: "jumper-idle"
    },
    {
        label: "Jumper Jump",
        id: "jumper-jump"
    },
    {
        label: "Octopus",
        id: "octopus"
    },
    {
        label: "Player Cling",
        id: "player-cling"
    },
    {
        label: "Player Duck",
        id: "player-duck"
    },
    {
        label: "Player Idle",
        id: "player-idle"
    },
    {
        label: "Player Jump",
        id: "player-jump"
    },
    {
        label: "Player Run",
        id: "player-run"
    },
    {
        label: "Player Run Shot",
        id: "player-run-shot"
    },
    {
        label: "Player Shoot Up",
        id: "player-shoot-up"
    },
    {
        label: "Player Stand",
        id: "player-stand"
    },
    {
        label: "Player Hurt",
        id: "player-hurt"
    },
    {
        label: "Power Up",
        id: "power-up"
    },
    {
        label: "Shot",
        id: "shot"
    }
]

export const themeMenu: all.ui.Theme[] = [
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

export const breakpoints: Record<string, all.ui.Breakpoint> = {
    sm: { id: "sm", value: 430, width: 320, height: 320 },
    md: { id: "md", value: 768, width: 640, height: 480 },
    lg: { id: "lg", value: 1024, width: 800, height: 600 },
    xl: { id: "xl", value: 1280, width: 1024, height: 768 },
}

export const numberOfObjectsPerChunk = Math.floor(Math.random()
    * (objectsPerChunk.max - objectsPerChunk.min + 1))
    + objectsPerChunk.min

export const heroTexturesConfig: Record<all.game.HeroState, { count: number, uid: number }> = {
    "crab-idle": { count: 4, uid: 0 },
    "crab-walk": { count: 4, uid: 3 },
    "enemy-death": { count: 5, uid: 8 },
    "impact": { count: 5, uid: 13 },
    "jumper-idle": { count: 4, uid: 18 },
    "jumper-jump": { count: 1, uid: 22 },
    "octopus": { count: 4, uid: 23 },
    "player-cling": { count: 1, uid: 27 },
    "player-duck": { count: 1, uid: 28 },
    "player-idle": { count: 4, uid: 31 },
    "player-jump": { count: 6, uid: 35 },
    "player-run": { count: 10, uid: 41 },
    "player-run-shot": { count: 10, uid: 51 },
    "player-shoot-up": { count: 1, uid: 61 },
    "player-stand": { count: 3, uid: 62 },
    "player-hurt": { count: 2, uid: 29 },
    "power-up": { count: 7, uid: 65 },
    "shot": { count: 2, uid: 72 },
    "die": { count: 5, uid: 8 },
    "damage": { count: 2, uid: 29 },
    "lvlup": { count: 6, uid: 35 },
    "special": { count: 0, uid: 0 },
    "transform": { count: 0, uid: 0 },
}

export const enemyTexturesConfig: Record<all.game.EnemyState, { count: number, uid: number }> = {
    "angry": { count: 7, uid: 13 },
    "idle": { count: 4, uid: 9 },
    "run": { count: 7, uid: 13 },
    "lvlup": { count: 7, uid: 13 },
}

export const enemyEggTexturesConfig: Record<all.game.EnemyEggState, { count: number, uid: number }> = {
    "jump": { count: 20, uid: 308 },
    "birth": { count: 6, uid: 296 },
    "death": { count: 6, uid: 302 },
}

export const zindex = {
    "ground": 1,
    "object": 2,
    "enemy": 3,
    "bullet": 4,
    "hero": 5,
}

export const gameGameDifficulties: all.game.GameDifficulty[] = [
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

export const initialColonyModel = {
    id: 1,
    uid: "456039fa-815d-4239-8491-6cb91b0b6ab7",
}

export const initialBaseModel = {
    hp: 100,
    totalHp: 100,
    dirty: false,
}

export const initialEnemyModel = {
    id: 1,
    uid: "356039fa-815d-4239-8491-6cb91b0b6ab7",
    state: "idle",
    timestamp: performance.now(),
    speed: 2.1,
    attackSpeed: 0,
    attackPower: 0.5,
    hp: 111,
    totalHp: 111,
    damage: 0,
    age: 0,
    zIndex: 99,
    name: "Enemy-" + 1,
    dead: false,
} as all.game.EnemyEntity

export const birthAnimationSteps = {
    0: { duration: 0, opacity: 0, filter: false }, // start
    1: { duration: 50, opacity: 0.1, filter: true },
    2: { duration: 50, opacity: 0, filter: false },
    3: { duration: 100, opacity: 0.25, filter: true },
    4: { duration: 100, opacity: 0.1, filter: false },
    5: { duration: 200, opacity: 0.5, filter: true },
    6: { duration: 200, opacity: 0.25, filter: false },
    7: { duration: 300, opacity: 0.75, filter: true },
    8: { duration: 300, opacity: 0.5, filter: false },
    9: { duration: 400, opacity: 1, filter: true },
    10: { duration: 400, opacity: 0.75, filter: false },
    11: { duration: 500, opacity: 1, filter: true },
    12: { duration: 500, opacity: 1, filter: false },
    13: { duration: 0, opacity: 1, filter: false } // end
}

export const keycodes: all.store.KeyBindingCollectionItem[] = [
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

export const worldFirstNames = [
    "Ancient", "Hidden", "Misty", "Silent", "Red", "Dark", "Dusty", "Golden", "Crystal", "Emerald", "Frozen", "Grand",
    "Iron", "Jade", "Lost", "Sacred", "Shining", "Silver", "Silent", "Solar", "Starry", "Stormy", "Sunny", "Twilight",
    "White", "Windy", "Winter", "Azure", "Blazing", "Bright", "Celestial", "Cobalt", "Coral", "Dawn", "Eternal",
    "Frosty", "Glowing", "Glorious", "Luminous", "Majestic", "Mystic", "Radiant", "Serene", "Vivid", "Wild",
    "Zephyr", "Autumn", "Blooming", "Crescent", "Dewy", "Eclipse", "Gleaming", "Harmonic", "Lush", "Opal", "Prismatic",
    "Sapphire", "Tranquil", "Vibrant", "Whispering"
]

export const worldSecondNames = [
    "Forest", "Valley", "Hill", "River", "Lake", "Mountain", "Canyon", "Desert", "Meadow", "Glade", "Grove",
    "Harbor", "Island", "Lagoon", "Marsh", "Oasis", "Prairie", "Reef", "Swamp", "Tundra", "Bay", "Cliff",
    "Cove", "Dune", "Estuary", "Glacier", "Gulf", "Hollow", "Knoll", "Plain", "Quagmire", "Ravine", "Summit",
    "Thicket", "Wasteland", "Wetland", "Woodland", "Bluff", "Butte", "Crag", "Delta", "Fjord", "Foothills",
    "Headland", "Inlet", "Mesa", "Peninsula", "Ridge", "Strait", "Vale", "Wood", "Barrens", "Basin", "Bog",
    "Cleft", "Copse", "Crater", "Dell", "Fens", "Glen", "Heath", "Isle", "Moor", "Pond", "Rill", "Springs", "Swale", "Thorn", "Tor"
]

export const heroFirstNames = [
    "Arin", "Borin", "Cedric", "Darin", "Eldric", "Farin", "Garrick", "Hadrian", "Ivor", "Jareth", "Kael",
    "Loric", "Merek", "Nolan", "Orin", "Perrin", "Quinlan", "Roderic", "Soren", "Theron",
    "Ulric", "Varek", "Wystan", "Xander", "Yorick", "Zarek", "Alaric", "Baldric", "Caius", "Dorian", "Evander",
    "Fenris", "Gideon", "Hawke", "Ignatius", "Jaxon", "Kieran", "Lucian", "Magnus", "Nero", "Oberon",
    "Phineas", "Quintus", "Ragnar", "Silas", "Talon", "Ulysses", "Valen", "Wulfric", "Xavian", "Zephyr"
]

export const heroSecondNames = [
    "Stormrider", "Ironfist", "Shadowbane", "Dawnbringer", "Nightwalker", "Fireforge", "Windrider",
    "Stonehelm", "Darkwater", "Lightbringer", "Frostbane", "Thunderstrike", "Earthshaker", "Flameheart",
    "Silverblade", "Goldenshield", "Blackthorn", "Brightspear", "Grimward", "Stormcaller",
    "Ironheart", "Shadowhunter", "Dawnguard", "Nightshade", "Firestorm", "Windwalker", "Stonefist",
    "Darkblade", "Lightshield", "Frostguard", "Thunderfist", "Earthwarden", "Flameblade",
    "Silverheart", "Goldenaxe", "Blackblade", "Brightshield", "Grimblade", "Stormshadow"
]
