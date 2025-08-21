// store
import { usePersistedStore } from "@store"
// types
import type { PersistedStore } from "@lib/types"
// components
import { ThemeProvider } from "@components/theme-provider"
import Header from "@components/header"
import { Toaster } from "@components/ui/sonner"
import Home from '@/components/home'
import Game from '@/components/game'

const Layout = () => {
  const route = usePersistedStore((state: PersistedStore) => state.route)

  const render = () => {
    switch (route) {
      case "home":
        return <Home />
      case "game":
        return <Game />
      default:
        return null
    }
  }

  return (
    <ThemeProvider
      storageKey="vite-ui-theme"
      defaultTheme="system"
    >
      <Toaster
        closeButton
        richColors
        duration={4000}
        position="top-right"
      />
      <Header />
      <main>{render()}</main>
    </ThemeProvider>
  )
}

export default Layout
