import React from "react";

import { styled } from "styled-components";

import { LinearLayout } from "@/enishi-ui/components/layout/LinearLayout";

const Host = styled(LinearLayout)`
    && {
        border-radius: 3px;
        border: 1px solid ${({ theme }) => theme.palette.grey[400]};
        overflow: hidden;
        > :nth-child(n + 2) {
            border-left: 1px solid ${({ theme }) => theme.palette.grey[400]};
        }
    }
`;

type Props = React.ComponentPropsWithRef<typeof LinearLayout>;

export const ToggleButtonGroup: React.FC<Props> = ({ children, ...props }) => (
    <Host orientation="horizontal" {...props}>
        {children}
    </Host>
);
