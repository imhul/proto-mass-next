import { useEffect } from "react"
// components
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuViewport,
    NavigationMenuIndicator,
} from "@components/ui/navigation-menu"
import Link from "@components/ux/link"
// config
import { menu } from "@lib/config"
// store
import { useStore, usePersistedStore } from "@/store"

type Store = all.store.PersistedStore

const Menu = () => {
    const route = useStore((state: all.store.GlobalStore) => state.route)
    const paused = usePersistedStore((s: Store) => s.paused)
    const isGameInit = usePersistedStore((s: Store) => s.init)
    const setGameAction = usePersistedStore((s: Store) => s.setGameAction)
    const className = "data-[active=true]:text-primary" + " " +
        "hover:text-primary" + " " +
        "focus:text-primary" + " " +
        "focus-visible:text-primary"
    const navLinkClass = className + " " +
        "hover:bg-transparent" + " " +
        "data-[active=true]:focus:bg-transparent" + " " +
        "data-[active=true]:hover:bg-transparent" + " " +
        "data-[active=true]:bg-transparent" + " " +
        "focus:bg-transparent"
    const linkClass = className + " " +
        "hover:bg-accent" + " " +
        "data-[active=true]:focus:bg-accent" + " " +
        "data-[active=true]:hover:bg-accent" + " " +
        "data-[active=true]:bg-accent" + " " +
        "focus:bg-accent"

    useEffect(() => {
        if (route !== "game" && isGameInit && !paused) setGameAction("pause")
    }, [isGameInit, route, paused])

    return (
        <NavigationMenu>
            <NavigationMenuList>
                {menu.map((item, index) => (
                    <NavigationMenuItem key={index}>
                        <NavigationMenuLink
                            data-active={item.id === route}
                            className={navLinkClass}
                        >
                            <Link
                                className={linkClass}
                                text={item.label}
                                active={item.id === route}
                                to={item.id}
                            />
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                ))}
                <NavigationMenuIndicator data-orientation="horizontal" />
            </NavigationMenuList>
            <NavigationMenuViewport />
        </NavigationMenu>
    )
}

export default Menu
