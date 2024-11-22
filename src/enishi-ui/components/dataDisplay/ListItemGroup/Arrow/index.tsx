import React from "react";

import { css, styled } from "styled-components";

import type { enishiUIProps } from "@/enishi-ui/components/type";

const sizes = {
    "x-small": "0.6rem",
    "small": "0.8rem",
    "medium": "1rem",
    "large": "1.2rem",
    "x-large": "1.4rem"
};

const ArrowIcon = styled.div`
    overflow: hidden;
    background-color: transparent;
    margin: 0 auto;
    border-radius: 20%;
    transform: translateY(0) rotate(120deg) skewY(30deg) scale(0.866, 1);
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    &,
    &::before,
    &::after {
        box-sizing: border-box;
    }
    &::before,
    &::after {
        position: absolute;
        content: "";
        background-color: ${({ theme }) => theme.palette.primary[500]};
        width: 100%;
        height: 100%;
    }
    &::before {
        border-radius: 20% 20% 20% 53%;
        transform: scaleX(1.155) skewY(-30deg) rotate(-30deg) translateY(-42.3%) skewX(30deg) scaleY(0.866) translateX(-24%);
    }
    &::after {
        border-radius: 20% 20% 53% 20%;
        transform: scaleX(1.155) skewY(-30deg) rotate(-30deg) translateY(-42.3%) skewX(-30deg) scaleY(0.866) translateX(24%);
    }
`;

const ShrinkHorizontal = styled.div`
    transform: scaleX(0.6) translate(-0.2rem, 0);
    width: 100%;
    height: 100%;
`;

const openedHostCss = css`
    && {
        transform: rotate(90deg);
    }
`;

const Host = styled.div<{ open: boolean; size: keyof typeof sizes }>`
    position: relative;
    transition: all ${({ theme: { transitions } }) => `${transitions.duration.shortest} ${transitions.easing.easeOut}`};
    transform-origin: center;
    width: ${({ size }) => sizes[size]};
    height: ${({ size }) => sizes[size]};
    padding: 0.1rem;
    box-sizing: border-box;
    ${({ open }) => open && openedHostCss}
`;

type Props = enishiUIProps<{
    open: boolean;
    size?: keyof typeof sizes;
}>;

export const Arrow: React.FC<Props> = ({ open, size = "medium", ...props }) => (
    <Host open={open} size={size} {...props}>
        <ShrinkHorizontal>
            <ArrowIcon />
        </ShrinkHorizontal>
    </Host>
);
