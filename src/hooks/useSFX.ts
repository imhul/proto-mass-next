// store
import { usePersistedStore } from "@/store"
// utils
import { Howl } from "howler"
// sounds
import fire from "/assets/sounds/fire.ogg"
import Idle1 from "/assets/sounds/enemy-idle-01.ogg"
import Idle2 from "/assets/sounds/enemy-idle-02.ogg"
import Idle3 from "/assets/sounds/enemy-idle-03.ogg"
import attack1 from "/assets/sounds/enemy-attack-01.ogg"
import attack2 from "/assets/sounds/enemy-attack-02.ogg"
import attack3 from "/assets/sounds/enemy-attack-03.ogg"
import baseSpawn1 from "/assets/sounds/enemy-base-spawn-01.ogg"
import baseSpawn2 from "/assets/sounds/enemy-base-spawn-02.ogg"
import baseSpawn3 from "/assets/sounds/enemy-base-spawn-03.ogg"
import short from "/assets/sounds/enemy-short-sound.ogg"

type Store = all.store.PersistedStore

const soundMap: Record<string, string[]> = {
    idle: [Idle1, Idle2, Idle3],
    attack: [attack1, attack2, attack3],
    ambient: [""],
    fire: [fire],
    baseSpawn: [baseSpawn1, baseSpawn2, baseSpawn3],
}

/* docs: https://github.com/goldfire/howler.js#documentation */

export const useSFX = (name: string, loop: boolean = false) => {
    // store
    const soundLevel = usePersistedStore((s: Store) => s.preferences.soundLevel)
    const setAudioAction = usePersistedStore((s: Store) => s.setAudioAction)
    // const colonies = usePersistedStore((s: Store) => s.enemies)
    // const paused = usePersistedStore((s: Store) => s.paused)
    const zoom = usePersistedStore((s: Store) => s.zoom) // from 0.5 to 2
    // state
    // const enemiesCount = Object.values(colonies).reduce((acc, colony) => acc + colony.list.length, 0)
    const randomIndex = Math.floor(Math.random() * soundMap[name].length)

    const audio = new Howl({
        loop,
        html5: false,
        volume: (soundLevel ?? 50) / 100 * zoom,
        src: [soundMap[name][randomIndex]],
        format: ['ogg'],
        onend: () => {
            setAudioAction("stopIdleSFX")
            console.info('Finished!')
        },
        onplayerror: () => {
            console.error('Error playing SFX: ', name)
        },
    })

    // console.info('audio: ', audio)

    return audio
}
