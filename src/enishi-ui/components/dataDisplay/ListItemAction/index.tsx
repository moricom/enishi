import React, { useCallback } from "react";

import { styled } from "styled-components";

import { FlexibleSpace } from "@/enishi-ui/components/layout/FlexibleSpace";
import { LinearLayout } from "@/enishi-ui/components/layout/LinearLayout";
import type { enishiUIProps } from "@/enishi-ui/components/type";

const Host = styled(LinearLayout)`
    flex-grow: 1;
`;

type Props = enishiUIProps;

export const ListItemAction: React.FC<Props> = ({ children, ...props }) => {
    const handleClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
    }, []);
    return (
        <Host {...props}>
            <FlexibleSpace />
            <div onClick={handleClick} role="none">
                {children}
            </div>
        </Host>
    );
};
