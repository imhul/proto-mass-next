// components
import GameMenu from "@/components/ux/game-menu"
import Menu from "@components/ux/menu"
import Link from "@components/ux/link"
import DevHeroActions from "@components/ux/dev-hero-actions"
import DevMenu from "@/components/ux/dev-menu"
// store
import { useStore, usePersistedStore } from "@/store"

const Header = () => {
    const route = useStore((state: all.store.GlobalStore) => state.route)
    const showHeroActionMenu = usePersistedStore((state: all.store.PersistedStore) => state.showHeroActionMenu)

    return (
        <header className="flex items-center justify-between h-[80px] p-3 pl-4 pr-6  bg-gray-100 dark:bg-[var(--secondary)]">
            <Link withChildren to="home">
                <img
                    src="/assets/chicken-hell-logo.png"
                    alt="Chicken Hell Logo"
                    width={100}
                    className="logo"
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
