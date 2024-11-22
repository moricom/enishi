import type React from "react";

export const mergeRefs =
    <T = unknown>(refs: (React.LegacyRef<T> | React.MutableRefObject<T>)[]): React.RefCallback<T> =>
    (value) => {
        refs.forEach((ref) => {
            if (typeof ref === "function") {
                ref(value);
            } else if (ref !== null) {
                (<React.MutableRefObject<T | null>>ref).current = value;
            }
        });
    };
