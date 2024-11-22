import React from "react";

import { styled } from "styled-components";

import type { enishiUIProps } from "@/enishi-ui/components/type";

const Host = styled.div`
    flex-grow: 1;
    align-self: stretch;
`;

type Props = enishiUIProps;

export const FlexibleSpaceHost = ({ children, ...props }: Props, ref: React.ForwardedRef<HTMLDivElement>) => (
    <Host ref={ref} {...props}>
        {children}
    </Host>
);

export const FlexibleSpace = React.forwardRef<HTMLDivElement, Props>(FlexibleSpaceHost);
