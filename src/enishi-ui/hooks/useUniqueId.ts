import { createContext, useContext, useRef } from "react";

const UniqueIdContext = createContext({ id: 0 });
UniqueIdContext.displayName = "UniqueIdContext";

export const useUniqueId = (): number => {
    const ctx = useContext(UniqueIdContext);
    const idRef = useRef<number | null>(null);
    if (idRef.current === null) {
        ctx.id += 1;
        idRef.current = ctx.id;
    }
    return idRef.current;
};
