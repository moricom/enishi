import React from "react";

import { styled } from "styled-components";

import { PanelListItemData } from "@/enishi-ui/components/dataDisplay/PanelListItemData";
import { Typography } from "@/enishi-ui/components/dataDisplay/Typography";

const Title = styled(Typography)`
    && {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        display: inline-block;
    }
`;

type Props = React.ComponentPropsWithRef<typeof PanelListItemData>;

export const PanelListItemTitle: React.FC<Props> = ({ children, ...props }) => (
    <PanelListItemData {...props}>
        <Title>{children}</Title>
    </PanelListItemData>
);
