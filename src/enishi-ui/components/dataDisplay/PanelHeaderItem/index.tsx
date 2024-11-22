import React from "react";

import { styled } from "styled-components";

import { Typography } from "@/enishi-ui/components/dataDisplay/Typography";
import { LinearLayout } from "@/enishi-ui/components/layout/LinearLayout";

const Host = styled(LinearLayout)<{ $width?: string }>`
    && {
        width: ${({ $width: width }) => width ?? "initial"};
        min-width: ${({ $width: width }) => width ?? "initial"};
        padding: 0 0.5rem;
        box-sizing: border-box;
    }
`;

type Props = React.ComponentPropsWithRef<typeof LinearLayout> & {
    readonly width?: string;
};

export const PanelHeaderItem: React.FC<Props> = ({ width, children, ...props }) => (
    <Host $width={width} {...props}>
        {typeof children === "string" ? (
            <Typography colorTheme="secondary" fontWeight="bold" variant="body2">
                {children}
            </Typography>
        ) : (
            children
        )}
    </Host>
);
