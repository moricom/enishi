import React, { useCallback, useEffect, useState } from "react";

import { styled } from "styled-components";

import { TooltipPopper } from "@/enishi-ui/components/dataDisplay/Tooltip/TooltipPopper";
import type { enishiUIProps } from "@/enishi-ui/components/type";
import { useHover } from "@/enishi-ui/hooks/useHover";
import { useRect } from "@/enishi-ui/hooks/useRect";

const Content = styled.div`
    width: fit-content;
`;

type Props = enishiUIProps<{
    content: React.ReactNode;
    arrow?: boolean;
    contentProps?: enishiUIProps;
}>;

const TooltipHost = ({ content, arrow, children, contentProps, colorTheme, ...props }: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
    const [element, setElement] = useState<HTMLDivElement | null>(null);
    const { rect, update } = useRect(element);

    const [hovered, { setElement: setHoverTargetElement }] = useHover();
    useEffect(() => {
        if (hovered) update();
    }, [hovered, update]);

    const handleRef = useCallback(
        (e: HTMLDivElement | null) => {
            setElement(e);
            setHoverTargetElement(e);
        },
        [setHoverTargetElement]
    );

    return (
        <div ref={ref} {...props}>
            <Content ref={handleRef} {...contentProps}>
                {children}
            </Content>
            {content === undefined || content === null ? null : (
                <TooltipPopper arrow={arrow} colorTheme={colorTheme} data-w-id="tooltip-popper-field" open={hovered} targetRect={rect}>
                    {content}
                </TooltipPopper>
            )}
        </div>
    );
};

export const Tooltip = React.forwardRef<HTMLDivElement, Props>(TooltipHost);
