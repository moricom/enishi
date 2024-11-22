import React from "react";

import { css, styled } from "styled-components";

import type { enishiUIProps } from "@/enishi-ui/components/type";

const separateListStyle = css`
    && {
        > :nth-child(n + 1) {
            border-bottom: ${({ theme }) => `1px solid ${theme.palette.grey[60]}`};
        }
    }
`;
const Host = styled.ul<{ $fullWidth: boolean; $separateLine: boolean; $gap?: string }>`
    display: flex;
    flex-direction: column;
    gap: ${({ $gap }) => $gap ?? "unset"};
    box-sizing: border-box;
    margin: 0;
    list-style: none;
    -webkit-padding-start: 0;
    width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "initial")};
    padding: 0;
    & + & {
        border-top: 1px solid rgba(0, 0, 0, 0.12);
    }
    ${({ $separateLine }) => $separateLine && separateListStyle}
`;

type Props = enishiUIProps<{
    fullWidth?: boolean;
    separateLine?: boolean;
    gap?: string;
}>;

const ListHost = (
    { className, fullWidth = true, separateLine = false, children, colorTheme: _, ...props }: Props,
    ref: React.ForwardedRef<HTMLUListElement>
) => (
    // eslint-disable-next-line styled-components-a11y/no-noninteractive-element-to-interactive-role
    <Host $fullWidth={fullWidth} $separateLine={separateLine} className={className} ref={ref} role="menu" {...props}>
        {children}
    </Host>
);

export const List = React.memo(React.forwardRef<HTMLUListElement, Props>(ListHost));
