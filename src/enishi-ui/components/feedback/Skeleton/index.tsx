import React from "react";

import { keyframes, styled } from "styled-components";

import type { enishiUIProps } from "@/enishi-ui/components/type";

const rippleKeyframes = keyframes`
    0% {
        transform:translateX(-100%);
    }
    50%{
        transform:translateX(100%);
    }
    100%{
        transform:translateX(100%)
    }
`;

const Animation = styled.div<{ $borderRadius: string; $noPadding: boolean }>`
    position: absolute;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.12);
    border-radius: ${({ $borderRadius }) => $borderRadius};
    width: ${({ $noPadding }) => ($noPadding ? "100%" : "calc(100% - 0.4rem)")};
    height: ${({ $noPadding }) => ($noPadding ? "100%" : "calc(100% - 0.4rem)")};
    overflow: hidden;
    &::after {
        position: absolute;
        display: block;
        content: " ";
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        animation: 1.4s linear 0s infinite normal none running ${rippleKeyframes};
        transform: translateX(-100%);
        inset: 0px;
    }
`;

const Host = styled.div<{
    $minWidth?: string;
    $minHeight?: string;
    $width?: string;
    $height?: string;
    $fullWidth?: boolean;
    $fullHeight?: boolean;
    $noPadding?: boolean;
}>`
    min-width: ${({ $minWidth, $fullWidth }) => $minWidth ?? ($fullWidth ? "100%" : "initial")};
    min-height: ${({ $minHeight, $fullHeight }) => $minHeight ?? ($fullHeight ? "100%" : "initial")};
    width: ${({ $width: width, $fullWidth }) => width ?? ($fullWidth ? "100%" : "100%")};
    height: ${({ $height: height, $fullHeight }) => height ?? ($fullHeight ? "100%" : "2.5rem")};
    padding: ${({ $noPadding }) => ($noPadding ? "initial" : "0.2rem 0.2rem")};
    box-sizing: border-box;
    position: relative;
`;

type Props = enishiUIProps<{
    minWidth?: string;
    minHeight?: string;
    width?: string;
    height?: string;
    children?: React.ReactNode;
    fullWidth?: boolean;
    fullHeight?: boolean;
    noPadding?: boolean;
    circle?: boolean;
    borderRadius?: string;
}>;

export const Skeleton: React.FC<Props> = ({
    children,
    circle = false,
    borderRadius = circle ? "50%" : "4px",
    noPadding,
    width,
    height,
    minWidth,
    minHeight,
    fullWidth,
    fullHeight,
    colorTheme: _,
    ...props
}) => (
    <Host
        $fullHeight={fullHeight}
        $fullWidth={fullWidth}
        $height={height}
        $minHeight={minHeight}
        $minWidth={minWidth}
        $noPadding={noPadding}
        $width={width}
        {...props}
    >
        <Animation $borderRadius={borderRadius} $noPadding={noPadding ?? false} />
        {children}
    </Host>
);
