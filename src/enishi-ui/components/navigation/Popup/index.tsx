import React, { useCallback, useEffect, useRef } from "react";

import { createPortal } from "react-dom";
import { css, keyframes, styled } from "styled-components";

import { usePopupRootElement } from "@/enishi-ui/components/navigation/Popup/usePopupRootElement";
import type { EnishiUIProps } from "@/enishi-ui/components/type";
import { useHandleEnterKeyDown } from "@/enishi-ui/hooks/useHandleEnterKeyDown";
import { useRect } from "@/enishi-ui/hooks/useRect";
import { mergeRefs } from "@/enishi-ui/lib/mergeRefs";

const visibilityAnimationLeftBottom = keyframes`
    0% {
        transform: scale(0, 0);
        transform-origin: top right;
        overflow: hidden;
    }

    100% {
        transform: scale(1, 1);
        transform-origin: top right;
        overflow: auto;
    }
`;

const visibilityAnimationRightBottom = keyframes`
    0% {
        transform: scale(0, 0);
        transform-origin: top left;
        overflow: hidden;
    }

    100% {
        transform: scale(1, 1);
        transform-origin: top left;
        overflow: auto;
    }
`;

const hiddenCss = css`
    display: none;
    width: 0;
    height: 0;
    padding: 0;
`;

const visibleStyle = css`
    && {
        top: 0;
        left: 0;
    }
`;

type Position = "left_bottom" | "left_top" | "right_bottom" | "right_top";
const Host = styled.div<{ $visible: boolean; $hidden: boolean; $disableAnimation: boolean; $position: Position }>`
    position: absolute;
    border-radius: 2px;
    transition: ${({ $disableAnimation }) => ($disableAnimation ? "none" : "all 0.3s ease-out")};
    background-color: ${({ theme }) => (theme.mode === "light" ? theme.palette.background[10] : theme.palette.background[100])};
    box-shadow: ${({ theme }) => theme.shadows["8"]};
    border-radius: 4px;
    animation-name: ${({ $disableAnimation, $visible, $position }) =>
        // prettier-ignore
        $disableAnimation            ? "none"
      : !$visible                    ? "none" // eslint-disable-line no-negated-condition
      : $position === "left_bottom"  ? css`${visibilityAnimationRightBottom}`
      : $position === "left_top"     ? css`${visibilityAnimationRightBottom}`
      : $position === "right_bottom" ? css`${visibilityAnimationLeftBottom}`
      :                                css`${visibilityAnimationLeftBottom}`};
    animation-duration: 0.2s;
    animation-timing-function: ease-in-out;
    && {
        ${({ $hidden }) => $hidden && hiddenCss}
    }
    ${({ $visible }) => !$visible && visibleStyle}
    z-index: 1000;
`;

type Props = EnishiUIProps<{
    visible?: boolean;
    onClose?: () => void;
    className?: string;
    targetElement: HTMLElement | null;
    children?: React.ReactNode;
    disableAnimation?: boolean;
    position?: Position;
    stopPropagation?: boolean;
    positionMargin?: number;
}>;

// eslint-disable-next-line max-statements
const PopupHost = (
    {
        visible = false,
        onClose,
        className,
        targetElement,
        disableAnimation = false,
        position = "right_bottom",
        stopPropagation,
        onClick,
        positionMargin = 4,
        children,
        style,
        ...props
    }: Props,
    ref: React.ForwardedRef<HTMLDivElement>
) => {
    const { rect } = useRect(targetElement);
    const popupRootElement = usePopupRootElement();

    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (stopPropagation) {
                e.stopPropagation();
            }
            void onClick?.();
        },
        [onClick, stopPropagation]
    );
    const handleKeyDown = useHandleEnterKeyDown(onClick);

    const hostRef = useRef<HTMLDivElement>(null);
    const onPress = useCallback(
        (e: Event) => {
            if (!visible || !hostRef.current) {
                return;
            }
            if (!e.target) {
                return;
            }

            // https://github.com/Microsoft/TypeScript/issues/15394
            if (!hostRef.current.contains(e.target as Node)) {
                onClose?.();
            }
        },
        [onClose, visible]
    );
    useEffect(() => {
        window.addEventListener("mousedown", onPress, false);
        window.addEventListener("ontouchstart", onPress, false);
        return () => {
            window.removeEventListener("mousedown", onPress, false);
            window.removeEventListener("ontouchstart", onPress, false);
        };
    }, [onPress]);

    if (!targetElement || !rect) {
        return null;
    }

    if (!visible) {
        return null;
    }

    const r = targetElement.getBoundingClientRect();

    return createPortal(
        // eslint-disable-next-line styled-components-a11y/interactive-supports-focus
        <Host
            $disableAnimation={disableAnimation}
            $hidden={!visible}
            $position={position}
            $visible={visible}
            className={className}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            ref={ref ? mergeRefs([hostRef, ref]) : hostRef}
            role="menu"
            style={{
                ...style,
                // prettier-ignore
                ...(
                    position === "right_bottom" ? { top: `${r.top + r.height + positionMargin}px`, right: `${window.innerWidth - r.right}px` }
                  : position === "left_bottom"  ? { top: `${r.top + r.height + positionMargin}px`, left: `${r.left}px` }
                  : position === "right_top"    ? { bottom: `${window.innerHeight - r.top + positionMargin}px`, left: `${window.innerWidth - (window.innerWidth - r.left)}px` }
                  :                               { bottom: `${window.innerHeight - r.top + positionMargin}px`, right: `${window.innerWidth - r.right}px` }
                )
            }}
            {...props}
        >
            {children}
        </Host>,
        popupRootElement
    );
};

export const Popup = React.forwardRef<HTMLDivElement, Props>(PopupHost);
