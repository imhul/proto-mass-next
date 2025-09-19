import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@hooks": path.resolve(__dirname, "./src/hooks"),
            "@store": path.resolve(__dirname, "./src/store"),
            "@utils": path.resolve(__dirname, "./lib/utils"),
            "@types": path.resolve(__dirname, "./lib/types"),
            "@lib": path.resolve(__dirname, "./lib"),
            "@root": path.resolve(__dirname, "./"),
        },
    },
    optimizeDeps: {
        include: ["pixi-filters"],
    },
})
