import { useEffect, forwardRef, useImperativeHandle, useRef } from "react"
import { useExtend } from "@pixi/react"
import { Viewport } from "pixi-viewport"

const Camera = forwardRef<Viewport | null, all.game.CameraProps>(
    ({ gameSize, children, ...props }, ref) => {
        useExtend({ Viewport })
        const camRef = useRef<Viewport | null>(null)

        // throw ref in Game
        useImperativeHandle(ref, () => camRef.current as Viewport, [])

        const cameraOptions = {
            moving: true,
            zooming: true,
            screenWidth: gameSize.width / 2,
            screenHeight: gameSize.height / 2,
            worldWidth: gameSize.width,
            worldHeight: gameSize.height,
            ...props,
        }

        useEffect(() => {
            if (!camRef.current) return

            const onWheel = (event: WheelEvent) => {
                if (!camRef.current) return
                const prev = camRef.current.scale.x
                if (event.deltaY === 0) return
                const zoom = Math.max(0.5, Math.min(2, prev + (event.deltaY > 0 ? -0.1 : 0.1)))
                camRef.current.setZoom(zoom, true)
            }

            camRef.current.on("wheel", onWheel)
            return () => {
                camRef.current?.off("wheel", onWheel)
            }
        }, [])

        return (
            <pixiViewport {...cameraOptions} ref={camRef} events={props.events}>
                {children}
            </pixiViewport>
        )
    }
)

Camera.displayName = "Camera"
export default Camera
