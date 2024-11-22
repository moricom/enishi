import React from "react";

import { css, styled } from "styled-components";

import type { ColorTheme, EnishiUIProps } from "@/enishi-ui/components/type";
import { useHandleEnterKeyDown } from "@/enishi-ui/hooks/useHandleEnterKeyDown";

const sizes = {
    "x-small": {
        height: "1.8rem"
    },
    "small": {
        height: "2rem"
    },
    "medium": {
        height: "2.5rem"
    },
    "large": {
        height: "3rem"
    },
    "x-large": {
        height: "3.5rem"
    }
};

const paddingLeft = 0.5;
const StyledLi = styled.li<{
    $button?: boolean;
    $selected: boolean;
    $indent: number;
    $height: string;
    $rounded?: boolean;
    $colorTheme: ColorTheme;
}>`
    display: flex;
    flex-grow: 1;
    align-items: center;
    box-sizing: border-box;
    min-height: ${({ $height: height }) => height};
    min-width: 6rem;
    width: 100%;
    padding: 0 0.5rem;
    outline-width: 0;
    color: inherit;
    text-decoration: none;
    transition: all ${({ theme: { transitions } }) => `${transitions.duration.standard} ${transitions.easing.easeOut}`};
    padding-left: ${({ $indent }) => ($indent + paddingLeft) * 1}rem;
    ${({ $button, $rounded, theme }) =>
        $button &&
        css`
            cursor: pointer;
            user-select: none;
            border-radius: ${$rounded ? "8px" : "unset"};
            &:hover {
                background-color: ${theme.palette.action.hover(theme.palette.grey[100])};
            }
        `};
    ${({ $selected, theme, $colorTheme }) =>
        $selected &&
        css`
            && {
                background-color: ${theme.palette.action.active(theme.palette[$colorTheme][100])};
                &:hover {
                    background-color: ${theme.palette.action.active(theme.palette[$colorTheme][300])};
                }
            }
        `};
`;

type Props = EnishiUIProps<{
    selected?: boolean;
    button?: boolean;
    indent?: number;
    rounded?: boolean;
}>;

export const Host: React.FC<Props> = ({
    onClick,
    indent = 0,
    colorTheme = "primary",
    selected = false,
    button,
    size = "medium",
    children,
    rounded = false,
    ...props
}) => {
    const handleKeyDown = useHandleEnterKeyDown(onClick);

    return (
        // eslint-disable-next-line styled-components-a11y/no-noninteractive-element-to-interactive-role
        <StyledLi
            $button={button}
            $colorTheme={colorTheme}
            $height={sizes[size].height}
            $indent={indent}
            $rounded={rounded}
            $selected={selected}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={button ? 0 : undefined}
            {...props}
        >
            {children}
        </StyledLi>
    );
};
