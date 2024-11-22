import { css, styled } from "styled-components";

const floatingWrapperCssWhenOpen = css`
    && {
        background-color: rgba(0, 0, 0, 0.3);
        min-width: 100vw;
        width: 100vw;
    }
`;

export const FloatingWrapper = styled.div<{ open: boolean }>`
    width: 0;
    transition: background-color ${({ theme: { transitions } }) => `${transitions.duration.standard} ${transitions.easing.easeOut}`};
    min-height: 100%;
    height: 100%;
    position: absolute;
    ${({ open }) => open && floatingWrapperCssWhenOpen};
    z-index: 100;
`;
