// utils
import { getRandomInt } from '@lib/utils'
import Rand from 'rand-seed'
// config
import { smallClusterSize, bigClusterSize } from '@lib/config'

export const generateMap: all.game.GenerateMap = ({
    seed,
    width,
    height,
    materials,
    bigClusterPercent,
    smallClusterPercent,
}) => {
    const rand = new Rand(seed)
    const gmap: all.game.GMap = Array.from({ length: height }, () => Array(width).fill(0))
    const pick = <T>(arr: T[]) => arr[getRandomInt(0, arr.length - 1, rand)]
    const totalCells = width * height
    const avgBigSize = 15
    const avgSmallSize = 3
    const bigClusters = Math.floor((totalCells * bigClusterPercent) / 100 / avgBigSize)
    const smallClusters = Math.floor((totalCells * smallClusterPercent) / 100 / avgSmallSize)

    function placeCluster(size: number) {
        const startX = getRandomInt(0, width - 1, rand)
        const startY = getRandomInt(0, height - 1, rand)
        const material = pick(materials)

        const stack: [number, number][] = [[startX, startY]]
        const visited = new Set<string>()
        let placed = 0

        while (stack.length > 0 && placed < size) {
            const [x, y] = stack.pop()!
            const key = `${x},${y}`
            if (visited.has(key)) continue
            visited.add(key)

            if (x < 0 || y < 0 || x >= width || y >= height) continue
            if (gmap[y][x] !== 0) continue

            gmap[y][x] = material
            placed++

            const neighbors = [
                [x + 1, y],
                [x - 1, y],
                [x, y + 1],
                [x, y - 1],
            ] as [number, number][];
            neighbors.sort(() => getRandomInt(0, 1, rand) - 0.5)

            stack.push(...neighbors)
        }
    }

    for (let i = 0; i < bigClusters; i++) {
        placeCluster(getRandomInt(bigClusterSize.min, bigClusterSize.max, rand))
    }

    for (let i = 0; i < smallClusters; i++) {
        placeCluster(getRandomInt(smallClusterSize.min, smallClusterSize.max, rand))
    }

    return gmap
}
