import React from "react";

import { MdError } from "@react-icons/all-files/md/MdError";
import { styled, useTheme } from "styled-components";

import { Typography } from "@/enishi-ui/components/dataDisplay/Typography";
import { LinearLayout } from "@/enishi-ui/components/layout/LinearLayout";

const Host = styled(LinearLayout)`
    && {
        margin-left: 0.2rem;
        margin-top: 0.1rem;
        > :first-child {
            margin-right: 0.2rem;
        }
    }
`;

type Props = React.ComponentPropsWithRef<typeof LinearLayout>;

export const ErrorMessage: React.FC<Props> = ({ children, ...props }) => {
    const theme = useTheme();
    return (
        <Host gravity="center_left" {...props}>
            <MdError color={theme.palette.error[100]} />
            <Typography color={theme.palette.error[100]} data-w-id="form-item-container-error-message-field" variant="caption">
                {children}
            </Typography>
        </Host>
    );
};
