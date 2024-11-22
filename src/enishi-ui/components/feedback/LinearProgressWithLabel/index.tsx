import React from "react";

import { styled } from "styled-components";

import { Typography } from "@/enishi-ui/components/dataDisplay/Typography";
import { LinearProgress } from "@/enishi-ui/components/feedback/LinearProgress";

const Host = styled.div<{ $fullWidth: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "initial")};
`;

const ProgressBar = styled(LinearProgress)`
    && {
        flex-grow: 1;
    }
`;

const Label = styled(Typography)`
    && {
        margin-left: -0.5rem;
        min-width: 2.5rem;
        width: 2.5rem;
    }
`;

type Props = React.ComponentPropsWithRef<typeof LinearProgress>;

export const LinearProgressWithLabel: React.FC<Props> = ({ progress, fullWidth = false, ...props }) => (
    <Host $fullWidth={fullWidth} {...props}>
        <ProgressBar progress={progress} />
        <Label colorTheme="secondary" variant="caption">
            {Math.round(progress)}%
        </Label>
    </Host>
);
