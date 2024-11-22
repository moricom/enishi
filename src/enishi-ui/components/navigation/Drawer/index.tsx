import React, { useCallback, useRef, useState } from "react";

import { FloatingWrapper } from "@/enishi-ui/components/navigation/Drawer/FloatingWrapper";
import { Host } from "@/enishi-ui/components/navigation/Drawer/Host";
import type { enishiUIProps } from "@/enishi-ui/components/type";
import type { SwipeEvent } from "@/enishi-ui/hooks/useSwipe";
import { useSwipe } from "@/enishi-ui/hooks/useSwipe";

type Props = enishiUIProps<{
    open: boolean;
    variant?: "permanent" | "temporary";
    onClose?: () => void;
    onOpen?: () => void;
    drawerWidth?: string;
}>;

const distanceCoefficient = 2;
const disableSwipeDistance = 55;
// eslint-disable-next-line max-statements
const DrawerHost: React.FC<Props> = ({ open, onClose, onOpen, variant = "permanent", drawerWidth, children, ...props }) => {
    const drawerHostRef = useRef<HTMLDivElement>(null);
    const stopPropagationClickHandler = useCallback<React.MouseEventHandler<HTMLElement>>((e) => {
        e.stopPropagation();
    }, []);
    const [swipeWidth, setSwipeWidth] = useState<number>(0);

    const onSwipe = useCallback(
        // eslint-disable-next-line max-statements
        (e: SwipeEvent) => {
            if (e.direction !== "left" && e.direction !== "right") {
                return;
            }
            const rect = drawerHostRef.current?.getClientRects()[0];
            if (!rect) {
                return;
            }

            const distance = e.distance * distanceCoefficient;
            if (e.direction === "left") {
                if (distance < disableSwipeDistance) {
                    return;
                }
                if (rect.width / 2 < distance && !open) {
                    onOpen?.();
                    setSwipeWidth(0);
                    return;
                }
                setSwipeWidth(distance);
            } else if (e.direction === "right" && open) {
                if (rect.width / 2 < distance) {
                    onClose?.();
                    setSwipeWidth(0);
                    return;
                }
                setSwipeWidth(rect.width - e.distance);
            }
        },
        [onClose, onOpen, open]
    );
    const onSwipeEnd = useCallback(() => {
        setSwipeWidth(0);
    }, []);
    useSwipe({ onSwipe, onSwipeEnd });

    const floatingWrapperClickHandler = useCallback(() => open && onClose?.(), [onClose, open]);

    if (variant === "temporary") {
        return (
            <FloatingWrapper aria-hidden="true" onClick={floatingWrapperClickHandler} open={open}>
                <Host
                    aria-hidden="true"
                    drawerWidth={drawerWidth}
                    onClick={stopPropagationClickHandler}
                    open={open}
                    ref={drawerHostRef}
                    swipeWidth={swipeWidth}
                    variant="temporary"
                    {...props}
                >
                    {children}
                </Host>
            </FloatingWrapper>
        );
    }

    return (
        <Host drawerWidth={drawerWidth} open={open} variant="permanent" {...props}>
            {children}
        </Host>
    );
};

export const Drawer = React.memo(DrawerHost);
