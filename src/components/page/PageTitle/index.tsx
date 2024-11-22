import React from "react";

import { Typography } from "@/enishi-ui/components/dataDisplay/Typography";

type Props = React.ComponentPropsWithRef<typeof Typography>;

export const PageTitle: React.FC<Props> = ({ children, ...props }) => (
    <Typography variant="h4" {...props}>
        {children}
    </Typography>
);
