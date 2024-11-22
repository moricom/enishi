import React, { useCallback } from "react";

import { css, styled } from "styled-components";

import type { ColorTheme, enishiUIProps } from "@/enishi-ui/components/type";
import { useHandleEnterKeyDown } from "@/enishi-ui/hooks/useHandleEnterKeyDown";

import type { DefaultTheme } from "styled-components";

type Variant = "default" | "outlined";

const getCheckMarkColor = (variant: Variant, theme: DefaultTheme, colorTheme: ColorTheme) =>
    variant === "outlined" ? theme.palette[colorTheme][100] : theme.palette.background[10];

type HostProps = {
    $colorTheme: ColorTheme;
    $checked: boolean;
    $checkMarkColor?: string;
    $noMargin?: boolean;
    $circle?: boolean;
    $variant: Variant;
};
const Host = styled.span<HostProps>`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    max-width: 1.1rem;
    min-width: 1.1rem;
    max-height: 1.1rem;
    min-height: 1.1rem;
    margin: ${({ $noMargin }) => ($noMargin ? "0" : "0.25rem 0.5rem")};
    border: 1.5px solid ${({ theme, $colorTheme }) => theme.palette[$colorTheme][100]};
    border-radius: ${({ $circle }) => ($circle ? "50%" : "4px")};
    cursor: pointer;
    transition: all ${({ theme: { transitions } }) => `${transitions.duration.standard} ${transitions.easing.easeOut}`};
    &::before {
        content: "";
        display: inline-block;
        width: 0.3125rem;
        height: 0.7rem;
        border-bottom: 0.125rem solid
            ${({ theme, $variant, $checkMarkColor, $colorTheme }) => $checkMarkColor ?? getCheckMarkColor($variant, theme, $colorTheme)};
        border-right: 0.125rem solid
            ${({ theme, $variant, $checkMarkColor, $colorTheme }) => $checkMarkColor ?? getCheckMarkColor($variant, theme, $colorTheme)};
        transform: translate(0.4rem, -0rem) rotateZ(45deg) scale(0, 0);
        transform-origin: center;
        transition: all ${({ theme: { transitions } }) => `${transitions.duration.shorter} ${transitions.easing.easeOut}`};
    }
    &::after {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: ${({ theme, $colorTheme }) => theme.palette[$colorTheme][10]};
        transition: all ${({ theme: { transitions } }) => `${transitions.duration.shorter} ${transitions.easing.easeOut}`};
        z-index: -1;
    }
    &:hover {
        background-color: ${({ theme, $colorTheme }) => theme.palette[$colorTheme][10]};
        &::after {
            width: 2rem;
            height: 2rem;
        }
    }
    ${({ $checked, $colorTheme, $variant, theme }) =>
        $checked &&
        css`
            background-color: ${$variant === "outlined" ? "transparent" : theme.palette[$colorTheme][100]};
            &::before {
                transform: translate(0rem, -0.1rem) rotateZ(45deg) scale(1, 1);
            }
            &:hover {
                background-color: ${$variant === "outlined" ? theme.palette[$colorTheme][10] : theme.palette[$colorTheme][200]};
            }
        `}
`;

type Props = enishiUIProps<{
    checked: boolean;
    checkMarkColor?: string;
    noMargin?: boolean;
    circle?: boolean;
    variant?: "default" | "outlined";
    onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
    onClick?: (checked: boolean) => void;
    stopPropagation?: boolean;
    colorTheme?: ColorTheme;
}>;

export const Checkbox: React.FC<Props> = ({
    children,
    stopPropagation,
    colorTheme = "primary",
    variant = "default",
    checked,
    onClick,
    circle,
    noMargin,
    ...props
}) => {
    const handleEnterKeyDown = useHandleEnterKeyDown();

    const handleClick = useCallback(
        (e: React.MouseEvent) => {
            if (stopPropagation) {
                e.stopPropagation();
            }
            onClick?.(!checked);
        },
        [checked, onClick, stopPropagation]
    );

    return (
        <Host
            $checked={checked}
            $circle={circle}
            $colorTheme={colorTheme}
            $noMargin={noMargin}
            $variant={variant}
            data-test-checked={checked}
            onClick={handleClick}
            onKeyDown={handleEnterKeyDown}
            role="button"
            tabIndex={0}
            {...props}
        >
            {children}
        </Host>
    );
};
