import React from "react";

import { styled } from "styled-components";

import { LinearLayout } from "@/enishi-ui/components/layout/LinearLayout";

const Host = styled(LinearLayout)`
    && {
        padding: 1rem 1.5rem;
        box-sizing: border-box;
        position: relative;
        &::before {
            content: "";
            width: calc(100% - 2rem);
            left: 0;
            bottom: 0;
            position: absolute;
            margin: 0 1rem;
            box-sizing: border-box;
            background: ${({ theme }) => theme.palette.grey[50]};
            height: 1px;
        }
    }
`;

type Props = React.ComponentPropsWithRef<typeof LinearLayout>;

export const DialogHeader: React.FC<Props> = ({ children, ...props }) => (
    <Host gravity="center_left" {...props}>
        {children}
    </Host>
);
