import React, { useCallback, useEffect, useRef, useState } from "react";

import { styled } from "styled-components";

import { TopPane } from "@/enishi-ui/components/layout/ResizableSplitPane/TopPane";
import type { enishiUIProps } from "@/enishi-ui/components/type";

const Host = styled.div<{ $fullWidth: boolean; $fullHeight: boolean }>`
    height: ${({ $fullHeight }) => ($fullHeight ? "100%" : "initial")};
    width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "initial")};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const DividerHitBox = styled.div`
    cursor: row-resize;
    align-self: stretch;
    display: flex;
    align-items: center;
    padding: 0.25rem 1rem;
    transition: all ${({ theme: { transitions } }) => `${transitions.duration.short} ${transitions.easing.easeOut}`};
    &:hover {
        padding: 0.25rem 0.5rem;
    }
`;

const Divider = styled.div<{ $dragging: boolean }>`
    width: 100%;
    border-bottom: 1px solid ${({ theme, $dragging }) => ($dragging ? theme.palette.primary[100] : theme.palette.grey[30])};
    transition: all ${({ theme: { transitions } }) => `${transitions.duration.short} ${transitions.easing.easeOut}`};
    *:hover > & {
        border-bottom: 1px solid ${({ theme }) => theme.palette.primary[100]};
    }
`;

const BottomPane = styled.div<{ $fullWidth: boolean }>`
    flex-grow: 1;
    width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "initial")};
`;

type Props = enishiUIProps<{
    top: React.ReactElement;
    bottom: React.ReactElement;
    bottomStyle?: React.CSSProperties;
    minHeight?: number;
    defaultTopPaneHeight?: number;
    fullWidth?: boolean;
    fullHeight?: boolean;
}>;

export const HorizontalResizableSplitPane: React.FunctionComponent<Props> = ({
    minHeight = 120,
    defaultTopPaneHeight,
    top,
    bottom,
    bottomStyle,
    fullWidth = false,
    fullHeight = false,
    ...props
}) => {
    const [topHeight, setTopHeight] = useState<number | undefined>(defaultTopPaneHeight);
    const [separatorYPosition, setSeparatorYPosition] = useState<number | undefined>(undefined);
    const [dragging, setDragging] = useState(false);

    const splitPaneRef = useRef<HTMLDivElement>(null);

    const onMouseDown = useCallback((e: React.MouseEvent) => {
        setSeparatorYPosition(e.clientY);
        setDragging(true);
    }, []);

    const onTouchStart = useCallback((e: React.TouchEvent) => {
        if (e.touches[0]) {
            setSeparatorYPosition(e.touches[0].clientY);
        }
        setDragging(true);
    }, []);

    const onMouseUp = useCallback(() => {
        setDragging(false);
    }, []);

    useEffect(() => {
        if (!dragging) {
            return () => undefined;
        }

        // eslint-disable-next-line max-statements
        const onMove = (clientY: number) => {
            if (topHeight && separatorYPosition) {
                const newTopHeight = topHeight + clientY - separatorYPosition;
                setSeparatorYPosition(clientY);

                if (newTopHeight < minHeight) {
                    setTopHeight(minHeight);
                    return;
                }

                if (splitPaneRef.current) {
                    const splitPaneHeight = splitPaneRef.current.clientWidth;

                    if (newTopHeight > splitPaneHeight - minHeight) {
                        setTopHeight(splitPaneHeight - minHeight);
                        return;
                    }
                }

                setTopHeight(newTopHeight);
            }
        };
        const onMouseMove = (e: MouseEvent) => {
            e.preventDefault();
            onMove(e.clientY);
        };

        const onTouchMove = (e: TouchEvent) => {
            if (!e.touches[0]) {
                return;
            }
            onMove(e.touches[0].clientY);
        };
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("touchmove", onTouchMove);
        document.addEventListener("mouseup", onMouseUp);

        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("touchmove", onTouchMove);
            document.removeEventListener("mouseup", onMouseUp);
        };
    }, [dragging, minHeight, onMouseUp, separatorYPosition, topHeight]);

    return (
        <Host $fullHeight={fullHeight} $fullWidth={fullWidth} ref={splitPaneRef} {...props}>
            <TopPane fullWidth={fullWidth} setTopHeight={setTopHeight} topHeight={topHeight}>
                {top}
            </TopPane>
            <DividerHitBox onMouseDown={onMouseDown} onTouchEnd={onMouseUp} onTouchStart={onTouchStart} role="presentation">
                <Divider $dragging={dragging} />
            </DividerHitBox>
            <BottomPane $fullWidth={fullWidth} style={bottomStyle}>
                {bottom}
            </BottomPane>
        </Host>
    );
};
