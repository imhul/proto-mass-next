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
import { Cog } from "lucide-react"
import { cn } from "@lib/utils"
// config
import { gameMenu } from "@lib/config"

type Store = all.store.PersistedStore

function GameMenu() {
    const paused = usePersistedStore((s: Store) => s.paused)
    const hero = usePersistedStore((s: Store) => s.hero)
    const setGameAction = usePersistedStore((s: Store) => s.setGameAction)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className={
                        "no-border no-bg-on-hover" + " " +
                        "hover:text-primary" + " " +
                        "hover:bg-transparent" + " " +
                        "data-[state='open']:text-primary" + " " +
                        (hero.state !== "player-idle" ? "text-primary" : "text-accent")
                    }
                >
                    <Cog className="scale-250 transition-all" />
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
