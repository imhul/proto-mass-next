import type { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

export type Checked = DropdownMenuCheckboxItemProps["checked"]
export interface GameMenuItem extends BaseItem { }
export interface Theme extends BaseItem { id: ThemeName }
export type ThemeName = "light" | "dark" | "system"

export interface BaseItem {
    id: string
    label: string
}

export interface Breakpoint {
    id: string
    value: number
    width: number
    height: number
}

export interface ErrorProps {
    error: {
        environmentName: string
        message: string
        stack: string
    }
}

export interface LinkProps {
    to: string
    text?: string
    active?: boolean
    asChild?: boolean
    children?: all.react.ReactNode
    withChildren?: boolean
    [key: string]: any
}

export interface MenuItem extends BaseItem {
    checked?: Checked
}
