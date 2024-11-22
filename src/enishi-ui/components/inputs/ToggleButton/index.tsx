import React from "react";

import { css, styled } from "styled-components";

import { Ripple } from "@/enishi-ui/components/effect/Ripple";
import type { EnishiUIProps } from "@/enishi-ui/components/type";

type ColorTheme = "accent" | "error" | "info" | "primary" | "secondary" | "success" | "warning";
const Host = styled.div<{ $selected: boolean; $colorTheme: ColorTheme }>`
    cursor: pointer;
    padding: 0.2rem 1.25rem;
    transition: all ${({ theme: { transitions } }) => `${transitions.duration.short} ${transitions.easing.easeOut}`};
    background-color: ${({ $selected, theme, $colorTheme }) => ($selected ? theme.palette[$colorTheme][100] : "initial")};
    &:hover {
        background-color: ${({ theme, $selected, $colorTheme }) =>
            $selected ? theme.palette[$colorTheme][500] : `${theme.palette[$colorTheme][100]}14`};
    }
    > * {
        color: ${({ theme }) => theme.palette.primary[500]};
        ${({ $selected, theme, $colorTheme }) =>
            $selected &&
            css`
                color: ${theme.palette[$colorTheme][10]};
            `};
        vertical-align: sub;
    }
`;

type Props = EnishiUIProps<{
    onClick?: () => void;
    selected?: boolean;
    colorTheme?: ColorTheme;
}>;

export const ToggleButton: React.FC<Props> = ({ selected = false, colorTheme = "primary", children, ...props }) => (
    <Ripple
        component={
            <Host $colorTheme={colorTheme} $selected={selected} {...props}>
                {children}
            </Host>
        }
    />
);
