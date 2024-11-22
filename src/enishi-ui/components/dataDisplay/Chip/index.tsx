import React from "react";

import { CircleChip } from "@/enishi-ui/components/dataDisplay/Chip/CircleChip";
import { NormalChip } from "@/enishi-ui/components/dataDisplay/Chip/NormalChip";

type Props =
    | (React.ComponentPropsWithRef<typeof CircleChip> & { circle: true })
    | (React.ComponentPropsWithRef<typeof NormalChip> & { circle?: false });

export const Chip: React.FC<Props> = (props) => {
    // eslint-disable-next-line react/destructuring-assignment
    if (props.circle) {
        const { circle: _, ...circleChipProps } = props;
        return <CircleChip {...circleChipProps} />;
    }

    const { circle: _, ...defaultChipProps } = props;
    return <NormalChip {...defaultChipProps} />;
};
