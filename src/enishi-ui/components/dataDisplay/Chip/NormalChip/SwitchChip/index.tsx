import React, { useCallback } from "react";

import { css, styled } from "styled-components";

import { NormalChipHost } from "@/enishi-ui/components/dataDisplay/Chip/NormalChip/Host";
import { Typography } from "@/enishi-ui/components/dataDisplay/Typography";
import type { EnishiUIProps } from "@/enishi-ui/components/type";
import { useHandleEnterKeyDown } from "@/enishi-ui/hooks/useHandleEnterKeyDown";

const sizes = {
    "x-small": {
        arrowSize: "0.4rem"
    },
    "small": {
        arrowSize: "0.6rem"
    },
    "medium": {
        arrowSize: "0.8rem"
    },
    "large": {
        arrowSize: "0.8rem"
    },
    "x-large": {
        arrowSize: "0.8rem"
    }
};

const flatStyle = css`
    && {
        box-shadow: none;
        border: 1px solid ${({ theme }) => theme.palette.grey[50]};
    }
`;

const SwitchChipHost = styled(NormalChipHost)<{ $raised: boolean }>`
    && {
        position: relative;
        ${({ $raised }) => !$raised && flatStyle};
    }
`;

const ArrowIcon = styled.div<{ $markColor?: string; $position: "left" | "right"; $size: keyof typeof sizes }>`
    position: absolute;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &::before,
    &::after {
        border-radius: 4px;
        background-color: ${({ theme, $markColor }) => $markColor ?? theme.palette.primary[100]};
        position: absolute;
        content: "";
    }
    &::before {
        position: absolute;
        width: ${({ $size }) => sizes[$size].arrowSize};
        height: 1px;
        left: ${({ $size }) => sizes[$size].arrowSize};
        transform: rotate(-45deg) translateY(calc(-${({ $size }) => sizes[$size].arrowSize} / 2 + 0.5px));
    }
    &::after {
        position: absolute;
        width: ${({ $size }) => sizes[$size].arrowSize};
        height: 1px;
        left: ${({ $size }) => sizes[$size].arrowSize};
        transform: rotate(45deg) translateY(calc(${({ $size }) => sizes[$size].arrowSize} / 2 - 0.5px));
    }
    transition: all ${({ theme: { transitions } }) => `${transitions.duration.short} ${transitions.easing.easeOut}`};
    opacity: 0.5;
    &:hover {
        opacity: 1;
    }
    ${({ $position }) =>
        $position === "left"
            ? css`
                  left: 0;
              `
            : css`
                  right: 0;
                  transform: rotate(180deg);
              `}
`;

const Content = styled.div``;

type Props = EnishiUIProps<{
    color?: string;
    textColor?: string;
    stopPropagation?: boolean;
    loading?: boolean;
    onNext: () => void;
    onPrev: () => void;
    size?: React.ComponentPropsWithRef<typeof NormalChipHost>["size"];
    typographyProps?: Partial<React.ComponentPropsWithRef<typeof Typography>>;
    raised?: boolean;
}>;

export const SwitchChip: React.FC<Props> = ({
    color,
    textColor,
    onNext,
    onPrev,
    loading,
    stopPropagation,
    size = "medium",
    children,
    typographyProps,
    raised = true,
    ...props
}) => {
    const handleClick = useCallback(
        (e: React.MouseEvent) => {
            if (stopPropagation) {
                e.stopPropagation();
            }
        },
        [stopPropagation]
    );
    const handlePrevIconKeyDown = useHandleEnterKeyDown(onPrev);
    const handleNextIconKeyDown = useHandleEnterKeyDown(onNext);
    return (
        <SwitchChipHost
            $raised={raised}
            backgroundColor={color ?? ""}
            button={false}
            loading={loading}
            onClick={handleClick}
            role="presentation"
            size={size}
            {...props}
        >
            <Content>
                {typeof children === "string" ? (
                    <Typography
                        color={textColor}
                        fontSize={size === "x-small" ? "0.8rem" : "1rem"}
                        style={{ display: "flex", ...typographyProps?.style }}
                        {...typographyProps}
                    >
                        {children}
                    </Typography>
                ) : (
                    children
                )}
            </Content>
            <ArrowIcon
                $markColor={textColor}
                $position="left"
                $size={size}
                data-w-id="switch-chip-prev-button"
                onClick={onPrev}
                onKeyDown={handlePrevIconKeyDown}
                role="button"
                tabIndex={0}
            />
            <ArrowIcon
                $markColor={textColor}
                $position="right"
                $size={size}
                data-w-id="switch-chip-next-button"
                onClick={onNext}
                onKeyDown={handleNextIconKeyDown}
                role="button"
                tabIndex={0}
            />
        </SwitchChipHost>
    );
};
