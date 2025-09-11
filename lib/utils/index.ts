import { clsx, type ClassValue } from "clsx"
import { delay } from '@lib/utils/delay'
import { twMerge } from "tailwind-merge"
import { getTextures } from '@lib/utils/get-textures'
import { generateMap } from '@lib/utils/map-generator'
import { playSFX } from '@utils/play-sfx'
import { getRandomInt } from "@utils/get-random-int"
import { getTimeDifference } from '@utils/get-time-difference'
import { generateSeed } from '@utils/seed-generator'
import { generateMapChunk } from '@lib/utils/chunk-generator'
import { generateNames } from '@lib/utils/names-generator'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export {
    cn,
    delay,
    playSFX,
    generateMap,
    getTextures,
    getRandomInt,
    generateSeed,
    generateNames,
    generateMapChunk,
    getTimeDifference,
}
