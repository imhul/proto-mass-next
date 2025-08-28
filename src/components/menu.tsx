// components
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuViewport,
    NavigationMenuIndicator,
} from "@components/ui/navigation-menu"
import Link from "@components/link"
// config
import { menu } from "@lib/config"
// store
import { usePersistedStore } from "@/store"
// types
import type { storeTypes } from "@lib/types"

const Menu = () => {
    const route = usePersistedStore((state: storeTypes.PersistedStore) => state.route)

    return (
        <NavigationMenu>
            <NavigationMenuList>
                {menu.map((item, index) => (
                    <NavigationMenuItem key={index}>
                        <NavigationMenuLink>
                            <Link
                                className="text-white"
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
