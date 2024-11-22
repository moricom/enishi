import React from "react";

import { styled } from "styled-components";

import { LoadingPage } from "@/features/misc";
import { MainHeader } from "@/layout/MainLayout/MainHeader";

const headerHeight = "3rem";

const Host = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${({ theme }) => (theme.mode === "dark" ? theme.palette.background[60] : theme.palette.background[10])};
    display: flex;
`;

const Content = styled.div`
    display: flex;
    box-sizing: border-box;
    overflow: hidden;
    width: 100%;
    transition: all ${({ theme: { transitions } }) => `${transitions.duration.standard} ${transitions.easing.easeOut}`};
    height: calc(100% - ${headerHeight});
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
    max-width: 100%;
    width: 100%;
    transition: all ${({ theme: { transitions } }) => `${transitions.duration.standard} ${transitions.easing.easeOut}`};
`;

type Props = {
    readonly children: React.ReactNode;
};

const MainLayoutHost: React.FC<Props> = ({ children, ...props }) => (
    <Host>
        <Body>
            <MainHeader headerHeight={headerHeight} />
            <Content {...props}>
                <React.Suspense fallback={<LoadingPage />}>{children}</React.Suspense>
            </Content>
        </Body>
    </Host>
);

export const MainLayout = React.memo(MainLayoutHost);
