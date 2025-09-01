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
// types
import type { uiTypes, storeTypes, gameTypes } from "@lib/types"
// utils
import { Ellipsis } from "lucide-react"
import { cn } from "@lib/utils"
// config
import { gameMenu } from "@lib/config"

function GameMenu() {
    const paused = usePersistedStore((state: storeTypes.PersistedStore) => state.paused)
    const setGameAction = usePersistedStore(
        (state: storeTypes.PersistedStore) => state.setGameAction,
    )

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="hover:text-primary data-[state='open']:text-primary">
                    <Ellipsis className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {gameMenu.map((item: uiTypes.MenuItem) => (
                    <DropdownMenuItem
                        key={item.id}
                        className={cn(
                            "text-2xl p-4 pl-8 pr-8 dark:hover:text-primary hover:text-primary",
                            (item.id === "pause" && paused) ? "text-primary" : "",
                        )}
                        onClick={() => setGameAction(item.id as gameTypes.GameAction)}
                    >
                        {(item.id === "pause" && paused) ? "Continue" : item.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default GameMenu


// inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md
// text-sm font-medium transition-all disabled:pointer-events-none
// disabled:opacity-50 [&_svg]:pointer-events-none
// [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0
// outline-none focus-visible:border-ring focus-visible:ring-ring/50
// focus-visible:ring-[3px] aria-invalid:ring-destructive/20
// dark:aria-invalid:ring-destructive/40
// aria-invalid:border-destructive border bg-background shadow-xs
// hover:bg-accent dark:bg-input/30 dark:border-input
// dark:hover:bg-input/50 size-9 hover:text-primary [data-state='open']:text-primary