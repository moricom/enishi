import ShadeGenerator from "shade-generator";

import { hexToRgb } from "@/utils/css/hexToRgb";

import type { Shade } from "shade-generator";

const baseTheme = <const>{
    typography: {
        fontFamily: '"Noto Sans JP", "Roboto", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif',
        fontWeight: {
            light: 300,
            regular: 400,
            bold: 700
        },
        variant: {
            h1: {
                fontFamily: '"Noto Sans JP", "Roboto", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif',
                fontWeight: 300,
                fontSize: "3.75rem",
                lineHeight: 1.2,
                letterSpacing: "-0.00833em"
            },
            h2: {
                fontFamily: '"Noto Sans JP", "Roboto", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif',
                fontWeight: 400,
                fontSize: "1.5rem",
                lineHeight: 1.167,
                letterSpacing: "0em"
            },
            h3: {
                fontFamily: '"Noto Sans JP", "Roboto", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif',
                fontWeight: 400,
                fontSize: "1.3rem",
                lineHeight: 1.235,
                letterSpacing: "0.00735em"
            },
            h4: {
                fontFamily: '"Noto Sans JP", "Roboto", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif',
                fontWeight: 400,
                fontSize: "1.2rem",
                lineHeight: 1.334,
                letterSpacing: "0em"
            },
            h5: {
                fontFamily: '"Noto Sans JP", "Roboto", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif',
                fontWeight: 400,
                fontSize: "1rem",
                lineHeight: 1.2,
                letterSpacing: "0.0075em"
            },
            h6: {
                fontFamily: '"Noto Sans JP", "Roboto", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif',
                fontWeight: 400,
                fontSize: "0.8rem",
                lineHeight: 1.4,
                letterSpacing: "0.0075em"
            },
            subtitle1: {
                fontFamily: '"Noto Sans JP", "Roboto", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif',
                fontWeight: 400,
                fontSize: "1rem",
                lineHeight: 1.75,
                letterSpacing: "0.00938em"
            },
            subtitle2: {
                fontFamily: '"Noto Sans JP", "Roboto", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif',
                fontWeight: 500,
                fontSize: "0.875rem",
                lineHeight: 1.57,
                letterSpacing: "0.00714em"
            },
            body1: {
                fontFamily: '"Noto Sans JP", "Roboto", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif',
                fontWeight: 400,
                fontSize: "1rem",
                lineHeight: 1.4,
                letterSpacing: "0.00938em"
            },
            body2: {
                fontFamily: '"Noto Sans JP", "Roboto", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif',
                fontWeight: 400,
                fontSize: "0.875rem",
                lineHeight: 1.43,
                letterSpacing: "0.01071em"
            },
            button: {
                fontFamily: '"Noto Sans JP", "Roboto", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif',
                fontWeight: 500,
                fontSize: "0.875rem",
                lineHeight: 1.75,
                letterSpacing: "0.02857em",
                textTransform: "uppercase"
            },
            caption: {
                fontFamily: '"Noto Sans JP", "Roboto", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif',
                fontWeight: 400,
                fontSize: "0.85rem",
                lineHeight: 1,
                letterSpacing: "0.03333em"
            },
            overline: {
                fontFamily: '"Noto Sans JP", "Roboto", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif',
                fontWeight: 400,
                fontSize: "0.75rem",
                lineHeight: 2.66,
                letterSpacing: "0.08333em",
                textTransform: "uppercase"
            }
        }
    },
    breakpoints: {
        sizes: {
            mobileS: "320px",
            mobileM: "375px",
            mobileL: "425px",
            tablet: "768px",
            laptop: "1024px",
            laptopL: "1440px",
            desktop: "2560px"
        },
        pxSizes: {
            mobileS: 320,
            mobileM: 375,
            mobileL: 425,
            tablet: 768,
            laptop: 1024,
            laptopL: 1440,
            desktop: 2560
        }
    },
    transitions: {
        easing: {
            easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
            easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
            easeIn: "cubic-bezier(0.4, 0, 1, 1)",
            sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
        },
        duration: {
            shortest: "0.150s",
            shorter: "0.200s",
            short: "0.250s",
            standard: "0.300s",
            complex: "0.375s"
        }
    }
};

export type AppTheme = typeof baseTheme & {
    mode: "dark" | "light";
    palette: {
        background: Record<Shade, string>;
        thinPrimary: Record<Shade, string>;
        primary: Record<Shade, string>;
        secondary: Record<Shade, string>;
        error: Record<Shade, string>;
        warning: Record<Shade, string>;
        info: Record<Shade, string>;
        success: Record<Shade, string>;
        accent: Record<Shade, string>;
        grey: Record<Shade, string>;
        text: {
            accent: string;
            primary: string;
            secondary: string;
            disabled: string;
        };
        action: {
            hover: (baseColor: string) => string;
            active: (baseColor: string) => string;
            highlight: (baseColor: string) => string;
        };
    };
    shadows: {
        "0": string;
        "1": string;
        "2": string;
        "3": string;
        "4": string;
        "5": string;
        "6": string;
        "7": string;
        "8": string;
        "9": string;
        "10": string;
        "11": string;
        "12": string;
        "13": string;
        "14": string;
        "15": string;
    };
};

const reverseAllColorCodes = (codes: Record<Shade, string>): Record<Shade, string> => ({
    "10": codes["1000"],
    "20": codes["900"],
    "30": codes["800"],
    "40": codes["700"],
    "50": codes["600"],
    "60": codes["500"],
    "70": codes["400"],
    "80": codes["300"],
    "90": codes["200"],
    "100": codes["100"],
    "200": codes["90"],
    "300": codes["80"],
    "400": codes["70"],
    "500": codes["60"],
    "600": codes["50"],
    "700": codes["40"],
    "800": codes["30"],
    "900": codes["20"],
    "1000": codes["10"]
});

export const createThemes = (primaryColor: string) => {
    const primaryColorShades = ShadeGenerator.hue(primaryColor).shadesMap("hex");
    const theme: AppTheme = {
        ...baseTheme,
        mode: "light",
        palette: {
            background: ShadeGenerator.hue("#f0f0f0").shadesMap("hex"),
            thinPrimary: ShadeGenerator.hue(primaryColorShades[60]).shadesMap("hex"),
            primary: primaryColorShades,
            secondary: ShadeGenerator.hue("#337DFF").shadesMap("hex"),
            accent: ShadeGenerator.hue("#337DFF").shadesMap("hex"),
            error: ShadeGenerator.hue("#f44336").shadesMap("hex"),
            warning: ShadeGenerator.hue("#ffa726").shadesMap("hex"),
            info: ShadeGenerator.hue("#424242").shadesMap("hex"),
            success: ShadeGenerator.hue("#66bb6a").shadesMap("hex"),
            grey: ShadeGenerator.hue("#909090").shadesMap("hex"),
            text: {
                accent: "rgba(0, 0, 0, 1)",
                primary: "rgba(0, 0, 0, 0.87)",
                secondary: "rgba(0, 0, 0, 0.6)",
                disabled: "rgba(0, 0, 0, 0.38)"
            },
            action: {
                hover: (baseHexColor: string) => {
                    const { r, g, b } = hexToRgb(baseHexColor);
                    return `rgba(${r}, ${g}, ${b}, 0.15)`;
                },
                active: (baseHexColor: string) => {
                    const { r, g, b } = hexToRgb(baseHexColor);
                    return `rgba(${r}, ${g}, ${b}, 0.15)`;
                },
                highlight: (baseHexColor: string) => {
                    const { r, g, b } = hexToRgb(baseHexColor);
                    return `rgba(${r}, ${g}, ${b}, 0.3)`;
                }
            }
        },
        shadows: {
            0: "none",
            1: "0px 0px 2px 0px rgb(0 0 0/20%)",
            2: "0px 0px 3px 1px rgb(0 0 0/15%)",
            3: "0px 0px 4px 2px rgb(0 0 0/16%)",
            4: "0px 0px 5px 2px rgb(0 0 0/6%)",
            5: "0px 0px 6px 2px rgb(0 0 0/8%)",
            6: "0px 0px 6px 3px rgb(0 0 0/8%)",
            7: "0px 0px 6px 3px rgb(0 0 0/8%)",
            8: "0px 0px 6px 4px rgb(0 0 0/10%)",
            9: "0px 0px 6px 4px rgb(0 0 0/12%)",
            10: "0px 0px 6px 5px rgb(0 0 0/14%)",
            11: "0px 0px 6px 5px rgb(0 0 0/16%)",
            12: "0px 0px 6px 6px rgb(0 0 0/18%)",
            13: "0px 0px 6px 7px rgb(0 0 0/20%)",
            14: "0px 0px 6px 8px rgb(0 0 0/22%)",
            15: "0px 0px 6px 9px rgb(0 0 0/24%)"
        }
    };

    ShadeGenerator.config({
        "10": 0.9,
        "20": 0.8,
        "30": 0.7,
        "40": 0.6,
        "50": 0.5,
        "60": 0.4,
        "70": 0.3,
        "80": 0.2,
        "90": 0.1,
        "100": 0,
        "200": 0.9,
        "300": 0.8,
        "400": 0.7,
        "500": 0.6,
        "600": 0.5,
        "700": 0.4,
        "800": 0.3,
        "900": 0.2,
        "1000": 0.1
    });
    const darkTheme: AppTheme = {
        ...theme,
        mode: "dark",
        palette: {
            background: reverseAllColorCodes(ShadeGenerator.hue("#404040").shadesMap("hex")),
            thinPrimary: reverseAllColorCodes(ShadeGenerator.hue(theme.palette.primary[10]).shadesMap("hex")),
            primary: reverseAllColorCodes(ShadeGenerator.hue(theme.palette.primary[60]).shadesMap("hex")),
            secondary: reverseAllColorCodes(theme.palette.secondary),
            accent: reverseAllColorCodes(theme.palette.accent),
            error: reverseAllColorCodes(theme.palette.error),
            warning: reverseAllColorCodes(theme.palette.warning),
            info: reverseAllColorCodes(ShadeGenerator.hue("#959595").shadesMap("hex")),
            success: reverseAllColorCodes(theme.palette.success),
            grey: reverseAllColorCodes(theme.palette.grey),
            text: {
                accent: "rgba(255, 255, 255, 1)",
                primary: "rgba(255, 255, 255, 0.8)",
                secondary: "rgba(255, 255, 255, 0.6)",
                disabled: "rgba(255, 255, 255, 0.38)"
            },
            action: {
                hover: (baseHexColor: string) => {
                    const { r, g, b } = hexToRgb(baseHexColor);
                    return `rgba(${r}, ${g}, ${b}, 0.15)`;
                },
                active: (baseHexColor: string) => {
                    const { r, g, b } = hexToRgb(baseHexColor);
                    return `rgba(${r}, ${g}, ${b}, 0.15)`;
                },
                highlight: (baseHexColor: string) => {
                    const { r, g, b } = hexToRgb(baseHexColor);
                    return `rgba(${r}, ${g}, ${b}, 0.3)`;
                }
            }
        },
        shadows: {
            0: "none",
            1: "0px 0px 2px 0px rgb(0 0 0/20%)",
            2: "0px 0px 3px 1px rgb(0 0 0/15%)",
            3: "0px 0px 4px 2px rgb(0 0 0/16%)",
            4: "0px 0px 5px 2px rgb(0 0 0/6%)",
            5: "0px 0px 6px 2px rgb(0 0 0/8%)",
            6: "0px 0px 6px 3px rgb(0 0 0/8%)",
            7: "0px 0px 6px 3px rgb(0 0 0/8%)",
            8: "0px 0px 6px 4px rgb(0 0 0/10%)",
            9: "0px 0px 6px 4px rgb(0 0 0/12%)",
            10: "0px 0px 6px 5px rgb(0 0 0/14%)",
            11: "0px 0px 6px 5px rgb(0 0 0/16%)",
            12: "0px 0px 6px 6px rgb(0 0 0/18%)",
            13: "0px 0px 6px 7px rgb(0 0 0/20%)",
            14: "0px 0px 6px 8px rgb(0 0 0/22%)",
            15: "0px 0px 6px 9px rgb(0 0 0/24%)"
        }
    };

    return { theme, darkTheme };
};
