// local storage read/write utils

export const saveToLocalStorage = (key: string, value: any) => {
    if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value))
    }
}

export const readFromLocalStorage = (key: string) => {
    if (typeof window !== "undefined") {
        const value = window.localStorage.getItem(key)
        return value ? JSON.parse(value) : null
    }
    return null
}

export const removeFromLocalStorage = (key: string) => {
    if (typeof window !== "undefined") {
        window.localStorage.removeItem(key)
    }
}
