import { Text } from 'pixi.js'
import { extend } from '@pixi/react'

extend({ Text })

const InitialScene = () => {
    return (
        <pixiText
            text="Press any arrow key to start"
            style={{ fill: "white" }}
            x={100}
            y={100}
            anchor={0}
        />
    )
}

export default InitialScene
