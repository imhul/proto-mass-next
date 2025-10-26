// store
import { usePersistedStore } from "@/store"
// utils
import { Howl } from "howler"
// sounds
import IdleSFX from "/assets/sound/enemy-idle.wav"
import attackSFX from "/assets/sound/enemy-attack.wav"

type Store = all.store.PersistedStore

const soundMap: Record<string, string> = {
    idle: IdleSFX,
    attack: attackSFX,
}

/* docs: https://github.com/goldfire/howler.js#documentation */

export const useSFX = (name: string) => {
    const soundLevel = usePersistedStore((s: Store) => s.preferences.soundLevel)
    const paused = usePersistedStore((s: Store) => s.paused)
    const volume = (soundLevel ?? 50) / 100
    const audio = new Howl({
        volume,
        src: [soundMap[name]],
        onend: () => {
            console.log('Finished!')
        },
    })
    console.info("audio instance: ", audio)
    return () => paused ? audio.pause() : audio.play(volume)
}
