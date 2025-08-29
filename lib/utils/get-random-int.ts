import type Rand from 'rand-seed'
// TODO: implement: https://www.npmjs.com/package/rand-seed

export const getRandomInt = (min: number, max: number, rand?: Rand) => {
    min = Math.ceil(min)
    max = Math.floor(max)

    if (rand) {
        const r = rand.next()
        return Math.floor(r * (max - min + 1)) + min
    }

    return Math.floor(Math.random() * (max - min + 1)) + min
}