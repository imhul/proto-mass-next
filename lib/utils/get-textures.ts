// types
import type { gameTypes } from '@lib/types'
// config
import { heroTexturesConfig, enemyTexturesConfig } from '@lib/config'

export const getTextures: gameTypes.GetTexturesType = (atlasJson, consumer) => {
    if (!atlasJson) return null
    const obj: gameTypes.TexturesObject = {} as gameTypes.TexturesObject
    if (consumer === "enemy") {
        const textureKeys = Object.keys(enemyTexturesConfig) as gameTypes.EnemyState[]
        textureKeys.forEach((state: gameTypes.EnemyState) => {
            const texturesLength = enemyTexturesConfig[state].count || 1
            obj[state] = Array.from({ length: texturesLength }, (_, i) => {
                return atlasJson.textures['bot-' + state + '-' + (i + 1) + '.png']
            })
        })
        return obj
    }
    const textureKeys = Object.keys(heroTexturesConfig) as gameTypes.HeroState[]
    textureKeys.forEach((state: gameTypes.HeroState) => {
        const texturesLength = heroTexturesConfig[state].count || 1
        obj[state] = Array.from({ length: texturesLength }, (_, i) => {
            const uid = heroTexturesConfig[state].uid + i + 6
            return atlasJson.textures[uid]
        })
    })
    return obj
}
