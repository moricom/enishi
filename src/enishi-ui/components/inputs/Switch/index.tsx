import React from "react";

import { styled } from "styled-components";

import type { ColorTheme, Size, enishiUIProps } from "@/enishi-ui/components/type";

const sizes = {
    "x-small": {
        slider: {
            width: "2.5rem",
            height: "1.3rem"
        },
        circle: {
            width: "1rem",
            height: "1rem",
            marginLeftAndRight: "0.15rem"
        }
    },
    "small": {
        slider: {
            width: "3rem",
            height: "1.3rem"
        },
        circle: {
            width: "1.05rem",
            height: "1.05rem",
            marginLeftAndRight: "0.15rem"
        }
    },
    "medium": {
        slider: {
            width: "3rem",
            height: "1.5rem"
        },
        circle: {
            width: "1.15rem",
            height: "1.15rem",
            marginLeftAndRight: "0.2rem"
        }
    },
    "large": {
        slider: {
            width: "3.8rem",
            height: "1.7rem"
        },
        circle: {
            width: "1.25rem",
            height: "1.25rem",
            marginLeftAndRight: "0.3rem"
        }
    },
    "x-large": {
        slider: {
            width: "4rem",
            height: "2rem"
        },
        circle: {
            width: "1.4rem",
            height: "1.4rem",
            marginLeftAndRight: "0.3rem"
        }
    }
};

const Host = styled.div<{ $size: Size }>`
    display: block;
    position: relative;
    cursor: pointer;
`;

const Slider = styled.span<{ $colorTheme: ColorTheme; $size: Size; $checked: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${({ $size }) => sizes[$size].slider.width};
    height: ${({ $size }) => sizes[$size].slider.height};
    border-radius: 1rem;
    background-color: ${({ theme, $colorTheme, $checked }) => ($checked ? theme.palette[$colorTheme][100] : theme.palette.grey[50])};
`;

const Circle = styled.span<{ $checked: boolean; $size: Size }>`
    display: block;
    box-sizing: border-box;
    position: absolute;
    margin: ${({ $size }) => `0 ${sizes[$size].circle.marginLeftAndRight}`};
    height: ${({ $size }) => sizes[$size].circle.height};
    width: ${({ $size }) => sizes[$size].circle.width};
    border-radius: 50%;
    transition: all 0.3s ease-out;
    background-color: ${({ theme }) => (theme.mode === "light" ? theme.palette.background[30] : theme.palette.background[1000])};
    left: ${({ $checked, $size }) =>
        $checked ? `calc(100% - ${sizes[$size].circle.width} - ${sizes[$size].circle.marginLeftAndRight} * 2)` : "0"};
`;

type Props = enishiUIProps<{
    checked?: boolean;
}>;

export const Switch: React.FC<Props> = ({ colorTheme = "primary", size = "medium", checked = false, ...props }) => (
    <Host $size={size} {...props}>
        <Slider $checked={checked} $colorTheme={colorTheme} $size={size}>
            <Circle $checked={checked} $size={size} />
        </Slider>
    </Host>
);
