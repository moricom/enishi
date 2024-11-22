import React from "react";

import { styled } from "styled-components";

import type { enishiUIProps } from "@/enishi-ui/components/type";

const Host = styled.div`
    box-sizing: border-box;
    padding: 1rem 1.5rem;
`;

type Props = enishiUIProps;

export const DialogContent: React.FC<Props> = ({ children, ...props }) => <Host {...props}>{children}</Host>;
