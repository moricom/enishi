import React from "react";

import { css, styled } from "styled-components";

import { Typography } from "@/enishi-ui/components/dataDisplay/Typography";
import type { ColorTheme, EnishiUIProps } from "@/enishi-ui/components/type";

const Host = styled.a<{ $underline: boolean; $color?: string; $colorTheme: ColorTheme }>`
    color: initial;
    text-decoration: none;
    cursor: pointer;
    transition: all ${({ theme: { transitions } }) => `${transitions.duration.short} ${transitions.easing.easeOut}`};
    & > * {
        position: relative;
        display: flex;
        justify-content: center;
        transition: all ${({ theme: { transitions } }) => `${transitions.duration.short} ${transitions.easing.easeOut}`};
        color: ${({ theme, $color }) => $color ?? theme.palette.text.secondary};
        white-space: nowrap;
        &:hover {
            color: ${({ theme, $color, $colorTheme }) => $color ?? theme.palette[$colorTheme][500]};
            &::after {
                width: 100%;
            }
        }

        ${({ $underline }) =>
            $underline &&
            css`
                &::before {
                    content: "";
                    display: flex;
                    height: 1px;
                    position: absolute;
                    bottom: 0;
                    background: ${({ theme }) => theme.palette.grey[400]};
                    width: 100%;
                }
            `};
        &::after {
            content: "";
            display: flex;
            height: 1px;
            position: absolute;
            bottom: 0;
            background: ${({ theme, $colorTheme: colorTheme }) => theme.palette[colorTheme][100]};
            width: 0%;
            transition: all ${({ theme: { transitions } }) => `${transitions.duration.shorter} ${transitions.easing.easeOut}`};
            z-index: 1;
        }
    }
`;

type Props = EnishiUIProps<{
    to: string;
    newTab?: boolean;
    underline?: boolean;
    variant?: React.ComponentPropsWithRef<typeof Typography>["variant"];
    colorTheme?: ColorTheme;
    color?: string;
}>;

export const Link: React.FC<Props> = ({
    to,
    colorTheme = "primary",
    newTab = false,
    underline = false,
    variant = "button",
    color,
    children,
    ...props
}) => (
    <Host
        $color={color}
        $colorTheme={colorTheme}
        $underline={underline}
        href={to}
        rel={newTab ? "noopener noreferrer" : undefined}
        target={newTab ? "_blank" : undefined}
        {...props}
    >
        <Typography color={color} variant={variant}>
            {children}
        </Typography>
    </Host>
);
