import React from "react";

import { css, styled } from "styled-components";

import type { enishiUIProps } from "@/enishi-ui/components/type";

type ColorTheme = "accent" | "error" | "info" | "primary" | "secondary" | "success" | "warning";
const Host = styled.div<{
    $top: string;
    $bottom: string;
    $left: string;
    $right: string;
    $colorTheme: ColorTheme;
    $isEmpty: boolean;
    $highlight: boolean;
}>`
    position: absolute;
    top: ${({ $top }) => $top};
    bottom: ${({ $bottom }) => $bottom};
    left: ${({ $left }) => $left};
    right: ${({ $right }) => $right};
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ $highlight, theme, $colorTheme }) =>
        $highlight ? theme.palette.text.primary : theme.palette[$colorTheme][100]};
    border-radius: 30px;
    color: ${({ $highlight, theme, $colorTheme }) => ($highlight ? theme.palette[$colorTheme][100] : theme.palette[$colorTheme][10])};
    font-size: 0.8rem;
    font-weight: bold;
    padding: 0rem 0.5rem 0.1rem 0.5rem;
    box-sizing: border-box;
    text-align: center;
    ${({ $isEmpty }) =>
        $isEmpty &&
        css`
            && {
                border-radius: 50%;
                min-width: 0.6rem;
                width: 0.6rem;
                max-width: 0.6rem;
                min-height: 0.6rem;
                height: 0.6rem;
                max-height: 0.6rem;
                padding: 0;
            }
        `}
`;

type Props = enishiUIProps<{
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    colorTheme?: ColorTheme;
    highlight?: boolean;
}>;

export const Badge: React.FC<Props> = ({
    top = "initial",
    bottom = "initial",
    left = "initial",
    right = "initial",
    colorTheme = "primary",
    children,
    highlight = false,
    ...props
}) => (
    <Host
        $bottom={bottom}
        $colorTheme={colorTheme}
        $highlight={highlight}
        $isEmpty={children === undefined || children === null}
        $left={left}
        $right={right}
        $top={top}
        {...props}
    >
        {children}
    </Host>
);
