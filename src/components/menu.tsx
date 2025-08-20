// components
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuViewport,
  NavigationMenuIndicator,
} from "@components/ui/navigation-menu"
// config
import { config } from "@lib/config"
// store
import { useStore } from "@store"
// types
import type { NavSlice } from "@store"

const Menu = () => {
  const goto = useStore((state: NavSlice) => state.to)
  const route = useStore((state: NavSlice) => state.route)

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {config.menu.map((item, index) => (
          <NavigationMenuItem key={index} className={route === item.id ? "active" : ""}>
            <NavigationMenuLink asChild onClick={() => goto(item.id)}>
              <span className="text-white">{item.label}</span>
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
