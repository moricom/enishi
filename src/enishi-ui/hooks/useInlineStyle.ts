import { useCallback, useEffect, useRef } from "react";

export const useInlineStyle = (style?: string): [(element: HTMLElement | null) => void] => {
    const elementRef = useRef<HTMLElement | null>(null);
    const setElement = useCallback(
        (element: HTMLElement | null) => {
            if (element === elementRef.current) {
                return;
            }

            elementRef.current = element;

            if (element && style) {
                element.setAttribute("style", style);
            }
        },
        [style]
    );

    useEffect(() => {
        if (elementRef.current && style) {
            elementRef.current.setAttribute("style", style);
        }
    }, [style]);
    return [setElement];
};
