import React, { useCallback, useMemo, useState } from "react";

import { keyframes, styled } from "styled-components";

import type { ColorTheme } from "@/enishi-ui/components/type";

const rippleKeyframes = keyframes`
    0% {
        opacity: 1;
        transform: scale(0);
    }
    100% {
        opacity: 0;
        transform: scale(1);
    }
`;

const RippleEffect = styled.span<{ $colorTheme: ColorTheme }>`
    display: inline-block;
    position: absolute;
    border-radius: 50%;
    background-color: ${({ theme, $colorTheme }) => theme.palette[$colorTheme][80]};
    animation: ${rippleKeyframes} 0.3s ease-out both;
    pointer-events: none;
`;

type RippleEvent = {
    radius: number;
    id: number;
    opacity: number;
    position: [number, number];
};

type Props<T extends React.ReactElement> = {
    component: T;
    disabled?: boolean;
    fixed?: boolean;
    children?: React.ReactNode;
    colorTheme?: ColorTheme;
};
const RippleHost = <
    T extends React.ReactElement<{ style?: React.CSSProperties; onClick?: (e: React.MouseEvent) => void; children?: React.ReactNode }>
>({
    component,
    colorTheme = "primary",
    children,
    disabled,
    fixed,
    ...props
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
Props<T>): React.ReactElement<unknown, any> => {
    const [ripples, setRipples] = useState<RippleEvent[]>([]);

    const handleClick = useCallback(
        // eslint-disable-next-line max-statements
        (e: React.MouseEvent) => {
            if (disabled) {
                component.props.onClick?.(e);
                return;
            }

            const target = e.currentTarget;
            const rect = target.getBoundingClientRect();
            component.props.onClick?.(e);

            if (fixed) {
                const radius = Math.min(rect.width, rect.height) / 2;

                setRipples(
                    ripples.concat({
                        radius,
                        id: e.timeStamp,
                        opacity: 1,
                        position: [rect.width / 2 - radius, rect.height / 2 - radius]
                    })
                );
            } else {
                const radius = Math.max(rect.width, rect.height);

                setRipples(
                    ripples.concat({
                        radius,
                        id: e.timeStamp,
                        opacity: 1,
                        position: [e.clientX - rect.left - radius, e.clientY - rect.top - radius]
                    })
                );
            }
        },
        [component.props, disabled, fixed, ripples]
    );

    const Element = useMemo(
        () =>
            React.cloneElement(component, {
                ...props,
                style: {
                    position: "relative",
                    overflow: "hidden",
                    verticalAlign: "top",
                    ...component.props.style
                },
                onClick: handleClick,
                children: [
                    ...React.Children.toArray(component.props.children),
                    children,
                    ripples.map(({ id, position, radius }) => (
                        <RippleEffect
                            $colorTheme={colorTheme}
                            key={id}
                            // eslint-disable-next-line react/jsx-no-bind
                            onAnimationEnd={() => {
                                setRipples(ripples.filter((x) => x.id !== id));
                            }}
                            style={{
                                left: `${position[0]}px`,
                                top: `${position[1]}px`,
                                width: `${radius * 2}px`,
                                height: `${radius * 2}px`
                            }}
                        />
                    ))
                ]
            }),
        [children, colorTheme, component, handleClick, props, ripples]
    );

    return Element;
};

export const Ripple = React.memo(RippleHost);
