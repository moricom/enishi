import React, { useEffect, useRef } from "react";

import { styled } from "styled-components";

import type { enishiUIProps } from "@/enishi-ui/components/type";

const Host = styled.div<{ $fullHeight: boolean }>`
    height: ${({ $fullHeight }) => ($fullHeight ? "100%" : "initial")};
`;

type Props = enishiUIProps<{
    leftWidth: number | undefined;
    setLeftWidth: (value: number) => void;
    fullHeight?: boolean;
}>;

export const LeftPane: React.FC<Props> = ({ fullHeight = false, leftWidth, setLeftWidth, children, ...props }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            if (leftWidth === undefined) {
                setLeftWidth(ref.current.clientHeight);
                return;
            }

            ref.current.style.width = `${leftWidth}px`;
            ref.current.style.minWidth = `${leftWidth}px`;
        }
    }, [setLeftWidth, leftWidth]);

    return (
        <Host $fullHeight={fullHeight} ref={ref} {...props}>
            {children}
        </Host>
    );
};
