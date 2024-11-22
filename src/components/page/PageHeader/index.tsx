import React, { useMemo } from "react";

import { createPortal } from "react-dom";
import { styled } from "styled-components";

import { LinearLayout } from "@/enishi-ui/components/layout/LinearLayout";

import { config } from "@/config";

import type { BaseProps } from "@/types/enishi";

const Host = styled(LinearLayout)`
    && {
        overflow: hidden;
    }
`;

type Props = BaseProps;

export const PageHeader: React.FC<Props> = ({ children, ...props }) => {
    const headerContentElement = useMemo(() => document.getElementById(config.HEADER_CONTENT_ELEMENT_ID), []);

    if (!headerContentElement) {
        console.warn("The header content element not found");
        return null;
    }

    return createPortal(
        <Host fullWidth gravity="center_left" orientation="horizontal" {...props}>
            {children}
        </Host>,
        headerContentElement
    );
};
