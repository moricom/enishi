import React from "react";

import { styled, useTheme } from "styled-components";

import { Typography } from "@/enishi-ui/components/dataDisplay/Typography";
import { Ripple } from "@/enishi-ui/components/effect/Ripple";
import { LinearLayout } from "@/enishi-ui/components/layout/LinearLayout";
import type { enishiUIProps } from "@/enishi-ui/components/type";

const Host = styled(LinearLayout)<{ $finished: boolean }>`
    && {
        min-width: 9rem;
        width: 9rem;
        max-width: 9rem;
        cursor: ${({ $finished }) => ($finished ? "pointer" : "default")};
    }
`;

const StepPosition = styled(LinearLayout)`
    && {
        min-height: 2rem;
        height: 2rem;
    }
`;

const Circle = styled.div<{ checked: boolean }>`
    min-height: 12px;
    max-height: 12px;
    min-width: 12px;
    max-width: 12px;
    border-radius: 50%;
    z-index: 1;
    background-color: ${({ checked, theme }) => (checked ? theme.palette.primary[100] : theme.palette.grey[100])};
    transition: all ${({ theme: { transitions } }) => `${transitions.duration.standard} ${transitions.easing.easeOut}`};
`;

type Props = enishiUIProps<{
    selected: boolean;
    finished: boolean;
}>;

export const Step: React.FC<Props> = ({ selected, finished, onClick, children, ...props }) => {
    const theme = useTheme();
    return (
        <Ripple
            component={
                <Host $finished={finished} gravity="top_center" onClick={onClick} orientation="vertical" {...props}>
                    <StepPosition gravity="center">
                        <Circle checked={selected || finished} />
                    </StepPosition>
                    <Typography
                        color={selected ? theme.palette.text.primary : theme.palette.text.disabled}
                        fontWeight={selected ? "bold" : undefined}
                        variant="body2"
                    >
                        {children}
                    </Typography>
                </Host>
            }
            disabled={!finished}
        />
    );
};
