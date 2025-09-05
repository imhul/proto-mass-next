import type Rand from 'rand-seed'
// TODO: implement: https://www.npmjs.com/package/rand-seed

export const getRandomInt = (min: number, max: number, rand?: Rand | null, floor: boolean = true) => {
    min = Math.ceil(min)
    max = Math.floor(max)

    if (rand) {
        const r = rand.next()
        return floor ? (Math.floor(r * (max - min + 1)) + min) : (r * (max - min + 1) + min)
    }

    return floor ? (Math.floor(Math.random() * (max - min + 1)) + min) : (Math.random() * (max - min + 1) + min)
}
