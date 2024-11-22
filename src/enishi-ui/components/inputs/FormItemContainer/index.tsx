import type { CSSProperties } from "react";
import React, { useCallback } from "react";

import { css, styled } from "styled-components";

import { ErrorMessage } from "@/enishi-ui/components/dataDisplay/ErrorMessage";
import type { ColorTheme, Size, EnishiUIProps } from "@/enishi-ui/components/type";
import { useHandleEnterKeyDown } from "@/enishi-ui/hooks/useHandleEnterKeyDown";

const sizes = {
    "x-small": {
        fontSize: "0.85rem",
        lineHeight: 1.66
    },
    "small": {
        fontSize: "0.9rem",
        lineHeight: 1.43
    },
    "medium": {
        fontSize: "1rem",
        lineHeight: 1.5
    },
    "large": {
        fontSize: "1.3rem",
        lineHeight: 1.6
    },
    "x-large": {
        fontSize: "1.5rem",
        lineHeight: 1.334
    }
};

const Host = styled.div<{
    $fullWidth?: boolean;
    $fullHeight?: boolean;
    $noMargin: boolean;
}>`
    margin: ${({ $noMargin }) => ($noMargin ? "0" : "0.5rem 0 0.5rem 0")};
    width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "initial")};
    height: ${({ $fullHeight }) => ($fullHeight ? "100%" : "initial")};
`;

type ContentProps = {
    $empty: boolean;
    $invalid: boolean;
    $focused: boolean;
    $raised: boolean;
    $hiddenBorder: boolean;
    $transparentBackground: boolean;
    $mode?: "edit" | "view";
    $size: Size;
    $fullWidth?: boolean;
    $fullHeight?: boolean;
    $colorTheme: ColorTheme;
};

const raisedContainerStyle = css`
    box-shadow: ${({ theme }) => theme.shadows["2"]};
`;

const Content = styled.div<ContentProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-width: ${({ $hiddenBorder }) => ($hiddenBorder ? "0" : "1px")};
    box-sizing: border-box;
    border-style: solid;
    border-color: ${({ theme, $invalid, $focused, $colorTheme }) =>
        // prettier-ignore
        $invalid         ? theme.palette.error[100]
      : $focused         ? theme.palette[$colorTheme][100]
      :                    theme.palette.grey[100]};
    border-radius: 8px;
    background-color: ${({ theme, $transparentBackground }) => ($transparentBackground ? "transparent" : theme.palette.background[70])};
    position: relative;
    transition: all ${({ theme: { transitions } }) => `${transitions.duration.standard} ${transitions.easing.easeOut}`};
    font-size: ${({ $size }) => sizes[$size].fontSize};
    line-height: ${({ $size }) => sizes[$size].lineHeight};
    width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "initial")};
    height: ${({ $fullHeight }) => ($fullHeight ? "100%" : "initial")};
    ${({ $raised }) => $raised && raisedContainerStyle};
    ${({ $mode, $colorTheme, theme }) =>
        $mode === "view" &&
        css`
            background-color: transparent;
            border-color: transparent;
            cursor: pointer;
            &:hover {
                background-color: ${theme.palette[$colorTheme][10]};
            }
        `};
`;

type Props = EnishiUIProps<{
    fullWidth?: boolean;
    fullHeight?: boolean;
    noMargin?: boolean;
    empty: boolean;
    invalid: boolean;
    focused: boolean;
    raised: boolean;
    mode?: "edit" | "view";
    size?: Size;
    colorTheme?: ColorTheme;
    errorMessage?: string;
    stopPropagation?: boolean;
    hiddenBorder?: boolean;
    transparentBackground?: boolean;
    onClick?: (args: { source: "onClick" | "onKeyDown" }) => void;
    contentStyle?: CSSProperties;
}>;

export const FormItemContainer: React.FC<Props> = ({
    fullWidth,
    fullHeight,
    noMargin = false,
    empty,
    invalid,
    focused,
    raised,
    mode,
    size = "medium",
    colorTheme = "primary",
    errorMessage,
    stopPropagation,
    hiddenBorder = false,
    transparentBackground = false,
    children,
    onClick,
    contentStyle,
    ...props
}) => {
    const handleClick = useCallback<React.MouseEventHandler<HTMLDivElement>>(
        (e) => {
            if (stopPropagation) {
                e.stopPropagation();
            }
            onClick?.({ source: "onClick" });
        },
        [onClick, stopPropagation]
    );
    const handleKeyDown = useHandleEnterKeyDown(() => onClick?.({ source: "onKeyDown" }));

    return (
        // eslint-disable-next-line styled-components-a11y/no-static-element-interactions
        <Host
            $fullHeight={fullHeight}
            $fullWidth={fullWidth}
            $noMargin={noMargin}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role={onClick ? "button" : "presentation"}
            {...props}
        >
            <Content
                $colorTheme={colorTheme}
                $empty={empty}
                $focused={focused}
                $fullHeight={fullHeight}
                $fullWidth={fullWidth}
                $hiddenBorder={hiddenBorder}
                $invalid={invalid}
                $mode={mode}
                $raised={raised}
                $size={size}
                $transparentBackground={transparentBackground}
                style={contentStyle}
            >
                {children}
            </Content>
            {errorMessage ? <ErrorMessage gravity="center_left">{errorMessage}</ErrorMessage> : null}
        </Host>
    );
};
