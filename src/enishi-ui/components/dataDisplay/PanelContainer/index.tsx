import React, { forwardRef } from "react";

import { styled } from "styled-components";

import type { enishiUIProps } from "@/enishi-ui/components/type";

const Host = styled.div`
    width: 100%;
    padding: 0 0.5rem;
    box-sizing: border-box;
`;

type Props = enishiUIProps;

const PanelContainerHost = ({ children, ...props }: Props, ref: React.Ref<HTMLDivElement>) => (
    <Host ref={ref} {...props}>
        {children}
    </Host>
);

export const PanelContainer = forwardRef(PanelContainerHost);
