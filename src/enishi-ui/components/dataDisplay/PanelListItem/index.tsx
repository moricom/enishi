import React from "react";

import { css, styled } from "styled-components";

import { Ripple } from "@/enishi-ui/components/effect/Ripple";
import type { ColorTheme, EnishiUIProps } from "@/enishi-ui/components/type";
import { useHandleEnterKeyDown } from "@/enishi-ui/hooks/useHandleEnterKeyDown";

const disabledStyle = css`
    && {
        opacity: 0.6;
    }
`;

const Host = styled.div<{
    $colorTheme: ColorTheme;
    $width?: string;
    $button: boolean;
    $disabled: boolean;
    $selected: boolean;
    $fullWidth?: boolean;
    $flat: boolean;
}>`
    transition: all ${({ theme: { transitions } }) => `${transitions.duration.shorter} ${transitions.easing.easeOut}`};
    box-shadow: ${({ theme, $flat: flat }) => (flat ? theme.shadows[0] : theme.shadows[1])};
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0.6rem 1rem;
    background-color: ${({ theme }) => theme.palette.background[50]};
    min-height: 3rem;
    width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "initial")};
    border: 1px solid ${({ theme }) => theme.palette.grey[10]};
    &:not([data-panel-list-item-selected="true"]) + & {
        border-top: none;
    }
    &:first-of-type {
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem;
    }
    &:last-of-type {
        border-bottom-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
    }
    ${({ $disabled }) => $disabled && disabledStyle}
    ${({ $selected, theme, $colorTheme }) =>
        $selected &&
        css`
            &&& {
                margin-top: 0.2rem;
                margin-bottom: 0.2rem;
                border-radius: 0.5rem;
                border: 1px solid ${theme.palette[$colorTheme][100]};
            }
        `}
    ${({ $button, theme }) =>
        $button &&
        css`
            && {
                cursor: pointer;
                &:hover {
                    background-color: ${theme.palette.action.hover(theme.palette.background[10])};
                }
            }
        `};
`;

type Props = EnishiUIProps<{
    button?: boolean;
    disabled?: boolean;
    selected?: boolean;
    fullWidth?: boolean;
    flat?: boolean;
}>;

const PanelListItemHost = (
    {
        button = false,
        disabled = false,
        selected = false,
        fullWidth = false,
        children,
        onClick,
        flat = false,
        colorTheme = "primary",
        ...props
    }: Props,
    ref: React.ForwardedRef<HTMLDivElement>
) => {
    const handleKeyDown = useHandleEnterKeyDown(onClick);

    return (
        <Ripple
            colorTheme={colorTheme}
            component={
                <Host
                    $button={button}
                    $colorTheme={colorTheme}
                    $disabled={disabled}
                    $flat={flat}
                    $fullWidth={fullWidth}
                    $selected={selected}
                    data-panel-list-item-selected={selected}
                    onClick={onClick}
                    onKeyDown={handleKeyDown}
                    ref={ref}
                    role="button"
                    tabIndex={0}
                    {...props}
                >
                    {children}
                </Host>
            }
            disabled={!button}
        />
    );
};

export const PanelListItem = React.forwardRef<HTMLDivElement, Props>(PanelListItemHost);
