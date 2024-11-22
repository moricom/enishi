import React from "react";

import { styled } from "styled-components";

import { Skeleton } from "@/enishi-ui/components/feedback/Skeleton";
import type { enishiUIProps } from "@/enishi-ui/components/type";

const sizes = {
    "x-small": {
        width: "6rem",
        height: "1.3rem"
    },
    "small": {
        width: "6rem",
        height: "1.4rem"
    },
    "medium": {
        width: "8rem",
        height: "1.8rem"
    },
    "large": {
        width: "9rem",
        height: "2.4rem"
    },
    "x-large": {
        width: "10rem",
        height: "3rem"
    }
};

const Host = styled.div<{ $backgroundColor?: string; $button: boolean; $size: keyof typeof sizes }>`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    min-width: ${({ $size }) => sizes[$size].width};
    width: fit-content;
    height: ${({ $size }) => sizes[$size].height};
    border-radius: 1rem;
    background-color: ${({ theme, $backgroundColor }) => $backgroundColor ?? theme.palette.background[10]};
    cursor: ${({ $button }) => ($button ? "pointer" : "default")};
`;

type Props = enishiUIProps<{
    backgroundColor?: string;
    button: boolean;
    loading?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
    role?: string;
    tabIndex?: number;
    size?: keyof typeof sizes;
}>;

export const NormalChipHost: React.FC<Props> = ({ loading, button, size = "medium", colorTheme: _, backgroundColor, ...props }) => {
    if (loading) {
        return <Skeleton borderRadius="1rem" height={sizes[size].height} noPadding width={sizes[size].width} />;
    }
    return <Host $backgroundColor={backgroundColor} $button={button} $size={size} {...props} />;
};
