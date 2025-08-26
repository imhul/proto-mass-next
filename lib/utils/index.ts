import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { getTextures } from '@lib/utils/get-textures'
import { generateMap } from '@lib/utils/map-generator'
import {
    saveToLocalStorage,
    readFromLocalStorage,
    removeFromLocalStorage,
} from "@lib/utils/ls"

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export {
    cn,
    generateMap,
    getTextures,
    saveToLocalStorage,
    readFromLocalStorage,
    removeFromLocalStorage,
}
