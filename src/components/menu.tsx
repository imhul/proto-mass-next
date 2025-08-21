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
import { config } from "@lib/config"
// store
import { useStore } from "@store"
// types
import type { StoreType } from "@lib/types"

const Menu = () => {
  const route = useStore((state: StoreType) => state.route)

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {config.menu.map((item, index) => (
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
