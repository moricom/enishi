import { useSyncExternalStore } from "react";

const getVisibilitySnapshot = () => document.visibilityState;

const subscribeToVisibilityChange = (callback: () => void) => {
    document.addEventListener("visibilitychange", callback, false);
    return () => {
        document.removeEventListener("visibilitychange", callback, false);
    };
};

export const useVisibilityStatus = () => {
    const visibilityState = useSyncExternalStore(subscribeToVisibilityChange, getVisibilitySnapshot);
    return visibilityState;
};
