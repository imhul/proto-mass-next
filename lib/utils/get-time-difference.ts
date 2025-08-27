export const getTimeDifference = (date: number) => {
    const diff = Date.now() - date
    const ms = diff % 1000
    const s = Math.floor((diff / 1000) % 60)
    const m = Math.floor((diff / 60000) % 60)
    const h = Math.floor((diff / 3600000) % 24)
    const d = Math.floor(diff / 86400000)

    return { ms, s, m, h, d }
}
