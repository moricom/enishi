import { useCallback, useRef, useState } from "react";

export const useHover = () => {
    const elementRef = useRef<HTMLElement | null>(null);
    const [hovered, setHovered] = useState(false);
    const handleMouseOver = () => {
        setHovered(true);
    };
    const handleMouseOut = () => {
        setHovered(false);
    };
    const setElement = useCallback((newElement: HTMLElement | null) => {
        if (newElement === elementRef.current) {
            return;
        }

        if (elementRef.current) {
            elementRef.current.removeEventListener("mouseover", handleMouseOver);
            elementRef.current.removeEventListener("mouseout", handleMouseOut);
        }

        elementRef.current = newElement;
        newElement?.addEventListener("mouseover", handleMouseOver);
        newElement?.addEventListener("mouseout", handleMouseOut);
    }, []);
    return <const>[hovered, { setElement, elementRef }];
};
