import React, { useCallback, useEffect, useRef, useState } from "react";

import { styled } from "styled-components";

import { LeftPane } from "@/enishi-ui/components/layout/ResizableSplitPane/LeftPane";
import type { ColorTheme, EnishiUIProps } from "@/enishi-ui/components/type";

const Host = styled.div<{ $fullWidth: boolean; $fullHeight: boolean }>`
    height: ${({ $fullHeight }) => ($fullHeight ? "100%" : "initial")};
    width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "initial")};
    display: flex;
    flex-direction: row;
    align-items: flex-start;
`;

const DividerHitBox = styled.div`
    cursor: col-resize;
    align-self: stretch;
    display: flex;
    align-items: center;
    padding: 0 0.25rem;
    position: relative;
    transition: all ${({ theme: { transitions } }) => `${transitions.duration.short} ${transitions.easing.easeOut}`};
`;

const Divider = styled.div<{
    $dragging: boolean;
    $dividerHitBoxColor?: string;
    $dividerHitBoxHoverColor?: string;
    $colorTheme: ColorTheme;
}>`
    height: 100%;
    position: absolute;
    border-right: 1px solid
        ${({ theme, $dragging, $dividerHitBoxColor, $colorTheme }) =>
            $dragging ? theme.palette[$colorTheme][100] : ($dividerHitBoxColor ?? theme.palette.grey[30])};
    transition: all ${({ theme: { transitions } }) => `${transitions.duration.short} ${transitions.easing.easeOut}`};
    *:hover > & {
        border-right: 1px solid
            ${({ theme, $dividerHitBoxHoverColor, $colorTheme }) => $dividerHitBoxHoverColor ?? theme.palette[$colorTheme][100]};
        transform: scaleX(3);
    }
`;

const RightPane = styled.div<{ $fullHeight: boolean }>`
    flex-grow: 1;
    height: ${({ $fullHeight }) => ($fullHeight ? "100%" : "initial")};
`;

type Props = EnishiUIProps<{
    renderLeft: () => React.ReactElement;
    renderRight: () => React.ReactElement;
    rightStyle?: React.CSSProperties;
    dividerHitBoxStyle?: React.CSSProperties;
    dividerHitBoxColor?: string;
    dividerHitBoxHoverColor?: string;
    minWidth?: number;
    maxWidth?: number;
    defaultLeftPaneWidth?: number;
    fullWidth?: boolean;
    fullHeight?: boolean;
    ignoreBorderWidthCalculation?: boolean;
    leftPaneWidth?: number;
    onResize?: (newLeftWidth: number) => void;
}>;

// eslint-disable-next-line max-statements
export const VerticalResizableSplitPane: React.FunctionComponent<Props> = ({
    minWidth = 120,
    maxWidth,
    defaultLeftPaneWidth,
    renderLeft,
    renderRight,
    rightStyle,
    dividerHitBoxStyle,
    dividerHitBoxColor,
    dividerHitBoxHoverColor,
    colorTheme = "primary",
    fullWidth = false,
    fullHeight = false,
    ignoreBorderWidthCalculation = false,
    leftPaneWidth: leftPaneWidthProps,
    onResize,
    ...props
}) => {
    const [leftWidth, setLeftWidth] = useState<number | undefined>(defaultLeftPaneWidth);
    const [dragging, setDragging] = useState(false);

    const splitPaneRef = useRef<HTMLDivElement>(null);
    const dividerHitBoxRef = useRef<HTMLDivElement>(null);

    const onMouseDown = useCallback(() => {
        setDragging(true);
    }, []);

    const onMouseUp = useCallback(() => {
        setDragging(false);
    }, []);

    useEffect(() => {
        if (!dragging) {
            return () => undefined;
        }

        const onMove = (clientX: number) => {
            if (dragging) {
                const dividerHitBoxWidth = dividerHitBoxRef.current?.getClientRects().item(0)?.width;
                let newLeftWidth = clientX - (splitPaneRef.current?.getClientRects().item(0)?.left ?? 0);

                if (!ignoreBorderWidthCalculation) {
                    newLeftWidth -= dividerHitBoxWidth ? dividerHitBoxWidth / 2 : 0;
                }

                if (newLeftWidth < minWidth || (maxWidth && newLeftWidth > maxWidth)) {
                    return;
                }
                setLeftWidth(newLeftWidth);
                onResize?.(newLeftWidth);
            }
        };
        const onMouseMove = (e: MouseEvent) => {
            e.preventDefault();
            onMove(e.clientX);
        };

        const onTouchMove = (e: TouchEvent) => {
            if (!e.touches[0]) {
                return;
            }
            onMove(e.touches[0].clientX);
        };
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("touchmove", onTouchMove);
        document.addEventListener("mouseup", onMouseUp);

        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("touchmove", onTouchMove);
            document.removeEventListener("mouseup", onMouseUp);
        };
    }, [dragging, minWidth, leftWidth, splitPaneRef, dividerHitBoxRef, maxWidth, ignoreBorderWidthCalculation, onResize, onMouseUp]);

    const dividerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!dividerRef.current) {
            return;
        }
        if (dragging) {
            dividerRef.current.style.transform = "scaleX(5)";
        } else {
            dividerRef.current.style.transform = "";
        }
    }, [dragging]);
    const handleSetLeftWidth = useCallback<React.ComponentPropsWithRef<typeof LeftPane>["setLeftWidth"]>(
        (value) => {
            setLeftWidth(value);
            onResize?.(value);
        },
        [onResize]
    );

    return (
        <Host $fullHeight={fullHeight} $fullWidth={fullWidth} ref={splitPaneRef} {...props}>
            <LeftPane fullHeight={fullHeight} leftWidth={leftPaneWidthProps ?? leftWidth} setLeftWidth={handleSetLeftWidth}>
                {renderLeft()}
            </LeftPane>
            <DividerHitBox
                onMouseDown={onMouseDown}
                onTouchEnd={onMouseUp}
                onTouchStart={onMouseDown}
                ref={dividerHitBoxRef}
                role="presentation"
                style={dividerHitBoxStyle}
            >
                <Divider
                    $colorTheme={colorTheme}
                    $dividerHitBoxColor={dividerHitBoxColor}
                    $dividerHitBoxHoverColor={dividerHitBoxHoverColor}
                    $dragging={dragging}
                    ref={dividerRef}
                />
            </DividerHitBox>
            <RightPane $fullHeight={fullHeight} style={rightStyle}>
                {renderRight()}
            </RightPane>
        </Host>
    );
};
