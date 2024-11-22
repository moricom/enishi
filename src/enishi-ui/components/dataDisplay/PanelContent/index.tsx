import React from "react";

import { styled } from "styled-components";

import { LinearLayout } from "@/enishi-ui/components/layout/LinearLayout";

const Host = styled(LinearLayout)``;

type Props = React.ComponentPropsWithRef<typeof LinearLayout>;

export const PanelContent: React.FC<Props> = ({ children, ...props }) => (
    <Host orientation="vertical" {...props}>
        {children}
    </Host>
);
