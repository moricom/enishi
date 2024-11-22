import { createGlobalStyle, css } from "styled-components";

import { down } from "@/utils/css/mediaQuery/down";

import type { DefaultTheme } from "styled-components";

const responsibleStyle = ({ theme }: { theme: DefaultTheme }) => css`
    ${down(theme.breakpoints.sizes.tablet)} {
        html {
            font-size: 14px;
        }
    }
    ${down(theme.breakpoints.sizes.mobileL)} {
        html {
            font-size: 14px;
        }
    }
`;

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
    }
    #root {
        height: 100%;
    }
    html {
        font-size: 14px;
        font-family: "Noto Sans JP", "Roboto", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
        font-weight: 400;
        line-height: 1.2;
        letter-spacing: 0.4px;
    }
    body {
        color: ${({ theme }) => theme.palette.text.primary};
    }
    ${responsibleStyle}

    /*
        It's using overlayscrollbars to customize the scroll bar because on Windows, even if overflow: auto is specified, the scroll bar is displayed even if scrolling is not necessary.
        When checking for omissions in correspondence, please comment out the following code.
    */
    // ::-webkit-scrollbar {
    //     display: block;
    // }
    // ::-webkit-scrollbar {
    //     width: 5px;
    //     height: 8px;
    //     background-color: #aaa; /* or add it to the track */
    // }
    // ::-webkit-scrollbar-thumb {
    //     background: #000;
    // }
`;
