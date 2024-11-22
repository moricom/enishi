import { useCallback, useEffect, useState } from "react";

type Rect = {
    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number;
    width: number;
    x: number;
    y: number;
};

const equal = (x: Rect | null, y: Rect | null) =>
    // prettier-ignore
    x === y
 || (
        x && y
     && x.bottom === y.bottom
     && x.height === y.height
     && x.left   === y.left
     && x.right  === y.right
     && x.top    === y.top
     && x.x      === y.x
     && x.y      === y.y
    );

export const useRect = <T extends Element>(element: T | null): { rect: DOMRect | null; update: () => void } => {
    const [rect, setRect] = useState<DOMRect | null>(element?.getBoundingClientRect() ?? null);
    const newRect = element?.getBoundingClientRect() ?? null;
    const update = useCallback(() => {
        const r = element?.getBoundingClientRect();
        setRect(r ?? null);
    }, [element]);

    useEffect(
        () => {
            if (newRect === rect) {
                return;
            }
            setRect(newRect);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [equal(newRect, rect)]
    );
    useEffect(() => {
        if (!element) {
            return () => undefined;
        }

        setRect(element.getBoundingClientRect());

        const resizeObserver = new ResizeObserver((entries) => {
            const r = entries[0]?.target.getBoundingClientRect();
            if (!r) {
                return;
            }
            setRect(r);
        });
        resizeObserver.observe(element);

        const windowResizeListener = () => {
            const r = element.getBoundingClientRect();
            setRect(r);
        };
        window.addEventListener("resize", windowResizeListener);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("resize", windowResizeListener);
        };
    }, [element]);

    return { rect, update };
};
