import React, { useCallback } from "react";

import { styled } from "styled-components";

import { FormControlLabel } from "@/enishi-ui/components/inputs/FormControlLabel";
import { RadioButton } from "@/enishi-ui/components/inputs/RadioButton";
import type { EnishiUIProps } from "@/enishi-ui/components/type";

const Host = styled(FormControlLabel)<{ $noMargin: boolean }>`
    && {
        margin: ${({ $noMargin }) => ($noMargin ? "0" : "0.25rem 0.5rem")};
    }
`;

const StyledRadioButton = styled(RadioButton)`
    && {
        margin-right: 0.2rem;
    }
`;

type Props = EnishiUIProps<{
    checked?: boolean;
    label: string;
    checkMarkColor?: string;
    noMargin?: boolean;
    size?: React.ComponentPropsWithRef<typeof RadioButton>["size"];
    fullWidth?: boolean;
    onClick?: (e: { checked: boolean; label: string }) => void;
}>;

export const LabeledRadioButton: React.FC<Props> = ({ onClick, checked, colorTheme, label, noMargin = false, children, ...props }) => {
    const handleClick = useCallback(() => onClick?.({ label, checked: Boolean(checked) }), [checked, label, onClick]);

    return (
        <Host $noMargin={noMargin} gravity="center_left" label={label} onClick={handleClick} {...props}>
            <StyledRadioButton checked={checked} colorTheme={colorTheme} onClick={handleClick} />
            {children}
        </Host>
    );
};
