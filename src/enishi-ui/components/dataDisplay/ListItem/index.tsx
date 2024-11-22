import React from "react";

import { useTheme } from "styled-components";

import { Host } from "@/enishi-ui/components/dataDisplay/ListItem/Host";
import { Typography } from "@/enishi-ui/components/dataDisplay/Typography";
import { Ripple } from "@/enishi-ui/components/effect/Ripple";
import type { EnishiUIProps } from "@/enishi-ui/components/type";

type Props = EnishiUIProps<{
    disabled?: boolean;
    selected?: boolean;
    indent?: number;
    button?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    className?: string;
    fontWeight?: React.ComponentPropsWithRef<typeof Typography>["fontWeight"];
    typographyProps?: React.ComponentPropsWithRef<typeof Typography>;
    rounded?: boolean;
}>;

export const ListItem: React.FC<Props> = ({
    disabled,
    selected,
    indent,
    size = "medium",
    fontWeight,
    children,
    button,
    colorTheme = "primary",
    typographyProps,
    rounded,
    ...props
}) => {
    const theme = useTheme();

    const Content = (
        <Typography
            color={selected ? theme.palette.text.accent : theme.palette.text.primary}
            fontWeight={fontWeight}
            fullWidth
            variant={size === "small" || size === "x-small" ? "body2" : "body2"}
            {...typographyProps}
        >
            {children}
        </Typography>
    );
    if (button) {
        return (
            <Ripple
                colorTheme={colorTheme}
                component={
                    <Host
                        button={button}
                        colorTheme={colorTheme}
                        indent={indent}
                        rounded={rounded}
                        selected={selected}
                        size={size}
                        {...props}
                    >
                        {Content}
                    </Host>
                }
                disabled={disabled}
            />
        );
    }
    return (
        <Host colorTheme={colorTheme} rounded={rounded} selected={selected} size={size} {...props}>
            {Content}
        </Host>
    );
};
