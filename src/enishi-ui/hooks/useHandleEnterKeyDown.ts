import type React from "react";
import { useCallback } from "react";

export const useHandleEnterKeyDown = (onClick?: (e: React.KeyboardEvent<HTMLElement>) => void): React.KeyboardEventHandler<HTMLElement> => {
    const handleKeyDown = useCallback<React.KeyboardEventHandler<HTMLElement>>(
        (e) => {
            if (e.key === "Enter") {
                onClick?.(e);
            }
        },
        [onClick]
    );
    return handleKeyDown;
};
