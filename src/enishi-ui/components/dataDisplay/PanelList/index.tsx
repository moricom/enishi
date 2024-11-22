import React from "react";

import { styled } from "styled-components";

import type { EnishiUIProps } from "@/enishi-ui/components/type";

const Host = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 0.5rem;
    padding: 0.1rem;
`;

type Props = EnishiUIProps;

const PanelListHost = ({ children, ...props }: Props, ref: React.ForwardedRef<HTMLDivElement>) => (
    <Host ref={ref} {...props}>
        {children}
    </Host>
);

export const PanelList = React.forwardRef<HTMLDivElement, Props>(PanelListHost);
