"use client"

import { useState } from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuViewport,
  NavigationMenuIndicator,
} from "@/components/ui/navigation-menu"
// config
import { configuration } from "@/lib/configuration"

function Menu() {
  const [active, setActive] = useState(false)

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {configuration.menu.map((item, index) => (
          <NavigationMenuItem key={index}>
            <NavigationMenuLink asChild>
              <Link
                href={item.url}
                prefetch={active ? null : false}
                onMouseEnter={() => setActive(true)}
              >
                {item.label}
              </Link>
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
