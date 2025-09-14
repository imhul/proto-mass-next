const DevHitbox = ({ x, y, width, height, ...props }: all.game.DevComponentProps) => {
    return (
        <pixiGraphics
            draw={(g) => {
                g.clear()
                g.rect(x - width / 2, y - height / 2, width, height)
                g.setStrokeStyle({
                    width: 4,
                    color: 0xff0000,
                    alpha: 0.4,
                }).stroke()
            }}
            {...props}
        />
    )
}

export default DevHitbox
