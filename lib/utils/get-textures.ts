// config
import { heroTexturesConfig, enemyTexturesConfig } from '@lib/config'

export const getTextures: all.game.GetTexturesType = (atlasJson, consumer) => {
    if (!atlasJson) return null
    const obj: all.game.TexturesObject = {} as all.game.TexturesObject
    if (consumer === "enemy") {
        const textureKeys = Object.keys(enemyTexturesConfig) as all.game.EnemyState[]
        textureKeys.forEach((state: all.game.EnemyState) => {
            const texturesLength = enemyTexturesConfig[state].count || 1
            obj[state] = Array.from({ length: texturesLength }, (_, i) => {
                return atlasJson.textures['bot-' + state + '-' + (i + 1) + '.png']
            })
        })
        return obj
    }
    const textureKeys = Object.keys(heroTexturesConfig) as all.game.HeroState[]
    textureKeys.forEach((state: all.game.HeroState) => {
        const texturesLength = heroTexturesConfig[state].count || 1
        obj[state] = Array.from({ length: texturesLength }, (_, i) => {
            const label = heroTexturesConfig[state].uid + i
            return atlasJson.textures[String(label)]
        })
    })
    return obj
}
