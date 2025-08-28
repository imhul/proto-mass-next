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
import type { uiTypes, storeTypes } from "@lib/types"
// utils
import { Ellipsis } from "lucide-react"
// config
import { gameMenu } from "@lib/config"

function GameMenuToggle() {
    const setGameAction = usePersistedStore(
        (state: storeTypes.PersistedStore) => state.setGameAction,
    )

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Ellipsis className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {gameMenu.map((item: uiTypes.GameMenuItem) => (
                    <DropdownMenuItem
                        key={item.id}
                        onClick={() => setGameAction(item.id)}
                    >
                        {item.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default GameMenuToggle
