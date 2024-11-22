import React from "react";

import { Typography } from "@/enishi-ui/components/dataDisplay/Typography";

type Props = React.ComponentPropsWithRef<typeof Typography> & {
    readonly emoji: string;
};

export const Emoji: React.FC<Props> = ({ emoji, children, ...props }) => (
    <Typography {...props}>
        <span role="img">{emoji}</span>
        {children}
    </Typography>
);
