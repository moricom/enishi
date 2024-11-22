import React from "react";

import { styled } from "styled-components";

import { LinearLayout } from "@/enishi-ui/components/layout/LinearLayout";

const Host = styled(LinearLayout)`
    && {
        padding: 0.5rem 1rem 1rem;
    }
`;

type Props = React.ComponentPropsWithRef<typeof LinearLayout>;

export const CardContent: React.FC<Props> = ({ className, children, ...props }) => (
    <Host className={className} orientation="vertical" {...props}>
        {children}
    </Host>
);
