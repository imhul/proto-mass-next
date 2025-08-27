import { Texture } from 'pixi.js'
// types
import { gameTypes } from '@lib/types'
// config
import { heroTexturesConfig } from '@lib/config'

export const getTextures = (atlasJson: gameTypes.AtlasJSON | null): gameTypes.HeroTextures => {
    if (!atlasJson) return null
    const obj: gameTypes.HeroTexturesObject = {} as gameTypes.HeroTexturesObject
    const textureKeys = Object.keys(heroTexturesConfig) as gameTypes.HeroState[]
    textureKeys.forEach((item: gameTypes.HeroState) => {
        const texturesLength = heroTexturesConfig[item].count || 1
        obj[item] = Array.from({ length: texturesLength }, (_, i) => {
            const uid = heroTexturesConfig[item].uid + i + 6
            return new Texture(atlasJson.textures[uid])
        })
    })
    return obj
}
