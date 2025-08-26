export function generateMap(
    width: number,
    height: number,
    bigClusterPercent: number,
    smallClusterPercent: number,
    materials: number[]
): number[][] {
    const map: number[][] = Array.from({ length: height }, () => Array(width).fill(0))

    const rand = (min: number, max: number) =>
        Math.floor(Math.random() * (max - min + 1)) + min
    const pick = <T>(arr: T[]) => arr[rand(0, arr.length - 1)]

    const totalCells = width * height
    const avgBigSize = 15
    const avgSmallSize = 3

    const bigClusters = Math.floor((totalCells * bigClusterPercent) / 100 / avgBigSize)
    const smallClusters = Math.floor((totalCells * smallClusterPercent) / 100 / avgSmallSize)

    function placeCluster(size: number) {
        const startX = rand(0, width - 1)
        const startY = rand(0, height - 1)
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
            if (map[y][x] !== 0) continue

            map[y][x] = material
            placed++

            // додаємо сусідів у випадковому порядку
            const neighbors = [
                [x + 1, y],
                [x - 1, y],
                [x, y + 1],
                [x, y - 1],
            ] as [number, number][];
            neighbors.sort(() => Math.random() - 0.5)

            stack.push(...neighbors)
        }
    }

    // великі кластери
    for (let i = 0; i < bigClusters; i++) {
        placeCluster(rand(10, 20))
    }

    // маленькі кластери
    for (let i = 0; i < smallClusters; i++) {
        placeCluster(rand(1, 6))
    }

    return map
}
