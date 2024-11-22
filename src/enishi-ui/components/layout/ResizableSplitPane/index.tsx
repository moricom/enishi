import React from "react";

import { HorizontalResizableSplitPane } from "@/enishi-ui/components/layout/ResizableSplitPane/HorizontalResizableSplitPane";
import { VerticalResizableSplitPane } from "@/enishi-ui/components/layout/ResizableSplitPane/VerticalResizableSplitPane";

type HorizontalProps = React.ComponentPropsWithRef<typeof HorizontalResizableSplitPane> & {
    orientation: "horizontal";
};

type VerticalProps = React.ComponentPropsWithRef<typeof VerticalResizableSplitPane> & {
    orientation: "vertical";
};

export const ResizableSplitPane: React.FC<HorizontalProps | VerticalProps> = (props) => {
    // eslint-disable-next-line react/destructuring-assignment
    if (props.orientation === "horizontal") {
        const { orientation: _orientation, ...p } = props;
        return <HorizontalResizableSplitPane {...p} />;
    }
    const { orientation: _orientation, ...p } = props;
    return <VerticalResizableSplitPane {...p} />;
};
