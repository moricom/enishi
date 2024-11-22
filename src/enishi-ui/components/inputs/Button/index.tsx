import React, { useCallback, useMemo } from "react";

import { css, styled, useTheme } from "styled-components";

import { Typography } from "@/enishi-ui/components/dataDisplay/Typography";
import { Ripple } from "@/enishi-ui/components/effect/Ripple";
import { Indicator } from "@/enishi-ui/components/feedback/Indicator";
import type { ColorTheme, Size, enishiUIProps } from "@/enishi-ui/components/type";

type Variant = "contained" | "outlined" | "text";

const sizes = {
    "x-small": {
        paddingLeft: "0.2rem",
        paddingRight: "0.2rem",
        height: "1.6rem",
        width: "4rem",
        fontSize: "0.8rem",
        lineHeight: "0.85",
        iconSize: "1.1rem",
        indicator: {
            left: "0.4rem",
            size: "0.8rem"
        }
    },
    "small": {
        paddingLeft: "0.4rem",
        paddingRight: "0.4rem",
        height: "2rem",
        width: "6rem",
        fontSize: "0.9rem",
        lineHeight: "1",
        iconSize: "1.2rem",
        indicator: {
            left: "0.6rem",
            size: "1.1rem"
        }
    },
    "medium": {
        paddingLeft: "1rem",
        paddingRight: "1rem",
        height: "2.4rem",
        width: "8rem",
        fontSize: "1rem",
        lineHeight: "1",
        iconSize: "1.5rem",
        indicator: {
            left: "0.8rem",
            size: "1.7rem"
        }
    },
    "large": {
        paddingLeft: "1.2rem",
        paddingRight: "1.2rem",
        height: "2.6rem",
        width: "10rem",
        fontSize: "1.2rem",
        lineHeight: "1",
        iconSize: "1.5rem",
        indicator: {
            left: "0.8rem",
            size: "2rem"
        }
    },
    "x-large": {
        paddingLeft: "1.4rem",
        paddingRight: "1.4rem",
        height: "3.4rem",
        width: "15rem",
        fontSize: "1.4rem",
        lineHeight: "1",
        iconSize: "1.5rem",
        indicator: {
            left: "0.8rem",
            size: "2rem"
        }
    }
};

type ButtonCommonProps = {
    $colorTheme: ColorTheme;
    $isLoading?: boolean;
    $fullWidth: boolean;
    $fitWidth: boolean;
    $disabled: boolean;
    $boxRadius: boolean;
    $noMargin: boolean;
    $width?: string;
    $size: Size;
    $checked: boolean;
};

const ButtonCommon = styled.button<ButtonCommonProps>`
    padding-left: ${({ $isLoading, $size }) =>
        $isLoading ? `calc(${sizes[$size].indicator.size} + ${sizes[$size].paddingLeft})` : sizes[$size].paddingLeft};
    padding-right: ${({ $size }) => sizes[$size].paddingRight};
    min-height: ${({ $size }) => sizes[$size].height};
    min-width: ${({ $fullWidth, $fitWidth, $size, $width }) =>
        ($width ?? $fitWidth) ? "fit-content" : $fullWidth ? "100%" : sizes[$size].width};
    width: ${({ $fullWidth, $fitWidth, $size, $width }) =>
        ($width ?? $fitWidth) ? "fit-content" : $fullWidth ? "100%" : sizes[$size].width};
    max-width: ${({ $noMargin }) => ($noMargin ? "100%" : "calc(100% - 0.4rem)")};
    margin: ${({ $noMargin }) => ($noMargin ? "0" : "0.2rem")};
    border-radius: ${({ $boxRadius }) => ($boxRadius ? "24px" : "6px")};
    border: 1px solid transparent;
    display: flex;
    box-sizing: border-box;
    position: relative;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: ${({ $disabled }) => ($disabled ? "initial" : "pointer")};
    transition: all ${({ theme: { transitions } }) => `${transitions.duration.standard} ${transitions.easing.easeOut}`};
`;

const disabledContainerButtonStyle = css`
    && {
        background-color: ${({ theme }) => theme.palette.grey[50]};
        &:hover {
            background-color: ${({ theme }) => theme.palette.grey[50]};
            box-shadow: none;
        }
    }
`;
const ContainedButton = styled(ButtonCommon)`
    background-color: ${({ theme, $colorTheme }) => theme.palette[$colorTheme][100]};
    transition: all ${({ theme: { transitions } }) => `${transitions.duration.standard} ${transitions.easing.easeOut}`};
    &:hover {
        background-color: ${({ theme, $colorTheme }) => theme.palette[$colorTheme][80]};
        box-shadow: ${({ theme, $size: size }) => (size === "x-small" ? theme.shadows["1"] : theme.shadows["2"])};
    }
    &:active {
        background-color: ${({ theme, $colorTheme }) => theme.palette[$colorTheme][300]};
    }
    ${({ $disabled: disabled }) => disabled && disabledContainerButtonStyle};
    ${({ $checked, theme, $colorTheme }) => $checked && `border: 1px solid ${theme.palette[$colorTheme][70]};`};
`;

const disabledOutlinedButtonStyle = css`
    && {
        background-color: transparent;
        border-color: ${({ theme }) => theme.palette.grey[50]};
        &:hover {
            background-color: transparent;
            border-color: ${({ theme }) => theme.palette.grey[50]};
        }
    }
`;

const OutlinedButton = styled(ButtonCommon)`
    background-color: transparent;
    border: solid 1px ${({ theme, $colorTheme }) => theme.palette[$colorTheme][70]};
    &:hover {
        border: solid 1px ${({ theme, $colorTheme }) => theme.palette[$colorTheme][100]};
        background-color: ${({ theme, $colorTheme }) => theme.palette.action.hover(theme.palette[$colorTheme][300])};
    }
    ${({ $disabled: disabled }) => disabled && disabledOutlinedButtonStyle};
    ${({ $checked, theme, $colorTheme }) => $checked && `border: 1px solid ${theme.palette[$colorTheme][70]};`};
`;

const disabledTextButtonStyle = css`
    && {
        background-color: transparent;
        &:hover {
            background-color: transparent;
        }
    }
`;
const TextButton = styled(ButtonCommon)`
    background-color: ${({ $checked, theme, $colorTheme }) =>
        $checked ? theme.palette.action.active(theme.palette[$colorTheme]["100"]) : "transparent"};
    &:hover {
        background-color: ${({ theme, $colorTheme }) => theme.palette.action.hover(theme.palette[$colorTheme][100])};
    }
    ${({ $disabled: disabled }) => disabled && disabledTextButtonStyle};
`;

const StyledIndicator = styled(Indicator)<{ $variant: Variant; $colorTheme: ColorTheme }>`
    && {
        position: absolute;
        left: ${({ size }) => sizes[size ?? "medium"].indicator.left};
        width: ${({ size }) => sizes[size ?? "medium"].indicator.size};
        height: ${({ size }) => sizes[size ?? "medium"].indicator.size};
        color: ${({ theme, $variant, $colorTheme }) =>
            $variant === "contained" ? theme.palette[$colorTheme][10] : theme.palette[$colorTheme][100]};
    }
`;

const IconContainer = styled.div<{ $color: string; $size: keyof typeof sizes; $iconPosition: "left" | "right" }>`
    display: flex;
    color: ${({ $color }) => $color};
    > * {
        width: ${({ $size }) => sizes[$size].iconSize};
        height: ${({ $size }) => sizes[$size].iconSize};
        margin-left: ${({ $iconPosition, $size }) => ($iconPosition === "left" ? "0" : `calc(${sizes[$size].iconSize} / 2)`)};
        margin-right: ${({ $iconPosition, $size }) => ($iconPosition === "right" ? "0" : `calc(${sizes[$size].iconSize} / 2)`)};
    }
`;

type Props = enishiUIProps<{
    variant?: Variant;
    colorTheme?: ColorTheme;
    width?: string;
    fullWidth?: boolean;
    loading?: boolean;
    type?: "button" | "submit";
    disabled?: boolean;
    boxRadius?: boolean;
    fontWeight?: React.ComponentPropsWithRef<typeof Typography>["fontWeight"];
    fitWidth?: boolean;
    noMargin?: boolean;
    icon?: React.ReactNode | null;
    iconPosition?: "left" | "right";
    size?: keyof typeof sizes;
    typographyProps?: Partial<React.ComponentPropsWithRef<typeof Typography>>;
    checked?: boolean;
}>;

const ButtonHost = (
    {
        variant = "contained",
        onClick,
        className,
        style,
        colorTheme = "info",
        width,
        fullWidth = false,
        loading,
        disabled = false,
        type = "button",
        boxRadius = false,
        fontWeight = "bold",
        fitWidth = false,
        noMargin = false,
        icon,
        iconPosition = "left",
        size = "medium",
        typographyProps,
        checked = false,
        children,
        ...props
    }: Props,
    ref: React.ForwardedRef<HTMLButtonElement>
) => {
    const theme = useTheme();
    // prettier-ignore
    const textColor = (
        variant === "outlined"  ?
            disabled ? theme.palette.grey[100] : theme.palette[colorTheme][100]
      : variant === "contained" ?
            disabled ? theme.palette.grey[100] : theme.palette[colorTheme][10]
      : variant === "text"      ?
            disabled ? theme.palette.grey[60] : theme.palette[colorTheme][100]
      :                           theme.palette.text.primary
    );
    const Host = useMemo(() => (variant === "contained" ? ContainedButton : variant === "text" ? TextButton : OutlinedButton), [variant]);
    const clickHandler = useCallback(() => !disabled && void onClick?.(), [onClick, disabled]);
    return (
        <Ripple
            colorTheme={colorTheme}
            component={
                <Host
                    $boxRadius={boxRadius}
                    $checked={checked}
                    $colorTheme={colorTheme}
                    $disabled={disabled}
                    $fitWidth={fitWidth}
                    $fullWidth={fullWidth}
                    $isLoading={loading}
                    $noMargin={noMargin}
                    $size={size}
                    $width={width}
                    className={className}
                    onClick={clickHandler}
                    ref={ref}
                    style={style}
                    type={type}
                    {...props}
                >
                    {!loading && icon && iconPosition === "left" ? (
                        <IconContainer $color={textColor} $iconPosition="left" $size={size}>
                            {icon}
                        </IconContainer>
                    ) : null}
                    {loading !== undefined && <StyledIndicator $colorTheme={colorTheme} $variant={variant} loading={loading} size={size} />}
                    <Typography
                        color={textColor}
                        fontSize={sizes[size].fontSize}
                        fontWeight={fontWeight}
                        fullWidth
                        gravity="center"
                        style={{
                            lineHeight: sizes[size].lineHeight,
                            ...typographyProps?.style
                        }}
                        variant={size === "x-small" ? "caption" : undefined}
                        {...typographyProps}
                    >
                        {children}
                    </Typography>
                    {!loading && icon && iconPosition === "right" ? (
                        <IconContainer $color={textColor} $iconPosition="right" $size={size}>
                            {icon}
                        </IconContainer>
                    ) : null}
                </Host>
            }
        />
    );
};

export const Button = React.forwardRef<HTMLButtonElement, Props>(ButtonHost);
