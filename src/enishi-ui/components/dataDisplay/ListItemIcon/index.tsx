import React from "react";

import { styled } from "styled-components";

import type { enishiUIProps } from "@/enishi-ui/components/type";

const sizes = {
    "x-small": {
        padding: "0 0.4rem",
        marginRight: "0.2rem",
        fontSize: "1rem",
        iconSize: "1.1rem"
    },
    "small": {
        padding: "0 0.4rem",
        marginRight: "0.2rem",
        fontSize: "1.3rem",
        iconSize: "1.2rem"
    },
    "medium": {
        padding: "0 0.4rem",
        marginRight: "0.2rem",
        fontSize: "1.4rem",
        iconSize: "1.5rem"
    },
    "large": {
        padding: "0 0.6rem",
        marginRight: "0.2rem",
        fontSize: "1.6rem",
        iconSize: "1.5rem"
    },
    "x-large": {
        padding: "0 0.8rem",
        marginRight: "0.2rem",
        fontSize: "1.8rem",
        iconSize: "1.5rem"
    }
};

const Host = styled.div<{ $size: keyof typeof sizes; $noPadding?: boolean; $noMargin?: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${({ $size, $noPadding }) => ($noPadding ? "0" : sizes[$size].padding)};
    margin-right: ${({ $size: size, $noMargin }) => ($noMargin ? "0" : sizes[size].marginRight)};
    font-size: ${({ $size }) => sizes[$size].fontSize};
    width: ${({ $size }) => sizes[$size].iconSize};
    height: ${({ $size }) => sizes[$size].iconSize};
    > * {
        width: ${({ $size }) => sizes[$size].iconSize};
        height: ${({ $size }) => sizes[$size].iconSize};
    }
`;

type Props = enishiUIProps<{
    size?: keyof typeof sizes;
    noPadding?: boolean;
    noMargin?: boolean;
}>;

export const ListItemIcon: React.FC<Props> = ({ size = "medium", noPadding, children, ...props }) => (
    <Host $noPadding={noPadding} $size={size} {...props}>
        {children}
    </Host>
);
