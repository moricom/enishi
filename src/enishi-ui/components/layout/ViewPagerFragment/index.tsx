import React from "react";

import { styled } from "styled-components";

import type { EnishiUIProps } from "@/enishi-ui/components/type";

const Host = styled.div<{ $index: number; $selectedIndex: number }>`
    position: relative;
    overflow: auto;
    max-width: 100%;
    min-width: 100%;
    box-sizing: border-box;
    transition: all 0.3s ease-out;
    left: ${({ $index }) => -100 * $index}%;
    transform: translate3d(${({ $index, $selectedIndex }) => 100 * ($index - $selectedIndex)}%, 0, 0);
`;

type Props = EnishiUIProps<{
    index?: number;
    selectedIndex?: number;
}>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ViewPagerFragment: (props: Props) => React.ReactElement<Props, any> = ({ children, index, selectedIndex, ...props }) => (
    <Host $index={index ?? 0} $selectedIndex={selectedIndex ?? 0} {...props}>
        {children}
    </Host>
);
