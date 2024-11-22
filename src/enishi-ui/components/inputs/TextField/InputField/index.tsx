import { css, styled } from "styled-components";

import type { Size } from "@/enishi-ui/components/type";

import type { DefaultTheme } from "styled-components";

const sizes = {
    "x-small": {
        height: "1.8rem",
        heightWithoutLabel: "1.6rem",
        multiline: {
            paddingTop: "0.1rem"
        }
    },
    "small": {
        height: "2rem",
        heightWithoutLabel: "1.9rem",
        multiline: {
            paddingTop: "0.25rem"
        }
    },
    "medium": {
        height: "2.6rem",
        heightWithoutLabel: "2.4rem",
        multiline: {
            paddingTop: "0.55rem"
        }
    },
    "large": {
        height: "3rem",
        heightWithoutLabel: "2.3rem",
        multiline: {
            paddingTop: "0.54rem"
        }
    },
    "x-large": {
        height: "3.2rem",
        heightWithoutLabel: "2.4rem",
        multiline: {
            paddingTop: "0.25rem"
        }
    }
};

export const InputField = styled.input<{
    $withLabel: boolean;
    $resizableY: boolean;
    $fullHeight: boolean;
    $inputSize: Size;
    $multiline: boolean;
    $focused: boolean;
    $disabled: boolean;
    $fontWeight?: keyof DefaultTheme["typography"]["fontWeight"];
}>`
    align-items: ${({ $multiline }) => ($multiline ? "flex-start" : "center")};
    display: flex;
    justify-content: left;
    min-height: ${({ $withLabel, $inputSize }) => ($withLabel ? sizes[$inputSize].height : sizes[$inputSize].heightWithoutLabel)};
    width: 100%;
    border-width: 0;
    outline-width: 0;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: inherit;
    padding: 0;
    padding-left: 0.6rem;
    padding-right: 0.6rem;
    padding-top: ${({ $withLabel: withLabel }) => (withLabel ? "1rem" : 0)};
    box-sizing: border-box;
    border-radius: 8px;
    background-color: transparent;
    transition: all ${({ theme: { transitions } }) => `${transitions.duration.standard} ${transitions.easing.easeOut}`};
    color: ${({ $focused, $disabled, theme }) =>
        $focused ? theme.palette.text.primary : $disabled ? theme.palette.text.disabled : theme.palette.text.primary};
    ${({ $multiline: multiline, $fullHeight: fullHeight, $resizableY: resizableY, $inputSize: inputSize, $withLabel: withLabel }) =>
        multiline
            ? css`
                  && {
                      height: ${fullHeight ? "100%" : "5rem"};
                      resize: ${resizableY ? "vertical" : "none"};
                      padding-top: ${sizes[inputSize].multiline.paddingTop};
                      margin-top: ${withLabel ? "1rem" : "0rem"};
                      white-space: pre-wrap;
                  }
              `
            : ""}
    font-weight: ${({ $fontWeight, theme }) => ($fontWeight ? theme.typography.fontWeight[$fontWeight] : "initial")};
    &::-webkit-calendar-picker-indicator {
        cursor: pointer;
        -webkit-appearance: none;
        width: 15px;
        padding: auto;
        margin: auto 0;
        color-scheme: ${({ theme }) => (theme.mode === "dark" ? "dark" : "light")};
    }
`;
