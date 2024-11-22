import React from "react";

import { styled, useTheme } from "styled-components";

import { Typography } from "@/enishi-ui/components/dataDisplay/Typography";
import type { enishiUIProps } from "@/enishi-ui/components/type";

const sizes = {
    "x-small": {
        marginBottom: "0.2rem",
        top: "0.3rem",
        left: "0.6rem",
        fontSize: "0.7rem"
    },
    "small": {
        marginBottom: "0.3rem",
        top: "0.45rem",
        left: "0.6rem",
        fontSize: "0.8rem"
    },
    "medium": {
        marginBottom: "0.5rem",
        top: "0.65rem",
        left: "0.6rem",
        fontSize: "1rem"
    },
    "large": {
        marginBottom: "0.5rem",
        top: "0.65rem",
        left: "0.6rem",
        fontSize: "1rem"
    },
    "x-large": {
        marginBottom: "0.5rem",
        top: "0.65rem",
        left: "0.6rem",
        fontSize: "1rem"
    }
};

const Host = styled.div<{ $size: keyof typeof sizes; $empty: boolean; $focused: boolean; $withPlaceholder: boolean }>`
    display: inline-block;
    position: absolute;
    margin-bottom: ${({ $size }) => sizes[$size].marginBottom};
    transition: all ${({ theme: { transitions } }) => `${transitions.duration.standard} ${transitions.easing.easeOut}`};
    top: ${({ $size }) => sizes[$size].top};
    left: ${({ $size }) => sizes[$size].left};
    ${({ $empty, $withPlaceholder, $focused }) =>
        !$empty || ($empty && $focused) || $withPlaceholder ? "transform: translateX(-18%) translateY(-50%) scale(0.65);" : ""}
`;

type Props = enishiUIProps<{
    invalid: boolean;
    empty: boolean;
    focused: boolean;
    withPlaceholder?: boolean;
    size?: keyof typeof sizes;
}>;

export const FormItemLabelText: React.FC<Props> = ({
    invalid,
    empty,
    focused,
    withPlaceholder = false,
    children,
    size = "medium",
    ...props
}) => {
    const theme = useTheme();
    const color =
        // prettier-ignore
        focused       ? theme.palette.primary[200]
      : invalid       ? theme.palette.error[200]
      :                 theme.palette.text.secondary;
    return (
        <Host $empty={empty} $focused={focused} $size={size} $withPlaceholder={withPlaceholder} {...props}>
            <Typography color={color} fontSize={sizes[size].fontSize} variant="body1">
                {children}
            </Typography>
        </Host>
    );
};
