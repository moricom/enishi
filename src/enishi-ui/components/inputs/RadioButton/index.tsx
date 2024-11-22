import React, { useCallback } from "react";

import { styled } from "styled-components";

import type { ColorTheme, Size, enishiUIProps } from "@/enishi-ui/components/type";
import { useHandleEnterKeyDown } from "@/enishi-ui/hooks/useHandleEnterKeyDown";

const sizes = {
    "x-small": {
        hostSize: "0.9rem"
    },
    "small": {
        hostSize: "1.1rem"
    },
    "medium": {
        hostSize: "1.25rem"
    },
    "large": {
        hostSize: "1.4rem"
    },
    "x-large": {
        hostSize: "1.5rem"
    }
};

const Host = styled.div<{ $disabled: boolean; $colorTheme: ColorTheme; $size: Size }>`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    min-width: ${({ $size }) => sizes[$size].hostSize};
    width: ${({ $size }) => sizes[$size].hostSize};
    max-width: ${({ $size }) => sizes[$size].hostSize};
    min-height: ${({ $size }) => sizes[$size].hostSize};
    height: ${({ $size }) => sizes[$size].hostSize};
    max-height: ${({ $size }) => sizes[$size].hostSize};
    position: relative;
    border-radius: 50%;
    border: 2px solid ${({ $disabled, theme, $colorTheme }) => ($disabled ? theme.palette.grey[200] : theme.palette[$colorTheme][100])};
    transition: all ${({ theme: { transitions } }) => `${transitions.duration.standard} ${transitions.easing.easeOut}`};
    cursor: ${({ $disabled }) => ($disabled ? "initial" : "pointer")};
    background-color: transparent;
    flex-shrink: 0;
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
            width: ${({ $size }) => `calc(${sizes[$size].hostSize} * 1.8)`};
            height: ${({ $size }) => `calc(${sizes[$size].hostSize} * 1.8)`};
        }
    }
`;

const Circle = styled.div<{ $disabled: boolean; $checked: boolean; $colorTheme: ColorTheme; $size: keyof typeof sizes }>`
    display: flex;
    min-width: 100%;
    width: 100%;
    max-width: 100%;
    min-height: 100%;
    height: 100%;
    max-height: 100%;
    border-radius: 50%;
    transition: all ${({ theme: { transitions } }) => `${transitions.duration.standard} ${transitions.easing.easeOut}`};
    margin: auto;
    position: relative;
    box-sizing: border-box;
    background-color: ${({ theme, $colorTheme, $disabled }) =>
        $disabled ? theme.palette[$colorTheme][10] : theme.palette[$colorTheme][100]};
    transform: ${({ $checked }) => ($checked ? "scale(0.7, 0.7)" : "scale(0, 0)")};
`;

type Props = enishiUIProps<{
    checked?: boolean;
    onCheck?: () => void;
    colorTheme?: ColorTheme;
    disabled?: boolean;
    size?: Size;
}>;

export const RadioButton: React.FC<Props> = ({
    checked = false,
    onCheck,
    colorTheme = "primary",
    disabled = false,
    size = "medium",
    ...props
}) => {
    const handleClick = useCallback(() => {
        if (!disabled) {
            onCheck?.();
        }
    }, [disabled, onCheck]);
    const handleEnterKeyDown = useHandleEnterKeyDown(handleClick);

    return (
        <Host
            $colorTheme={colorTheme}
            $disabled={disabled}
            $size={size}
            aria-checked
            onClick={handleClick}
            onKeyDown={handleEnterKeyDown}
            role="radio"
            tabIndex={0}
            {...props}
        >
            <Circle $checked={checked} $colorTheme={colorTheme} $disabled={disabled} $size={size} />
        </Host>
    );
};
