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
        <header className="flex items-center justify-between p-4 bg-gray-100 dark:bg-[var(--body-bg)]">
            <Link withChildren to="home">
                <img
                    src="/assets/chicken-hell-logo.png"
                    alt="Proto-Mass logo"
                    width={100}
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
