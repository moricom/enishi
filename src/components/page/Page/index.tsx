import React from "react";

import { styled } from "styled-components";

import { LinearLayout } from "@/enishi-ui/components/layout/LinearLayout";

const Host = styled(LinearLayout)``;

type Props = React.ComponentPropsWithRef<typeof LinearLayout>;

export const Page: React.FC<Props> = ({ className, children, ...props }) => (
    <Host className={className} fullWidth orientation="vertical" {...props}>
        {children}
    </Host>
);
