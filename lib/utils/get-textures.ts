import { Texture } from 'pixi.js'
// types
import {
    AtlasJSON,
    HeroState,
    HeroTextures,
    HeroTexturesObject,
} from '@lib/types'
// config
import { heroTexturesConfig } from '@lib/config'

export const getTextures = (atlasJson: AtlasJSON | null): HeroTextures => {
    if (!atlasJson) return null
    const obj: HeroTexturesObject = {} as HeroTexturesObject
    const textureKeys = Object.keys(heroTexturesConfig) as HeroState[]
    textureKeys.forEach((item: HeroState) => {
        const texturesLength = heroTexturesConfig[item].count || 1
        obj[item] = Array.from({ length: texturesLength }, (_, i) => {
            const uid = heroTexturesConfig[item].uid + i + 6
            return new Texture(atlasJson.textures[uid])
        })
    })
    return obj
}
