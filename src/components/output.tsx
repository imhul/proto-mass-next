import { useEffect } from 'react'
import { useApplication } from '@pixi/react'
// components
import Hero from './hero'
import CustomTilingSprite from '@/components/pixi/custom-tiling-sprite'
// types
import type { OutputProps } from '@/lib/types'

const Output = (props: OutputProps) => {
    const { parentRef, heroState, texture, position } = props;
    const { app } = useApplication()

    useEffect(() => {
        if (!app || !position) return
        app.stage.children[1]?.position.set(position.x, position.y)
    }, [app, position])

    return (<>
        <CustomTilingSprite
            texture={texture}
            width={parentRef.current?.clientWidth ?? 800}
            height={parentRef.current?.clientHeight ?? 600}
        />
        <Hero state={heroState} />
    </>)
}

export default Output