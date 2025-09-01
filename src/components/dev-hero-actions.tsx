import * as React from "react"
// store
import { useStore } from "@/store"
// components
import { Button } from "@components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@components/ui/dropdown-menu"
// types
import type { uiTypes, storeTypes, gameTypes } from "@lib/types"
// utils
import { cn } from "@lib/utils"
// config
import { heroActionsMenu } from "@lib/config"

function DevHeroActions() {
    const hero = useStore((state: storeTypes.GlobalStore) => state.hero)
    const setHeroAction = useStore(
        (state: storeTypes.GlobalStore) => state.setHeroAction,
    )

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="hover:text-primary data-[state='open']:text-primary">
                    {hero.state || "Hero Actions"}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {heroActionsMenu.map((item: uiTypes.MenuItem) => (
                    <DropdownMenuItem
                        key={item.id}
                        className={cn(
                            "text-2xl p-4 pl-8 pr-8 dark:hover:text-primary hover:text-primary",
                            item.id === hero.state ? "text-primary" : "",
                        )}
                        onClick={() => setHeroAction(item.id as gameTypes.HeroState)}
                    >
                        {item.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DevHeroActions
