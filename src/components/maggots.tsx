import { useState, useEffect } from "react"
// components
import { Assets, Rectangle, Point } from "pixi.js"
import Maggot from "@components/maggot"
// types
import type { Texture, gameTypes } from "@lib/types"
// config
import { maggotsCount } from "@lib/config"

const Maggots = ({ width, height }: { width: number; height: number }) => {
    const [texture, setTexture] = useState<Texture | null>(null)
    const [maggots, setMaggots] = useState<gameTypes.MaggotItem[]>([])
    const bounds = new Rectangle(0, 0, width, height)

    useEffect(() => {
        Assets.load("/assets/maggot.png").then((tex) => {
            setTexture(tex as Texture)
        })
    }, [])

    useEffect(() => {
        if (!texture) return
        if (texture && !maggots.length) generateMaggots()
    }, [texture])

    const generateMaggots = () => {
        const maggotsArray: gameTypes.MaggotItem[] = []
        for (let i = 0; i < maggotsCount; i++) {
            const maggot = {
                id: i + 1,
                speed: Math.random() * 0.2 + 0.3,
                direction: Math.random() * Math.PI * 2,
                turnSpeed: Math.random() - 0.8,
                x: Math.random() * bounds.width,
                y: Math.random() * bounds.height,
                scale: { x: 0.65, y: 0.65 },
                original: new Point(),
            }

            maggot.original.copyFrom(maggot.scale)
            maggotsArray.push(maggot)
        }
        setMaggots(maggotsArray)
    }

    return (
        <>
            {texture &&
                maggots &&
                maggots.map((maggot: gameTypes.MaggotItem) => (
                    <Maggot
                        key={maggot.id}
                        texture={texture}
                        item={maggot}
                        width={width}
                        height={height}
                    />
                ))}
        </>
    )
}

export default Maggots
