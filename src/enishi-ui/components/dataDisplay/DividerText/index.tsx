import React from "react";

import { styled } from "styled-components";

import type { EnishiUIProps } from "@/enishi-ui/components/type";

const Host = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    &::before,
    &::after {
        flex-grow: 1;
        content: "";
        display: block;
        height: 1px;
        background-color: ${({ theme }) => theme.palette.grey[400]};
        margin-top: 1px;
    }
    &::before {
        margin-right: 4px;
    }
    &::after {
        margin-left: 4px;
    }
`;

type Props = EnishiUIProps;

export const DividerText: React.FC<Props> = ({ className, children }) => <Host className={className}>{children}</Host>;
