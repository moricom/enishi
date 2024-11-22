import React from "react";

import { styled } from "styled-components";

import type { EnishiUIProps } from "@/enishi-ui/components/type";
import { useHandleEnterKeyDown } from "@/enishi-ui/hooks/useHandleEnterKeyDown";

const Host = styled.div<{ $flexGrow: number; $fullHeight: boolean; $fullWidth: boolean; $noMargin: boolean }>`
    background-color: ${({ theme }) => (theme.mode === "light" ? theme.palette.background[20] : theme.palette.background[40])};
    box-shadow: ${({ theme }) => theme.shadows["5"]};
    border-radius: 0.5rem;
    flex-grow: ${({ $flexGrow }) => $flexGrow};
    margin: ${({ $noMargin }) => ($noMargin ? "0" : "0.5rem 0.5rem")};
    max-height: ${({ $noMargin }) => ($noMargin ? "100%" : "calc(100% - 1rem)")};
    max-width: ${({ $noMargin }) => ($noMargin ? "100%" : "calc(100% - 1rem)")};
    width: ${({ $fullWidth, $noMargin }) => ($fullWidth ? ($noMargin ? "100%" : "calc(100% - 1rem)") : "initial")};
    height: ${({ $fullHeight, $noMargin }) => ($fullHeight ? ($noMargin ? "100%" : "calc(100% - 1rem)") : "initial")};
    display: flex;
    flex-direction: column;
    overflow: auto;
`;

type Props = EnishiUIProps<{
    flexibleWidth?: boolean | number;
    fullHeight?: boolean;
    fullWidth?: boolean;
    noMargin?: boolean;
}>;

const CardHost = (
    { flexibleWidth, fullHeight = false, fullWidth = false, noMargin = false, onClick, children, ...props }: Props,
    ref: React.ForwardedRef<HTMLDivElement>
) => {
    const handleEnterKeyDown = useHandleEnterKeyDown(onClick);

    return (
        // eslint-disable-next-line styled-components-a11y/no-static-element-interactions
        <Host
            $flexGrow={
                // prettier-ignore
                typeof flexibleWidth === "number" ? flexibleWidth
              :                                     flexibleWidth ? 1 : 0
            }
            $fullHeight={fullHeight}
            $fullWidth={fullWidth}
            $noMargin={noMargin}
            onClick={onClick}
            onKeyDown={handleEnterKeyDown}
            ref={ref}
            role={onClick ? "button" : "presentation"}
            // eslint-disable-next-line styled-components-a11y/no-noninteractive-tabindex
            tabIndex={0}
            {...props}
        >
            {children}
        </Host>
    );
};

export const Card = React.forwardRef<HTMLDivElement, Props>(CardHost);
