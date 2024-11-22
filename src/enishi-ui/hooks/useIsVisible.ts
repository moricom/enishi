import { useEffect, useState } from "react";

export const useIsVisible = (ref: React.RefObject<HTMLElement>) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const observer = new IntersectionObserver(([entry]) => {
        if (entry && entry.isIntersecting !== isIntersecting) {
            setIsIntersecting(entry.isIntersecting);
        }
    });

    useEffect(() => {
        if (!ref.current) {
            return () => undefined;
        }
        observer.observe(ref.current);
        return () => {
            observer.disconnect();
        };
    }, [observer, ref]);

    return isIntersecting;
};
