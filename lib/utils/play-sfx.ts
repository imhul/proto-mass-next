import UIfx from 'uifx'

export const playSFX = (src: string, volume: number) => {
    const audio = new UIfx(src)
    audio.play(volume / 100)
}
