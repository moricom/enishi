import React from "react";

import { styled } from "styled-components";

import { CardTitle } from "@/enishi-ui/components/dataDisplay/CardTitle";
import { LinearLayout } from "@/enishi-ui/components/layout/LinearLayout";

type Size = "large" | "medium";
const Host = styled(LinearLayout)<{ size: Size }>`
    padding: ${({ size }) => (size === "medium" ? "0.5rem 1rem 0.3rem" : "1rem 1.5rem 0.5rem")};
`;

type Props = React.ComponentPropsWithRef<typeof LinearLayout> & {
    readonly size?: Size;
    readonly onClose?: () => void;
};

export const CardHeader: React.FC<Props> = ({ size = "medium", children, ...props }) => (
    <Host gravity="center_left" orientation="horizontal" size={size} {...props}>
        {typeof children === "string" ? <CardTitle variant={size === "large" ? "h4" : "h6"}>{children}</CardTitle> : children}
    </Host>
);
