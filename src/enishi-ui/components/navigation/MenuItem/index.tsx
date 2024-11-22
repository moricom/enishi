import React from "react";

import { styled } from "styled-components";

import { ListItem } from "@/enishi-ui/components/dataDisplay/ListItem";
import { Typography } from "@/enishi-ui/components/dataDisplay/Typography";

const sizes = {
    "x-small": {
        fontSize: "0.8rem",
        padding: "0 0.6rem"
    },
    "small": {
        fontSize: "0.9rem",
        padding: "0 0.8rem"
    },
    "medium": {
        fontSize: "1rem",
        padding: "0 1rem"
    },
    "large": {
        fontSize: "1rem",
        padding: "0 1rem"
    },
    "x-large": {
        fontSize: "1.1rem",
        padding: "0 1rem"
    }
};

const Host = styled(ListItem)`
    && {
        padding: ${({ size }) => (size ? sizes[size].padding : sizes.medium.padding)};
    }
`;

type Props = React.ComponentPropsWithRef<typeof ListItem> & {
    readonly typographyProps?: React.ComponentPropsWithRef<typeof Typography>;
};

export const MenuItem: React.FC<Props> = ({ children, size = "medium", typographyProps, ...props }) => (
    <Host button size={size} {...props}>
        {typeof children === "string" ? (
            <Typography fontSize={sizes[size].fontSize} {...typographyProps}>
                {children}
            </Typography>
        ) : (
            children
        )}
    </Host>
);
