import type { PromisableFunction } from "@/types/utils";

export type ColorTheme = "accent" | "error" | "info" | "primary" | "secondary" | "success" | "warning";
export const colorThemeList: ColorTheme[] = ["primary", "secondary", "accent", "info", "success", "warning", "error"];
export type Size = "large" | "medium" | "small" | "x-large" | "x-small";
export const sizeList: Size[] = ["x-small", "small", "medium", "large", "x-large"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
export type enishiUIProps<P extends Record<string, any> = {}> = Omit<
    {
        id?: string;
        className?: string;
        style?: React.CSSProperties;
        onClick?: PromisableFunction<() => void>;
        children?: React.ReactNode;
        colorTheme?: ColorTheme;
        size?: Size;
    },
    keyof P
> &
    P;
