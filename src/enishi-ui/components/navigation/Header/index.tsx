import React from "react";

import { MdMenu } from "@react-icons/all-files/md/MdMenu";
import { styled } from "styled-components";

import { IconButton } from "@/enishi-ui/components/inputs/IconButton";
import type { enishiUIProps } from "@/enishi-ui/components/type";

const Host = styled.header<{ $headerHeight?: string }>`
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: ${({ theme }) => theme.palette.background[10]};
    box-shadow: ${({ theme }) => theme.shadows["5"]};
    height: ${({ $headerHeight }) => $headerHeight ?? "3.4rem"};
    box-sizing: border-box;
    padding: 0.5rem 1rem;
    width: 100%;
    margin: 0.4rem;
    margin-bottom: 0.1rem;
    border-radius: 8px;
    overflow: hidden;
`;

type Props = enishiUIProps<{
    headerHeight?: string;
    toggleDrawer?: () => void;
    drawerVariant: "permanent" | "temporary";
}>;

export const Header: React.FC<Props> = ({ drawerVariant, headerHeight, toggleDrawer, children, ...props }) => (
    <Host $headerHeight={headerHeight} {...props}>
        {drawerVariant === "temporary" && (
            <IconButton buttonProps={{ "data-w-id": "toggle-drawer-button" }} circle noMargin onClick={toggleDrawer} size="large">
                <MdMenu />
            </IconButton>
        )}
        {children}
    </Host>
);
