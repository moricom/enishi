import React from "react";

import { styled } from "styled-components";

import type { ColorTheme, enishiUIProps } from "@/enishi-ui/components/type";

const Host = styled.div<{ $fullWidth: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    margin: 0.2rem 1rem;
    min-width: 10rem;
    width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "initial")};
    height: 1.25rem;
    border: 1px solid ${({ theme }) => theme.palette.grey[50]};
    border-radius: 16px;
`;

const LineWrapper = styled.div`
    box-sizing: border-box;
    position: relative;
    margin: 0;
    height: 100%;
    width: 100%;
    transform: scale(0.99, 0.8);
`;

const Line = styled.div<{ $colorTheme: ColorTheme }>`
    position: absolute;
    height: 100%;
    background-image: linear-gradient(
        90deg,
        ${({ theme, $colorTheme }) => `${theme.palette[$colorTheme][50]}, ${theme.palette[$colorTheme][200]}`}
    );
    border-radius: 16px;
    transition: all ${({ theme: { transitions } }) => `${transitions.duration.short} ${transitions.easing.easeOut}`};
`;

type Props = enishiUIProps<{
    // 0 - 100
    progress: number;
    fullWidth?: boolean;
}>;

export const LinearProgress: React.FC<Props> = ({ progress, colorTheme = "primary", fullWidth = false, ...props }) => (
    <Host $fullWidth={fullWidth} {...props}>
        <LineWrapper>
            <Line $colorTheme={colorTheme} style={{ width: `${progress <= 100 ? progress : 100}%` }} />
        </LineWrapper>
    </Host>
);
