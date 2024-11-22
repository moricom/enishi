import React, { useCallback } from "react";

import { styled, useTheme } from "styled-components";

import { Typography } from "@/enishi-ui/components/dataDisplay/Typography";
import { LinearLayout } from "@/enishi-ui/components/layout/LinearLayout";

const Host = styled(LinearLayout)<{ disabled: boolean }>`
    cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
`;

type Props = React.ComponentPropsWithRef<typeof LinearLayout> & {
    readonly label: React.ReactNode;
    readonly disabled?: boolean;
};

export const FormControlLabel: React.FC<Props> = ({ onClick, label = "top", disabled = false, children, ...props }) => {
    const { palette } = useTheme();
    const handleClick = useCallback(() => {
        if (!disabled) {
            void onClick?.();
        }
    }, [disabled, onClick]);
    return (
        <Host disabled={disabled} gravity="center" onClick={handleClick} {...props}>
            <LinearLayout>{children}</LinearLayout>
            <div style={{ width: "4px" }} />
            <div>
                {typeof label === "string" ? (
                    <Typography color={disabled ? palette.text.disabled : palette.text.primary}>{label}</Typography>
                ) : (
                    label
                )}
            </div>
        </Host>
    );
};
