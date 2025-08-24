import type { commonTypes } from '@lib/types';

export type ThemeName = "light" | "dark" | "system"
export interface Theme extends commonTypes.BaseItem { id: ThemeName }
export interface MenuItem extends commonTypes.BaseItem { }
export interface GameMenuItem extends commonTypes.BaseItem { }

export interface LinkProps {
    to: string;
    text?: string;
    active?: boolean;
    asChild?: boolean;
    children?: React.ReactNode;
    withChildren?: boolean;
    [key: string]: any;
}