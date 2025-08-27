export interface GameMenuItem extends BaseItem { }
export interface MenuItem extends BaseItem { }
export interface Theme extends BaseItem { id: ThemeName }
export type ThemeName = "light" | "dark" | "system"

export interface BaseItem {
    id: string;
    label: string;
}

export interface ErrorProps {
    error: {
        environmentName: string;
        message: string;
        stack: string
    }
}

export interface LinkProps {
    to: string;
    text?: string;
    active?: boolean;
    asChild?: boolean;
    children?: React.ReactNode;
    withChildren?: boolean;
    [key: string]: any;
}
