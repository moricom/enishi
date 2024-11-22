import React from "react";

import { styled } from "styled-components";

import type { ViewPagerFragment } from "@/enishi-ui/components/layout/ViewPagerFragment";
import type { enishiUIProps } from "@/enishi-ui/components/type";

const Host = styled.div<{ $fullWidth: boolean; $fullHeight: boolean }>`
    display: flex;
    overflow: hidden;
    width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "initial")};
    height: ${({ $fullHeight }) => ($fullHeight ? "100%" : "initial")};
`;

type Props = enishiUIProps<{
    children: ReturnType<typeof ViewPagerFragment> | ReturnType<typeof ViewPagerFragment>[];
    fullWidth?: boolean;
    fullHeight?: boolean;
    selectedIndex: number;
}>;

export const ViewPager: React.FC<Props> = ({ children, className, fullWidth = false, fullHeight = false, selectedIndex, ...props }) => {
    const fragments = Array.isArray(children) ? children : [children];
    return (
        <Host $fullHeight={fullHeight} $fullWidth={fullWidth} className={className} {...props}>
            {Array.from(fragments.entries()).map(([i, x]) =>
                React.cloneElement<React.ComponentPropsWithRef<typeof ViewPagerFragment>>(x, {
                    key: i,
                    index: i,
                    selectedIndex
                })
            )}
        </Host>
    );
};
