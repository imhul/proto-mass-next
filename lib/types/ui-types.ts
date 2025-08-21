import type { BaseItem } from '@lib/types';

export type ThemeName = "light" | "dark" | "system"
export interface Theme extends BaseItem { id: ThemeName }
export interface MenuItem extends BaseItem { }
export interface GameMenuItem extends BaseItem { }

export interface LinkProps {
    to: string;
    text?: string;
    active?: boolean;
    asChild?: boolean;
    children?: React.ReactNode;
    withChildren?: boolean;
    [key: string]: any;
}