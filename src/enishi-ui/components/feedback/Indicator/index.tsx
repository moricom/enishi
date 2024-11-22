import React from "react";

import { css, keyframes, styled } from "styled-components";

import { LinearLayout } from "@/enishi-ui/components/layout/LinearLayout";
import type { ColorTheme, Size } from "@/enishi-ui/components/type";

const circleKeyframe = keyframes`
    0% {
        transform: rotateZ(0deg);
    }

    100% {
        transform: rotateZ(360deg);
    }
`;

const circularDashKeyframe = keyframes`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }
  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`;

const loadingCss = css`
    && {
        visibility: initial;
        animation: ${circleKeyframe} 2s linear infinite;
    }
`;

const sizes = {
    "x-small": {
        size: "0.8rem"
    },
    "small": {
        size: "1.2rem"
    },
    "medium": {
        size: "2rem"
    },
    "large": {
        size: "4rem"
    },
    "x-large": {
        size: "4.5rem"
    }
};

const HostSvg = styled.svg<{ $colorTheme: ColorTheme; $isLoading: boolean; $size: Size }>`
    width: ${({ $size }) => sizes[$size].size};
    height: ${({ $size }) => sizes[$size].size};
    color: ${({ $colorTheme, theme }) => theme.palette[$colorTheme][100]};
    visibility: hidden;
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    animation: none;
    > :nth-child(1) {
        stroke: currentcolor;
        stroke-dasharray: calc(${({ $size }) => sizes[$size].size} * 2), calc(${({ $size }) => sizes[$size].size} * 5);
        stroke-dashoffset: 0;
        animation: ${circularDashKeyframe} 1.4s ease-in-out infinite;
    }
    ${({ $isLoading }) => $isLoading && loadingCss};
`;

type Props = React.ComponentPropsWithRef<typeof LinearLayout> & {
    readonly loading?: boolean;
};

export const Indicator: React.FC<Props> = ({
    colorTheme = "primary",
    className,
    loading: isLoading = true,
    size = "medium",
    children,
    ...props
}) => (
    <LinearLayout gravity="center" {...props}>
        <HostSvg $colorTheme={colorTheme} $isLoading={isLoading} $size={size} className={className} viewBox="22 22 44 44">
            <circle cx="44" cy="44" fill="none" r="20.2" strokeWidth="3.6" />
        </HostSvg>
        {children}
    </LinearLayout>
);
