const allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-[]{}|?';

const randomUtf8Char = (): string => {
    const index = Math.floor(Math.random() * allowedChars.length);
    return allowedChars[index];
}

export const generateSeed = (length: number = 16): string => {
    let result = ""
    for (let i = 0; i < length; i++) {
        result += randomUtf8Char()
    }
    return result
}
