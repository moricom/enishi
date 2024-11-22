import React from "react";

import { Typography } from "@/enishi-ui/components/dataDisplay/Typography";

type Props = React.ComponentPropsWithRef<typeof Typography> & {
    readonly children?: React.ReactNode;
};

export const DialogTitle: React.FC<Props> = ({ children, ...props }) => (
    <Typography fontWeight="bold" variant="h4" {...props}>
        {children}
    </Typography>
);
