declare const process: {
    env: {
        [key: string]: unknown;
        ORIGIN: string;
        NODE_ENV: "development" | "production";
        BASE_URL: string;
        VERSION: string;
        DRAWER_FLOATING_BREAKPOINT_WIDTH: number;
        COLOR_THEME: string | undefined;
    };
};

export const config = <const>{
    NODE_ENV: process.env.NODE_ENV,
    BASE_URL: process.env.BASE_URL,
    VERSION: process.env.VERSION,
    ORIGIN: process.env.ORIGIN,
    DRAWER_FLOATING_BREAKPOINT_WIDTH: 960,
    TOOLTIP_ROOT_ELEMENT_ID: "tooltip-root",
    DIALOG_ROOT_ELEMENT_ID: "dialog-root",
    POPUP_ROOT_ELEMENT_ID: "popup-root",
    HEADER_CONTENT_ELEMENT_ID: "header-content",
    COLOR_THEME: process.env.COLOR_THEME,
    DEFAULT_PRIMARY_COLOR: "#0A6DB5"
};
