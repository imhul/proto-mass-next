import type { ReactNode } from "react"
// components
import { ThemeProvider } from "@components/theme-provider"
import Header from "@components/header"
import { Toaster } from "@components/ui/sonner"

const Layout = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  return (
    <div className="antialiased">
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
        <main>{children}</main>
      </ThemeProvider>
    </div>
  )
}

export default Layout
