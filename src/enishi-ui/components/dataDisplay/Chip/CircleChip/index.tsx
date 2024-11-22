import React, { useCallback } from "react";

import { css, styled } from "styled-components";

import { Tooltip } from "@/enishi-ui/components/dataDisplay/Tooltip";
import { Skeleton } from "@/enishi-ui/components/feedback/Skeleton";
import type { ColorTheme, Size, enishiUIProps } from "@/enishi-ui/components/type";
import { useHandleEnterKeyDown } from "@/enishi-ui/hooks/useHandleEnterKeyDown";

const sizes = {
    "x-small": {
        width: "1rem",
        height: "1rem",
        checkMarkScale: 0.85
    },
    "small": {
        width: "1.2rem",
        height: "1.2rem",
        checkMarkScale: 0.9
    },
    "medium": {
        width: "1.4rem",
        height: "1.4rem",
        checkMarkScale: 1
    },
    "large": {
        width: "1.6rem",
        height: "1.6rem",
        checkMarkScale: 1.1
    },
    "x-large": {
        width: "1.8rem",
        height: "1.8rem",
        checkMarkScale: 1.2
    }
};

const circleFlatStyle = css`
    box-shadow: ${({ theme }) => theme.shadows["0"]};
`;

const Circle = styled.div<{
    $backgroundColor?: string;
    $size: Size;
    $flat: boolean;
    $checked: boolean;
    $colorTheme: ColorTheme;
    $button: boolean;
}>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    min-width: ${({ $size }) => sizes[$size].width};
    width: ${({ $size }) => sizes[$size].width};
    max-width: ${({ $size }) => sizes[$size].width};
    min-height: ${({ $size }) => sizes[$size].height};
    height: ${({ $size }) => sizes[$size].height};
    max-height: ${({ $size }) => sizes[$size].height};
    border-radius: 50%;
    box-sizing: border-box;
    border: 1px solid ${({ theme, $backgroundColor }) => $backgroundColor ?? theme.palette.background[10]};
    background-color: ${({ theme, $backgroundColor }) => $backgroundColor ?? theme.palette.background[10]};
    box-shadow: ${({ theme }) => theme.shadows["2"]};
    cursor: pointer;
    ${({ $flat }) => $flat && circleFlatStyle};
    ${({ $checked, $size, $colorTheme, theme }) =>
        $checked &&
        css`
            &::before {
                content: "";
                display: flex;
                position: absolute;
                min-width: calc(${sizes[$size].width} + 2px);
                width: calc(${sizes[$size].width} + 2px);
                max-width: calc(${sizes[$size].width} + 2px);
                min-height: calc(${sizes[$size].height} + 2px);
                height: calc(${sizes[$size].height} + 2px);
                max-height: calc(${sizes[$size].height} + 2px);
                border: 1px solid ${theme.palette[$colorTheme][100]};
                border-radius: 50%;
            }
            &:hover {
                &::before {
                    border: 1px solid ${theme.palette[$colorTheme][400]} !important;
                }
            }
        `};
    ${({ $button, $size, theme, $colorTheme }) =>
        $button &&
        css`
            &:hover {
                &::before {
                    content: "";
                    display: flex;
                    position: absolute;
                    min-width: calc(${sizes[$size].width} + 2px);
                    width: calc(${sizes[$size].width} + 2px);
                    max-width: calc(${sizes[$size].width} + 2px);
                    min-height: calc(${sizes[$size].height} + 2px);
                    height: calc(${sizes[$size].height} + 2px);
                    max-height: calc(${sizes[$size].height} + 2px);
                    border: 1px solid ${theme.palette[$colorTheme][70]};
                    border-radius: 50%;
                }
            }
        `};
`;

const checkMarkCheckedStyle = css`
    &::before {
        transform: translate(0rem, -0.1rem) rotateZ(45deg) scale(1, 1);
    }
`;

const CheckMark = styled.div<{ $checked: boolean; $size: Size }>`
    display: flex;
    justify-content: center;
    align-items: center;
    transform: ${({ $size }) => `scale(${sizes[$size].checkMarkScale})`};
    &::before {
        content: "";
        display: inline-block;
        width: 0.3rem;
        height: 0.7rem;
        border-bottom: 0.125rem solid white;
        border-right: 0.125rem solid white;
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
        background: white;
        transition: all ${({ theme: { transitions } }) => `${transitions.duration.shorter} ${transitions.easing.easeOut}`};
        z-index: -1;
    }
    ${({ $checked }) => $checked && checkMarkCheckedStyle};
`;

type Props = enishiUIProps<{
    label: string;
    backgroundColor?: string;
    loading?: boolean;
    size?: Size;
    flat?: boolean;
    checked?: boolean;
    button?: boolean;
}>;

export const CircleChip: React.FC<Props> = ({
    label,
    backgroundColor,
    loading,
    size = "medium",
    onClick,
    flat = false,
    checked = false,
    colorTheme = "primary",
    button = false,
    ...props
}) => {
    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            void onClick?.();
        },
        [onClick]
    );
    const handleKeyDown = useHandleEnterKeyDown(onClick);

    if (loading) {
        return (
            <Skeleton
                circle
                colorTheme={colorTheme}
                height={sizes[size].height}
                minHeight={sizes[size].height}
                minWidth={sizes[size].width}
                noPadding
                width={sizes[size].width}
            />
        );
    }
    return (
        <Tooltip colorTheme={colorTheme} content={label} {...props}>
            <Circle
                $backgroundColor={backgroundColor}
                $button={button}
                $checked={checked}
                $colorTheme={colorTheme}
                $flat={flat}
                $size={size}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                role="button"
                tabIndex={0}
            >
                <CheckMark $checked={checked} $size={size} />
            </Circle>
        </Tooltip>
    );
};
