import type { BaseSyntheticEvent } from "react";
import React, { useCallback } from "react";

import { css, styled } from "styled-components";

import { NormalChipHost } from "@/enishi-ui/components/dataDisplay/Chip/NormalChip/Host";
import { Typography } from "@/enishi-ui/components/dataDisplay/Typography";
import { Ripple } from "@/enishi-ui/components/effect/Ripple";
import type { EnishiUIProps } from "@/enishi-ui/components/type";
import { useHandleEnterKeyDown } from "@/enishi-ui/hooks/useHandleEnterKeyDown";

const Content = styled.div<{ $withCircle: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 1rem;
    padding: 0 0.5rem;
`;

const sizes = {
    "x-small": {
        iconLeft: "-2.2rem",
        fontSize: "0.85rem",
        circleSize: "0.8rem"
    },
    "small": {
        iconLeft: "-2.2rem",
        fontSize: "0.9rem",
        circleSize: "1rem"
    },
    "medium": {
        iconLeft: "-2.8rem",
        fontSize: "1rem",
        circleSize: "1.2rem"
    },
    "large": {
        iconLeft: "-3.4rem",
        fontSize: "1rem",
        circleSize: "1.2rem"
    },
    "x-large": {
        iconLeft: "-3.8rem",
        fontSize: "1rem",
        circleSize: "1.3rem"
    }
};

const checkedStyle = css<{ $checkMarkColor?: string; $size?: keyof typeof sizes }>`
    &::before {
        border-radius: 0;
        background: transparent;
        width: 0.3125rem;
        height: 0.75rem;
        border-bottom: 0.125rem solid ${({ theme, $checkMarkColor }) => $checkMarkColor ?? theme.palette.background[10]};
        border-right: 0.125rem solid ${({ theme, $checkMarkColor }) => $checkMarkColor ?? theme.palette.background[10]};
        transform: translate(${({ $size }) => sizes[$size ?? "medium"].iconLeft}, -0.1rem) rotateZ(405deg) scale(1, 1);
        transform-origin: center;
    }
`;

const flatStyle = css`
    && {
        box-shadow: none;
        border: 1px solid ${({ theme }) => theme.palette.grey[50]};
    }
`;

const ToggleChipHost = styled(NormalChipHost)<{
    $withCircle: boolean;
    $raised: boolean;
    $checkMarkColor?: string;
    $themeColor?: string;
    $checked: boolean;
}>`
    && {
        &::before {
            content: ${({ $withCircle }) => ($withCircle ? "''" : "none")};
            display: inline-block;
            position: absolute;
            transform: translate(${({ size }) => sizes[size ?? "medium"].iconLeft}, 0rem) rotateZ(0) scale(1, 1);
            width: ${({ size }) => sizes[size ?? "medium"].circleSize};
            height: ${({ size }) => sizes[size ?? "medium"].circleSize};
            border-radius: 50%;
            border: 0px;
            background: ${({ theme, $themeColor }) => $themeColor ?? theme.palette.background[10]};
            transition: all ${({ theme: { transitions } }) => `${transitions.duration.short} ${transitions.easing.easeOut}`};
        }
        box-shadow: ${({ theme, $checked: checked }) => (checked ? theme.shadows["8"] : theme.shadows["5"])};
        ${({ $checked }) => $checked && checkedStyle};
        ${({ $raised }) => !$raised && flatStyle};
    }
`;

type Props = EnishiUIProps<{
    color?: string;
    textColor?: string;
    stopPropagation?: boolean;
    onCheck?: () => void;
    button?: boolean;
    checked?: boolean;
    loading?: boolean;
    size?: React.ComponentPropsWithRef<typeof NormalChipHost>["size"];
    raised?: boolean;
}>;

export const ToggleChip: React.FC<Props> = ({
    color,
    textColor,
    onCheck,
    loading,
    checked = false,
    stopPropagation,
    button = false,
    colorTheme,
    children,
    size,
    raised = true,
    ...props
}) => {
    const handleClick = useCallback(
        (e: BaseSyntheticEvent) => {
            if (stopPropagation) {
                e.stopPropagation();
            }
            onCheck?.();
        },
        [onCheck, stopPropagation]
    );
    const handleKeyDown = useHandleEnterKeyDown(handleClick);

    return (
        // eslint-disable-next-line styled-components-a11y/click-events-have-key-events
        <Ripple
            colorTheme={colorTheme}
            component={
                <ToggleChipHost
                    $checkMarkColor={textColor}
                    $checked={checked}
                    $raised={raised}
                    $themeColor={color}
                    $withCircle={Boolean(color)}
                    backgroundColor={checked ? color : undefined}
                    button={button}
                    loading={loading}
                    onClick={handleClick}
                    onKeyDown={handleKeyDown}
                    role={button ? "button" : "presentation"}
                    size={size}
                    tabIndex={0}
                    {...props}
                >
                    <Content $withCircle={Boolean(color)}>
                        {typeof children === "string" ? (
                            <Typography
                                color={checked ? textColor : undefined}
                                fontSize={sizes[size ?? "medium"].fontSize}
                                gravity="center"
                            >
                                {children}
                            </Typography>
                        ) : (
                            children
                        )}
                    </Content>
                </ToggleChipHost>
            }
            disabled={!button}
        />
    );
};
