import { useEffect, useRef, useState, } from 'react';
// components
import {
    Assets,
    Texture,
} from 'pixi.js';
// types
import { Position } from '@/lib/types';

const Bunny = ({ position }: { position: Position }) => {
    // The Pixi.js `Sprite`
    const spriteRef = useRef(null)

    const [texture, setTexture] = useState(Texture.EMPTY)
    const [isHovered, setIsHover] = useState(false)
    const [isActive, setIsActive] = useState(false)

    // Preload the sprite if it hasn't been loaded yet
    useEffect(() => {
        if (texture === Texture.EMPTY) {
            Assets
                .load('https://pixijs.com/assets/bunny.png')
                .then((result) => {
                    setTexture(result)
                });
        }
    }, [texture])

    return (
        <pixiSprite
            ref={spriteRef}
            anchor={0.5}
            eventMode={'static'}
            onClick={() => setIsActive(!isActive)}
            onPointerOver={() => setIsHover(true)}
            onPointerOut={() => setIsHover(false)}
            scale={isActive ? 1 : 1.5}
            texture={texture}
            x={position.x}
            y={position.y}
        />
    )
}

export default Bunny
