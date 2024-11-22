import React from "react";

import { Typography } from "@/enishi-ui/components/dataDisplay/Typography";

type Props = React.ComponentPropsWithRef<typeof Typography> & {
    readonly children?: React.ReactNode;
};

export const CardTitle: React.FC<Props> = ({ children, ...props }) => (
    <Typography colorTheme="secondary" {...props}>
        {children}
    </Typography>
);
