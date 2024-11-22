import React from "react";

import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { styled } from "styled-components";

import type { BaseProps } from "@/types/enishi";

const Host = styled(OverlayScrollbarsComponent)`
    && {
        padding: 0.5rem;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
    }
`;

const Content = styled.div`
    height: calc(100vh - 3.5rem);
`;

type Props = BaseProps;

export const PageContent: React.FC<Props> = ({ children, ...props }) => (
    <Host options={{ scrollbars: { autoHide: "leave" } }} {...props}>
        <Content>{children}</Content>
    </Host>
);
