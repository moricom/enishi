import React from "react";

import { styled } from "styled-components";

import { Typography } from "@/enishi-ui/components/dataDisplay/Typography";
import type { Size, enishiUIProps } from "@/enishi-ui/components/type";

const sizes = {
    "x-small": {
        fontSize: "0.6rem",
        padding: "0 0.6rem",
        marginTop: "0.5rem"
    },
    "small": {
        fontSize: "0.7rem",
        padding: "0 0.8rem",
        marginTop: "0.5rem"
    },
    "medium": {
        fontSize: "0.8rem",
        padding: "0 1rem",
        marginTop: "0.5rem"
    },
    "large": {
        fontSize: "0.7rem",
        padding: "0 1rem",
        marginTop: "0.5rem"
    },
    "x-large": {
        fontSize: "0.8rem",
        padding: "0 1rem",
        marginTop: "0.5rem"
    }
};

const Host = styled.div<{ size: Size }>`
    && {
        padding: ${({ size }) => sizes[size].padding};
        margin-top: ${({ size }) => sizes[size].marginTop};
    }
`;

type Props = enishiUIProps<{
    typographyProps?: React.ComponentPropsWithRef<typeof Typography>;
}>;

export const MenuDivider: React.FC<Props> = ({ children, size = "medium", typographyProps, ...props }) => (
    <Host size={size} {...props}>
        {typeof children === "string" ? (
            <Typography colorTheme="secondary" fontSize={sizes[size].fontSize} {...typographyProps}>
                {children}
            </Typography>
        ) : (
            children
        )}
    </Host>
);
