import { useExtend } from '@pixi/react'
import { Viewport } from 'pixi-viewport'
// types
import type { gameTypes } from '@lib/types'

const Camera = ({ gameSize, children, ...props }: gameTypes.CameraProps) => {
    useExtend({ Viewport })

    const cameraOptions = {
        moving: true,
        zooming: true,
        screenWidth: gameSize.width / 2,
        screenHeight: gameSize.height / 2,
        worldWidth: gameSize.width,
        worldHeight: gameSize.height,
        ...props,
    }

    return (
        <pixiViewport {...cameraOptions}>
            {children && <>{children}</>}
        </pixiViewport>
    )
}

export default Camera
