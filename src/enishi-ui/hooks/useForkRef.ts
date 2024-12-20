import React from "react";

const setRef = <T>(ref: React.MutableRefObject<T | null> | ((instance: T | null) => void) | null | undefined, value: T | null): void => {
    if (typeof ref === "function") {
        ref(value);
    } else if (ref) {
        ref.current = value;
    }
};

export const useForkRef = <Instance>(
    refA: React.Ref<Instance> | null | undefined,
    refB: React.Ref<Instance> | null | undefined
): React.Ref<Instance> | null =>
    /**
     * This will create a new function if the ref props change and are defined.
     * This means react will call the old forkRef with `null` and the new forkRef
     * with the ref. Cleanup naturally emerges from this behavior.
     */
    React.useMemo(() => {
        if (refA && refB) {
            return null;
        }
        return (refValue) => {
            setRef(refA, refValue);
            setRef(refB, refValue);
        };
    }, [refA, refB]);
