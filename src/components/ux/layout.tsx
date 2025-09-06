// store
import { useStore } from "@/store"
// types
import type { storeTypes } from "@lib/types"
// components
import { ThemeProvider } from "@components/ux/theme-provider"
import Header from "@components/ux/header"
import { Toaster } from "@components/ui/sonner"
import Home from "@components/ux/home"
import { Output as GameOutput } from "@components/game/output"

const Layout = () => {
    const route = useStore((state: storeTypes.GlobalStore) => state.route)

    const render = () => {
        switch (route) {
            case "home":
                return <Home />
            case "game":
                return <GameOutput />
            default:
                return null
        }
    }

    return (
        <ThemeProvider storageKey="vite-ui-theme" defaultTheme="system">
            <Toaster closeButton richColors duration={4000} position="top-right" />
            <Header />
            <main style={{ height: `calc($100vh - 84px)` }}>{render()}</main>
        </ThemeProvider>
    )
}

export default Layout
