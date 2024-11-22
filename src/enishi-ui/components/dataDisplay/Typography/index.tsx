import React from "react";

import { styled, useTheme } from "styled-components";

import type { EnishiUIProps } from "@/enishi-ui/components/type";

import type { DefaultTheme } from "styled-components";

type Gravity = "center" | "left" | "right";

type HostProps = {
    $color?: string;
    $fontSize: string;
    $fontWeight?: number;
    $lineHeight: number;
    $letterSpacing: string;
    $gravity: Gravity;
    $fullWidth: boolean;
    $nowrap: boolean;
};

const Host = styled.div<HostProps>`
    display: inline-flex;
    align-items: center;
    white-space: ${({ $nowrap }) => ($nowrap ? "nowrap" : "pre-wrap")};
    justify-content: ${({ $gravity }) =>
        // prettier-ignore
        $gravity === "left"   ? "flex-start"
      : $gravity === "center" ? "center"
      : $gravity === "right"  ? "flex-end"
      :                        "center"};
    font-weight: ${({ $fontWeight }) => $fontWeight ?? "initial"};
    ${({ $color }) => $color && `color: ${$color}`};
    font-size: ${({ $fontSize }) => $fontSize};
    line-height: ${({ $lineHeight }) => $lineHeight};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    letter-spacing: ${({ $letterSpacing }) => $letterSpacing};
    width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "initial")};
    transition: all ${({ theme: { transitions } }) => `${transitions.duration.standard} ${transitions.easing.easeOut}`};
`;

type ColorTheme = "accent" | "disabled" | "primary" | "secondary";
type Props = EnishiUIProps<{
    variant?: keyof DefaultTheme["typography"]["variant"];
    color?: string;
    colorTheme?: ColorTheme;
    gravity?: Gravity;
    fullWidth?: boolean;
    fontWeight?: keyof DefaultTheme["typography"]["fontWeight"];
    nowrap?: boolean;
    fontSize?: string;
    as?: "div" | "span";
}>;

export const Typography: React.FC<Props> = ({
    variant = "body1",
    color,
    colorTheme,
    gravity = "left",
    fullWidth = false,
    fontWeight,
    nowrap = false,
    fontSize,
    as = "div",
    children,
    size: _,
    ...props
}) => {
    const theme = useTheme();
    return (
        <Host
            $color={color ?? (colorTheme ? theme.palette.text[colorTheme] : undefined)}
            $fontSize={fontSize ?? theme.typography.variant[variant].fontSize}
            $fontWeight={fontWeight ? theme.typography.fontWeight[fontWeight] : undefined}
            $fullWidth={fullWidth}
            $gravity={gravity}
            $letterSpacing={theme.typography.variant[variant].letterSpacing}
            $lineHeight={theme.typography.variant[variant].lineHeight}
            $nowrap={nowrap}
            as={as}
            {...props}
        >
            {children}
        </Host>
    );
};
