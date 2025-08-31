// components
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
    const isDev = usePersistedStore((state: storeTypes.PersistedStore) => state.isDev)
    const route = usePersistedStore((state: storeTypes.PersistedStore) => state.route)

    return (
        <header className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800">
            <Link withChildren to="home">
                <img
                    className="dark:invert"
                    src="/pm-logo.svg"
                    alt="Proto-Mass logo"
                    width={180}
                    height={38}
                />
            </Link>
            <Menu />
            <div className="flex items-center gap-4">
                {route === "game" && (<>
                    <Button
                        className={`${isDev ? "dark:text-gray-950 dark:hover:text-gray-600" : "dark:text-white dark:hover:text-primary"} hover:text-gray-950`}
                        onClick={() => setIsDev()}
                        variant={isDev ? "default" : "secondary"}
                    >
                        <Bug />
                    </Button>
                    <GameMenuToggle />
                </>)}
            </div>
        </header>
    )
}

export default Header
