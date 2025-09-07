// store
import { usePersistedStore } from "@/store"
// types
import type { storeTypes } from "@lib/types"
// components
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bug } from "lucide-react"
import { Button } from "@/components/ui/button"
// utils
import { cn } from "@lib/utils"
// config
import { devMenu } from "@lib/config"

const DevMenu = () => {
    // store
    const setDev = usePersistedStore((state: storeTypes.PersistedStore) => state.setDev)
    const isDev = usePersistedStore((state: storeTypes.PersistedStore) => state.isDev)
    const showObjectHitboxes = usePersistedStore((state: storeTypes.PersistedStore) => state.showObjectHitboxes)
    const showEnemyHitboxes = usePersistedStore((state: storeTypes.PersistedStore) => state.showEnemyHitboxes)
    const showHeroHitbox = usePersistedStore((state: storeTypes.PersistedStore) => state.showHeroHitbox)
    const showDots = usePersistedStore((state: storeTypes.PersistedStore) => state.showDots)
    const showFPS = usePersistedStore((state: storeTypes.PersistedStore) => state.showFPS)
    const isGodMode = usePersistedStore((state: storeTypes.PersistedStore) => state.isGodMode)
    const showCharts = usePersistedStore((state: storeTypes.PersistedStore) => state.showCharts)
    const showHeroActionMenu = usePersistedStore((state: storeTypes.PersistedStore) => state.showHeroActionMenu)
    const showEnemyProgress = usePersistedStore((state: storeTypes.PersistedStore) => state.showEnemyProgress)

    const menu = devMenu.map((m) => {
        switch (m.id) {
            case "object-hitboxes": return { ...m, checked: showObjectHitboxes }
            case "enemy-hitboxes": return { ...m, checked: showEnemyHitboxes }
            case "hero-hitbox": return { ...m, checked: showHeroHitbox }
            case "dots": return { ...m, checked: showDots }
            case "fps": return { ...m, checked: showFPS }
            case "god-mode": return { ...m, checked: isGodMode }
            case "charts": return { ...m, checked: showCharts }
            case "hero-action-menu": return { ...m, checked: showHeroActionMenu }
            case "enemy-progress": return { ...m, checked: showEnemyProgress }
            default: return m
        }
    })

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className={`${isDev() ? "dark:text-gray-950 dark:hover:text-gray-600" : "dark:text-white dark:hover:text-primary"} hover:text-gray-950`}
                    variant={isDev() ? "default" : "secondary"}
                    size="icon"
                >
                    <Bug />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-100">
                <DropdownMenuLabel className="text-xl text-primary">Dev Tools</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {menu.map((item) => (
                    <DropdownMenuCheckboxItem
                        key={item.id}
                        checked={item.checked}
                        onCheckedChange={() => setDev(item.id)}
                        className={cn(
                            "text-2xl p-4 pl-8 pr-8 dark:hover:text-primary hover:text-primary",
                            item.checked ? "text-primary" : "",
                        )}
                    >
                        {item.label}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DevMenu
