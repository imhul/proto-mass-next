// config
import {
    heroFirstNames,
    heroSecondNames,
    worldFirstNames,
    worldSecondNames,
} from '@lib/config'
// utils
import { getRandomInt } from '@lib/utils'

export const generateNames = () => {
    const heroFirstName = heroFirstNames[getRandomInt(0, heroFirstNames.length)]
    const heroSecondName = heroSecondNames[getRandomInt(0, heroSecondNames.length)]
    const worldFirstName = worldFirstNames[getRandomInt(0, worldFirstNames.length)]
    const worldSecondName = worldSecondNames[getRandomInt(0, worldSecondNames.length)]

    return {
        heroName: `${heroFirstName} ${heroSecondName}`,
        worldName: `${worldFirstName} ${worldSecondName}`
    }
}