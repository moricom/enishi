import React from "react";

import { styled } from "styled-components";

import { Typography } from "@/enishi-ui/components/dataDisplay/Typography";
import { LinearLayout } from "@/enishi-ui/components/layout/LinearLayout";

const sizes = {
    "x-small": {
        host: {
            padding: "0.3rem 0",
            fontSize: "0.8rem"
        },
        label: {
            marginBottom: "0.1rem",
            fontSize: "0.7rem"
        },
        iconSize: "1rem"
    },
    "small": {
        host: {
            padding: "0.4rem 0",
            fontSize: "0.9rem"
        },
        label: {
            marginBottom: "0.1rem",
            fontSize: "0.8rem"
        },
        iconSize: "1rem"
    },
    "medium": {
        host: {
            padding: "0.5rem 0",
            fontSize: "1rem"
        },
        label: {
            marginBottom: "0.4rem",
            fontSize: "0.8rem"
        },
        iconSize: "1rem"
    },
    "large": {
        host: {
            padding: "0.6rem 0",
            fontSize: "1.2rem"
        },
        label: {
            marginBottom: "0.4rem",
            fontSize: "0.8rem"
        },
        iconSize: "1rem"
    },
    "x-large": {
        host: {
            padding: "0.7rem 0",
            fontSize: "1.6rem"
        },
        label: {
            marginBottom: "0.4rem",
            fontSize: "0.9rem"
        },
        iconSize: "1rem"
    }
};

const Host = styled(LinearLayout)<{
    $size: keyof typeof sizes;
}>`
    && {
        padding: ${({ $size }) => sizes[$size].host.padding};
        font-size: ${({ $size }) => sizes[$size].host.fontSize};
    }
`;

const Header = styled(LinearLayout).attrs({
    orientation: "horizontal"
})<{
    $size: keyof typeof sizes;
}>`
    margin-bottom: ${({ $size }) => sizes[$size].label.marginBottom};
`;

const Label = styled(Typography)<{
    $size: keyof typeof sizes;
}>`
    && {
        white-space: nowrap;
        font-size: ${({ $size }) => sizes[$size].label.fontSize};
    }
`;

const IconContainer = styled.div<{ $size: keyof typeof sizes }>`
    display: flex;
`;

type Props = React.ComponentPropsWithRef<typeof LinearLayout> & {
    readonly label?: string;
    readonly labelProps?: React.ComponentPropsWithRef<typeof Typography>;
    readonly size?: keyof typeof sizes;
    readonly fontWeight?: React.ComponentPropsWithRef<typeof Typography>["fontWeight"];
    readonly labelButton?: React.ReactNode | null;
};

export const LabeledDataItem: React.FC<Props> = ({ label, children, labelProps, size = "medium", fontWeight, labelButton, ...props }) => (
    <Host $size={size} orientation="vertical" {...props}>
        <Header $size={size} gravity="center">
            <Label $size={size} colorTheme="secondary" fontWeight={fontWeight} variant="caption" {...labelProps}>
                {label}
            </Label>
            {labelButton ? <IconContainer $size={size}>{labelButton}</IconContainer> : null}
        </Header>
        {children}
    </Host>
);
