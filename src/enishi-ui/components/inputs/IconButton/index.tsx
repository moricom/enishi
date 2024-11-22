import React, { useCallback } from "react";

import { css, styled } from "styled-components";

import { Tooltip } from "@/enishi-ui/components/dataDisplay/Tooltip";
import { Ripple } from "@/enishi-ui/components/effect/Ripple";
import type { enishiUIProps } from "@/enishi-ui/components/type";

const sizes = {
    "x-small": {
        padding: "0.2rem",
        margin: "0.2rem",
        iconSize: "1rem"
    },
    "small": {
        padding: "0.3rem",
        margin: "0.2rem",
        iconSize: "1.3rem"
    },
    "medium": {
        padding: "0.4rem",
        margin: "0.2rem",
        iconSize: "1.3rem"
    },
    "large": {
        padding: "0.4rem",
        margin: "0.3rem",
        iconSize: "1.6rem"
    },
    "x-large": {
        padding: "0.8rem",
        margin: "0.5rem",
        iconSize: "1.8rem"
    }
};

type Variant = "contained" | "default";
type ColorTheme = "accent" | "error" | "info" | "primary" | "secondary" | "success" | "warning";

const Button = styled.button<{
    $colorTheme: ColorTheme;
    $checked: boolean;
    $circle: boolean;
    $noMargin: boolean;
    $variant: Variant;
    $size: keyof typeof sizes;
}>`
    all: unset;
    box-sizing: border-box;
    padding: ${({ $size }) => sizes[$size].padding};
    margin: ${({ $noMargin, $size }) => ($noMargin ? "0" : sizes[$size].margin)};
    border-radius: ${({ $circle }) => ($circle ? "50%" : "4px")};
    border: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all ${({ theme: { transitions } }) => `${transitions.duration.standard} ${transitions.easing.easeOut}`};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    background-color: transparent;
    &:hover {
        background-color: ${({ theme, $colorTheme }) => theme.palette.action.hover(theme.palette[$colorTheme][100])};
    }
    & > * {
        transition: all ${({ theme: { transitions } }) => `${transitions.duration.standard} ${transitions.easing.easeOut}`};
        color: ${({ theme, $colorTheme }) => theme.palette[$colorTheme][80]};
        vertical-align: sub;
        width: ${({ $size }) => sizes[$size].iconSize};
        height: ${({ $size }) => sizes[$size].iconSize};
    }
    &:hover > * {
        color: ${({ theme, $colorTheme }) => theme.palette[$colorTheme][300]};
    }
    ${({ theme, $checked, $colorTheme }) =>
        $checked
            ? css`
                  && {
                      background-color: ${theme.palette[$colorTheme][100]};
                      &:hover {
                          background-color: ${theme.palette[$colorTheme][200]};
                      }
                      > * {
                          color: ${theme.palette[$colorTheme][10]};
                      }
                      &:hover > * {
                          color: ${theme.palette[$colorTheme][10]};
                      }
                  }
              `
            : ""}
    ${({ theme, $variant, $checked, $colorTheme }) =>
        $variant === "contained"
            ? css`
                  && {
                      background-color: ${$checked ? theme.palette[$colorTheme][200] : theme.palette[$colorTheme][100]};
                      &:hover {
                          background-color: ${$checked ? theme.palette[$colorTheme][300] : theme.palette[$colorTheme][200]};
                      }
                      > * {
                          color: ${theme.palette[$colorTheme][10]};
                      }
                  }
              `
            : ""};
`;

type Props = enishiUIProps<{
    stopPropagation?: boolean;
    circle?: boolean;
    checked?: boolean;
    type?: "button" | "submit";
    size?: keyof typeof sizes;
    noMargin?: boolean;
    variant?: Variant;
    label?: string;
    colorTheme?: ColorTheme;
    buttonProps?: Partial<Omit<React.ComponentPropsWithRef<typeof Button>, "as"> & Record<`data-${string}`, string>>;
}>;

const IconButtonHost = (
    {
        onClick,
        stopPropagation,
        circle = false,
        checked = false,
        type = "button",
        size = "medium",
        noMargin = false,
        variant = "default",
        label,
        colorTheme = "info",
        children,
        buttonProps,
        ...props
    }: Props,
    ref: React.ForwardedRef<HTMLDivElement>
) => {
    const Host = useCallback<React.FC<{ children: React.ReactNode }>>(
        (p) => (label ? <Tooltip colorTheme={colorTheme} content={label} ref={ref} {...p} /> : <div ref={ref} {...p} />),
        [colorTheme, label, ref]
    );

    const handleClick = useCallback(
        (e: React.MouseEvent) => {
            if (stopPropagation) {
                e.stopPropagation();
            }
            void onClick?.();
        },
        [onClick, stopPropagation]
    );

    return (
        <Host {...props}>
            <Ripple
                colorTheme={colorTheme}
                component={
                    <Button
                        $checked={checked}
                        $circle={circle}
                        $colorTheme={colorTheme}
                        $noMargin={noMargin}
                        $size={size}
                        $variant={variant}
                        data-checked={checked}
                        onClick={handleClick}
                        type={type}
                        {...buttonProps}
                    >
                        {children}
                    </Button>
                }
                fixed={circle}
            />
        </Host>
    );
};

export const IconButton = React.forwardRef<HTMLDivElement, Props>(IconButtonHost);
