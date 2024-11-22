import React from "react";

import { styled } from "styled-components";

import { LinearLayout } from "@/enishi-ui/components/layout/LinearLayout";

const Host = styled(LinearLayout)`
    && {
        padding: 1rem;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
    }
`;

type Props = React.ComponentPropsWithRef<typeof LinearLayout>;

export const DialogActions: React.FC<Props> = ({ children, ...props }) => <Host {...props}>{children}</Host>;
