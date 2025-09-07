// components
import GameMenu from "@/components/ux/game-menu"
import Menu from "@components/ux/menu"
import Link from "@components/ux/link"
import DevHeroActions from "@components/ux/dev-hero-actions"
import DevMenu from "@/components/ux/dev-menu"
// store
import { useStore, usePersistedStore } from "@/store"
// types
import type { storeTypes } from "@lib/types"

const Header = () => {
    const route = useStore((state: storeTypes.GlobalStore) => state.route)
    const showHeroActionMenu = usePersistedStore((state: storeTypes.PersistedStore) => state.showHeroActionMenu)

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
                    {showHeroActionMenu && (<DevHeroActions />)}
                    <DevMenu />
                    <GameMenu />
                </>)}
            </div>
        </header>
    )
}

export default Header
