import { useCallback, useEffect, useRef } from "react";

const useComponentWillUnmount = (func: () => unknown): void => {
    const funcRef = useRef(func);

    useEffect(
        () => () => {
            funcRef.current();
        },
        []
    );

    useEffect(() => {
        funcRef.current = func;
    }, [func]);
};

export const useDelayCommit = <T>({
    handler,
    originalValue,
    newValue,
    disable,
    interval = 500
}: {
    handler: ((value: T) => void) | undefined;
    originalValue: T | undefined;
    newValue: T | undefined;
    disable?: boolean;
    interval?: number;
}): void => {
    const commit = useCallback(() => {
        if (disable) {
            return;
        }
        if (originalValue !== newValue) {
            if (newValue) {
                handler?.(newValue);
            }
        }
    }, [disable, handler, newValue, originalValue]);

    useComponentWillUnmount(commit);

    useEffect(() => {
        const fn = () => {
            commit();
        };
        const timeoutId = setTimeout(fn, interval);
        return () => {
            clearTimeout(timeoutId);
        };
    }, [commit, interval]);

    useEffect(() => {
        const fn = () => {
            commit();
        };
        window.addEventListener("beforeunload", fn);
        return () => {
            window.removeEventListener("beforeunload", fn);
        };
    }, [commit]);
};
