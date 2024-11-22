import React from "react";

import { styled } from "styled-components";

import type { enishiUIProps } from "@/enishi-ui/components/type";

const Host = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    padding: 1rem 1rem 0.5rem;
    box-sizing: border-box;
`;

type Props = enishiUIProps;

export const PanelHeader: React.FC<Props> = ({ children, ...props }) => <Host {...props}>{children}</Host>;
