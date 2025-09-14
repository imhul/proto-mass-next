import CustomGifSprite from "@components/pixi/custom-gif-sprite"

const Explosion = ({ position, scale, onComplete }: all.game.ExplosionProps) => {
    return <CustomGifSprite
        position={position}
        scale={scale}
        url="/assets/explosions/explo01.gif"
        onComplete={onComplete}
    />
}

export default Explosion
