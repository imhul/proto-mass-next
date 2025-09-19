import * as React from "react"
// store
import { usePersistedStore } from "@/store"
// components
import { Button } from "@components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@components/ui/dropdown-menu"
// utils
import { cn } from "@lib/utils"
// config
import { heroActionsMenu } from "@lib/config"

type Store = all.store.PersistedStore

function DevHeroActions() {
    const hero = usePersistedStore((s: Store) => s.hero)
    const setHeroAction = usePersistedStore((s: Store) => s.setHeroAction)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="hover:text-primary data-[state='open']:text-primary">
                    {hero.state || "Hero Actions"}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {heroActionsMenu.map((item: all.ui.MenuItem) => (
                    <DropdownMenuItem
                        key={item.id}
                        className={cn(
                            "text-2xl p-4 pl-8 pr-8 dark:hover:text-primary hover:text-primary",
                            item.id === hero.state ? "text-primary" : "",
                        )}
                        onClick={() => setHeroAction(item.id as all.game.HeroState)}
                    >
                        {item.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DevHeroActions
