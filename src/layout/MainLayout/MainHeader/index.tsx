import React from "react";

import { LinearLayout } from "@/enishi-ui/components/layout/LinearLayout";
import { Header } from "@/enishi-ui/components/navigation/Header";

import { config } from "@/config";

import type { BaseProps } from "@/types/enishi";

type Props = BaseProps<{
    headerHeight?: string;
}>;

const MainHeaderHost: React.FC<Props> = ({ headerHeight, ...props }) => (
    <LinearLayout {...props}>
        <Header drawerVariant="permanent" headerHeight={headerHeight}>
            <LinearLayout fullWidth id={config.HEADER_CONTENT_ELEMENT_ID} />
        </Header>
    </LinearLayout>
);

export const MainHeader = React.memo(MainHeaderHost);
