import React from "react";

import { styled } from "styled-components";

import type { TabBarItem } from "@/enishi-ui/components/navigation/TabBarItem";
import type { EnishiUIProps } from "@/enishi-ui/components/type";

import { isNonNullable } from "@/utils/isNonNullable";

const Host = styled.div`
    display: flex;
    position: relative;
    width: fit-content;
`;

const Border = styled.div<{ $selectedIndex: number; $width: string }>`
    position: absolute;
    bottom: -0.2rem;
    left: calc(${({ $selectedIndex, $width }) => `${$selectedIndex} * ${$width}`});
    min-width: ${({ $width }) => $width};
    width: ${({ $width }) => $width};
    height: 0.2rem;
    background-color: ${({ theme }) => theme.palette.primary[100]};
    border-radius: 2px;
    transition: all ${({ theme: { transitions } }) => `${transitions.duration.shorter} ${transitions.easing.easeOut}`};
`;

type Props = EnishiUIProps<{
    selectedValue: string;
    onChange: (value: string) => void;
    children: ReturnType<typeof TabBarItem> | ReturnType<typeof TabBarItem>[];
    itemWidth?: string;
}>;

export const TabBar: React.FC<Props> = ({ selectedValue, onChange, children, itemWidth = "6rem", ...props }) => {
    const items = React.Children.toArray(children);
    const selectedIndex = items
        .filter(React.isValidElement)
        .map((x) => x?.props)
        .filter(isNonNullable)
        .findIndex((x) => (x as React.ComponentPropsWithRef<typeof TabBarItem>).value === selectedValue);
    return (
        <Host {...props}>
            {Array.from(items.entries()).map(([i, x]) => {
                if (!React.isValidElement(x)) {
                    return x;
                }
                const itemProps = x.props as React.ComponentPropsWithRef<typeof TabBarItem>;
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
                const tabBarItem = x as any;
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                return React.cloneElement<React.ComponentPropsWithRef<typeof TabBarItem>>(tabBarItem, {
                    key: i,
                    selected: itemProps.value === selectedValue,
                    onClick: (...args) => {
                        void itemProps.onClick?.(...args);
                        onChange(itemProps.value);
                    },
                    style: {
                        width: itemWidth
                    }
                });
            })}
            <Border $selectedIndex={selectedIndex} $width={itemWidth} />
        </Host>
    );
};
