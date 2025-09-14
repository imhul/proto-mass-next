import * as React from "react"
// store
import { usePersistedStore } from "@/store"
// components
import { Button } from "@components/ui/button"
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from "@components/ui/dropdown-menu"
// utils
import { Ellipsis } from "lucide-react"
import { cn } from "@lib/utils"
// config
import { gameMenu } from "@lib/config"

type Store = all.store.PersistedStore

function GameMenu() {
    const paused = usePersistedStore((state: Store) => state.paused)
    const hero = usePersistedStore((state: Store) => state.hero)
    const setGameAction = usePersistedStore((state: Store) => state.setGameAction)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant={hero.state !== "player-idle" ? "default" : "secondary"}
                    size="icon"
                    className="hover:text-primary data-[state='open']:text-primary"
                >
                    <Ellipsis className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel className="text-xl text-primary">
                    Game Menu
                </DropdownMenuLabel>
                {gameMenu.map((item: all.ui.MenuItem) => (
                    <DropdownMenuItem
                        key={item.id}
                        className={cn(
                            "text-2xl p-4 pl-8 pr-8 dark:hover:text-primary hover:text-primary",
                            (item.id === "pause" && paused) ? "text-primary" : "",
                        )}
                        onClick={() => setGameAction(item.id as all.game.GameAction)}
                    >
                        {(item.id === "pause" && paused) ? "Continue" : item.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default GameMenu
