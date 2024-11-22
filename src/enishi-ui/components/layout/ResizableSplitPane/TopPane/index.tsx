import React, { useEffect, useRef } from "react";

import { styled } from "styled-components";

import type { EnishiUIProps } from "@/enishi-ui/components/type";

const Host = styled.div<{ $fullWidth: boolean }>`
    width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "initial")};
`;

type Props = EnishiUIProps<{
    topHeight: number | undefined;
    setTopHeight: (value: number) => void;
    fullWidth?: boolean;
}>;

export const TopPane: React.FC<Props> = ({ fullWidth = false, topHeight, setTopHeight, children, ...props }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            if (topHeight === undefined) {
                setTopHeight(ref.current.clientHeight);
                return;
            }

            ref.current.style.height = `${topHeight}px`;
            ref.current.style.minHeight = `${topHeight}px`;
        }
    }, [setTopHeight, topHeight]);

    return (
        <Host $fullWidth={fullWidth} ref={ref} {...props}>
            {children}
        </Host>
    );
};
