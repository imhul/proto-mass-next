import type React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@components/ux/theme-provider"
// components
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
// config
import { themeMenu } from "@lib/config"

const ThemeToggle = () => {
    const { setTheme, theme } = useTheme()

    return (
        <Select onValueChange={(value) => setTheme(value as all.ui.ThemeName)} defaultValue={"system"}>
            <SelectTrigger className="w-[180px] text-white">
                <SelectValue placeholder={(
                    <div className="flex items-center justify-start">
                        <Sun className="text-white h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                        <span className="sr-only">{theme ?? "system"}</span>
                    </div>
                )} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Themes</SelectLabel>
                    {themeMenu.map((themeItem: all.ui.Theme) => (
                        <SelectItem
                            className={theme === themeItem.id ? "bg-muted" : ""}
                            key={themeItem.id}
                            value={themeItem.id}
                        >
                            {themeItem.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default ThemeToggle
