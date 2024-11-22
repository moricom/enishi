import React, { useMemo, useState } from "react";

import { createPortal } from "react-dom";
import { css, styled } from "styled-components";

import type { enishiUIProps } from "@/enishi-ui/components/type";
import { useRect } from "@/enishi-ui/hooks/useRect";

import { config } from "@/config";

const Host = styled.div<{ $x: number; $y: number; $arrow: boolean; $hidden: boolean }>`
    position: absolute;
    z-index: 10000;
    will-change: transform;
    top: 0px;
    left: 0px;
    transform: translate3d(${({ $x }) => $x}px, ${({ $y }) => $y}px, 0px);
    color: ${({ theme }) => theme.palette.background[10]};
    padding: 4px 8px;
    font-size: 0.7rem;
    word-wrap: break-word;
    border-radius: 4px;
    background-color: rgba(100, 100, 100, 0.9);
    visibility: ${({ $hidden }) => ($hidden ? "hidden" : "visible")};
    box-shadow: ${({ theme }) => theme.shadows["3"]};
    ${({ $arrow }) =>
        $arrow &&
        css`
            &::before {
                content: "";
                position: absolute;
                transform: rotate(-45deg);
                max-width: 0;
                max-height: 0;
                top: -3.8px;
                left: 0.5rem;
                border-radius: 1px;
                border: 4px solid;
                border-color: rgba(100, 100, 100, 0.9) rgba(100, 100, 100, 0.9) transparent transparent;
                box-shadow:
                    0px -1px 2px -2px rgb(0 0 0 / 90%),
                    1px 0px 2px -2px rgb(0 0 0 / 90%);
            }
        `}
`;

type Props = enishiUIProps<{
    open: boolean;
    targetRect: DOMRect | null;
    arrow?: boolean;
}>;

export const TooltipPopper: React.FC<Props> = ({ open, arrow = false, children, targetRect, colorTheme: _, ...props }) => {
    const [element, setElement] = useState<HTMLDivElement | null>(null);
    const { rect } = useRect(element);
    const toolTipRootElement = useMemo(() => document.getElementById(config.TOOLTIP_ROOT_ELEMENT_ID), []);

    if (!toolTipRootElement) {
        console.warn("The tooltip root element not found");
        return null;
    }

    if (!open || targetRect === null) {
        return null;
    }

    // TODO: x座標の計算ロジック修正
    const { x } = targetRect;
    return createPortal(
        <Host $arrow={arrow} $hidden={rect === null} $x={x} $y={targetRect.y + targetRect.height} ref={setElement} {...props}>
            {children}
        </Host>,
        toolTipRootElement
    );
};
