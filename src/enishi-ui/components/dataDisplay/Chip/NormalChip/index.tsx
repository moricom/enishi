import React from "react";

import { SwitchChip } from "@/enishi-ui/components/dataDisplay/Chip/NormalChip/SwitchChip";
import { ToggleChip } from "@/enishi-ui/components/dataDisplay/Chip/NormalChip/ToggleChip";

type Props =
    | (React.ComponentPropsWithRef<typeof SwitchChip> & { type: "switch" })
    | (React.ComponentPropsWithRef<typeof ToggleChip> & { type: "toggle" });

export const NormalChip: React.FC<Props> = (props) => {
    // eslint-disable-next-line react/destructuring-assignment
    if (props.type === "switch") {
        const { type: _, ...circleChipProps } = props;
        return <SwitchChip {...circleChipProps} />;
    }

    const { type: _, ...defaultChipProps } = props;
    return <ToggleChip {...defaultChipProps} />;
};
