import React from "react";

import { styled, useTheme } from "styled-components";

import { Typography } from "@/enishi-ui/components/dataDisplay/Typography";
import type { enishiUIProps } from "@/enishi-ui/components/type";

const IconContainer = styled.div`
    > * {
        display: block;
        width: 1rem;
        height: 1rem;
    }
`;

const Host = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1.8rem;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    box-sizing: border-box;
    cursor: pointer;
    &:hover {
        background-color: ${({ theme }) => theme.palette.primary[10]};
    }
    transition: all ${({ theme: { transitions } }) => `${transitions.duration.short} ${transitions.easing.easeOut}`};
    border-radius: 4px;
`;

const Content = styled.div`
    width: 100%;
    flex-grow: 1;
`;

type Props = Omit<
    enishiUIProps<{
        selected?: boolean;
        icon?: React.ReactNode | null;
        value: string;
        label: string;
    }>,
    "children"
>;

export const TabBarItem: React.FC<Props> = ({ icon, value: _, label, selected, ...props }) => {
    const theme = useTheme();
    return (
        <Host {...props}>
            <IconContainer style={{ color: selected ? theme.palette.grey[800] : theme.palette.grey[700] }}>{icon}</IconContainer>
            <Content>
                <Typography colorTheme={selected ? "primary" : "secondary"} fullWidth gravity="center">
                    {label}
                </Typography>
            </Content>
        </Host>
    );
};
