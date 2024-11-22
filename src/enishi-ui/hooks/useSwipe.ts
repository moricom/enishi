import { useEffect } from "react";

export type SwipeEvent = { direction: "down" | "left" | "right" | "up"; distance: number };

export const useSwipe = ({ onSwipe, onSwipeEnd }: { onSwipe: (event: SwipeEvent) => void; onSwipeEnd?: () => void }) => {
    useEffect(() => {
        let xDown: number | null = null;
        let yDown: number | null = null;

        const handleTouchStart = (evt: TouchEvent) => {
            // eslint-disable-next-line prefer-destructuring
            const firstTouch = evt.touches[0];
            xDown = firstTouch?.clientX ?? null;
            yDown = firstTouch?.clientY ?? null;
        };

        // eslint-disable-next-line max-statements
        const handleTouchMove = (evt: TouchEvent) => {
            if (!xDown || !yDown) {
                return;
            }

            const xUp = evt.touches[0]?.clientX;
            const yUp = evt.touches[0]?.clientY;

            const xDiff = xDown - (xUp ?? 0);
            const yDiff = yDown - (yUp ?? 0);

            if (Math.abs(xDiff) > Math.abs(yDiff)) {
                /* Most significant */
                if (xDiff > 0) {
                    onSwipe({ direction: "right", distance: Math.abs(xDiff) });
                } else {
                    onSwipe({ direction: "left", distance: Math.abs(xDiff) });
                }
            } else if (yDiff > 0) {
                onSwipe({ direction: "down", distance: Math.abs(yDiff) });
            } else {
                onSwipe({ direction: "up", distance: Math.abs(yDiff) });
            }
        };

        const handleTouchEnd = () => {
            xDown = null;
            yDown = null;
            onSwipeEnd?.();
        };

        document.addEventListener("touchstart", handleTouchStart, false);
        document.addEventListener("touchmove", handleTouchMove, false);
        document.addEventListener("touchend", handleTouchEnd, false);

        return () => {
            document.removeEventListener("touchstart", handleTouchStart, false);
            document.removeEventListener("touchmove", handleTouchMove, false);
            document.removeEventListener("touchend", handleTouchEnd, false);
        };
    }, [onSwipe, onSwipeEnd]);
};
