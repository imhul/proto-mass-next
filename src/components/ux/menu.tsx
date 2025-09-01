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
import { usePersistedStore } from "@/store"
// types
import type { storeTypes } from "@lib/types"

const Menu = () => {
    const route = usePersistedStore((state: storeTypes.PersistedStore) => state.route)
    const paused = usePersistedStore((state: storeTypes.PersistedStore) => state.paused)
    const isGameInit = usePersistedStore((state: storeTypes.PersistedStore) => state.init)
    const setGameAction = usePersistedStore(
        (state: storeTypes.PersistedStore) => state.setGameAction,
    )

    useEffect(() => {
        if (route !== "game" && isGameInit && !paused) setGameAction("pause")
    }, [isGameInit, route, paused])

    return (
        <NavigationMenu>
            <NavigationMenuList>
                {menu.map((item, index) => (
                    <NavigationMenuItem key={index}>
                        <NavigationMenuLink>
                            <Link
                                className="hover:text-primary data-[active=true]:text-primary"
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
