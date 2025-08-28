// components
import ThemeToggle from "@components/theme-toggle"
import GameMenuToggle from "@components/game-menu-toggle"
import Menu from "@components/menu"
import Link from "@components/link"
import { Button } from "@components/ui/button"
import { Bug } from "lucide-react"
// store
import { usePersistedStore } from "@/store"
// types
import type { storeTypes } from "@lib/types"

const Header = () => {
    const setIsDev = usePersistedStore((state: storeTypes.PersistedStore) => state.setIsDev)

    return (
        <header className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800">
            <Link withChildren to="home">
                <img
                    className="dark:invert"
                    src="/next.svg"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                />
            </Link>
            <Menu />
            <div className="flex items-center gap-4">
                <Button className="text-white" onClick={() => setIsDev()}>
                    <Bug />
                </Button>
                <GameMenuToggle />
                <ThemeToggle />
            </div>
        </header>
    )
}

export default Header
