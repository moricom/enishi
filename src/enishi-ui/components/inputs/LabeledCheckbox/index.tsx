import React, { useCallback } from "react";

import { styled } from "styled-components";

import { Checkbox } from "@/enishi-ui/components/inputs/Checkbox";
import { FormControlLabel } from "@/enishi-ui/components/inputs/FormControlLabel";
import type { EnishiUIProps } from "@/enishi-ui/components/type";
import { useHandleEnterKeyDown } from "@/enishi-ui/hooks/useHandleEnterKeyDown";

type Props = EnishiUIProps & {
    readonly checked: boolean;
    readonly onChange?: (checked: boolean) => void;
    readonly label: string;
    readonly colorTheme?: React.ComponentPropsWithRef<typeof Checkbox>["colorTheme"];
    readonly checkMarkColor?: string;
};

const Host = styled(FormControlLabel)`
    && {
        margin: 0.25rem 0.5rem;
    }
`;

export const LabeledCheckbox: React.FC<Props> = ({ onChange, checkMarkColor, checked, label, colorTheme = "primary", ...props }) => {
    const onCheck = useCallback(() => onChange?.(!checked), [onChange, checked]);
    const handleEnterKeyDown = useHandleEnterKeyDown(onCheck);

    return (
        <Host label={label} onClick={onCheck} {...props}>
            <Checkbox
                checkMarkColor={checkMarkColor}
                checked={checked}
                colorTheme={colorTheme}
                noMargin
                onClick={onCheck}
                onKeyDown={handleEnterKeyDown}
            />
        </Host>
    );
};
