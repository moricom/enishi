import React from "react";

import { css, styled } from "styled-components";

import type { enishiUIProps } from "@/enishi-ui/components/type";

const permanentStyle = css`
    && {
        min-width: 100%;
        min-height: 100%;
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
    }
`;

const Container = styled.nav<{ $swipeWidth?: number; $open: boolean; $drawerWidth?: string; $variant: "permanent" | "temporary" }>`
    min-width: ${({ $drawerWidth: drawerWidth }) => drawerWidth ?? "18rem"};
    width: ${({ $drawerWidth: drawerWidth }) => drawerWidth ?? "18rem"};
    left: ${({ $open, $drawerWidth, $swipeWidth }) =>
        $open
            ? $swipeWidth
                ? `calc(-${$drawerWidth ?? "18rem"} + ${$swipeWidth}px)`
                : "0"
            : $swipeWidth
              ? `calc(-${$drawerWidth ?? "18rem"} + ${$swipeWidth}px)`
              : `calc(-${$drawerWidth ?? "18rem"} - 10px)`};
    position: ${({ $variant }) => ($variant === "permanent" ? "relative" : "fixed")};
    transition: all ${({ theme: { transitions } }) => `${transitions.duration.standard} ${transitions.easing.easeOut}`};
    z-index: ${({ $variant }) => ($variant === "temporary" ? "1" : "1")};
    height: 100%;
    overflow: hidden;
    height: 100%;
    margin-right: 0;
    background-color: ${({ theme }) => theme.palette.primary[100]};
    box-sizing: border-box;
    ${({ $variant }) => $variant === "permanent" && permanentStyle};
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

type Props = enishiUIProps<{
    open: boolean;
    swipeWidth?: number;
    onClick?: React.MouseEventHandler;
    variant: "permanent" | "temporary";
    drawerWidth?: string;
}>;

const DrawerHost = ({ open, drawerWidth, children, variant, swipeWidth, ...props }: Props, ref: React.ForwardedRef<HTMLDivElement>) => (
    <Container $drawerWidth={drawerWidth} $open={open} $swipeWidth={swipeWidth} $variant={variant} ref={ref} {...props}>
        <Content>{children}</Content>
    </Container>
);

export const Host = React.forwardRef<HTMLDivElement, Props>(DrawerHost);
