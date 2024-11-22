import { useEffect } from "react";

import { getScreenSize } from "@/utils/device/getScreenSize";

export const useScreenSize = (reportWindowSize: (screenSize: number) => void): void => {
    useEffect(() => {
        const listener = () => {
            const screenSize = getScreenSize();
            reportWindowSize(screenSize);
        };
        listener();
        window.addEventListener("resize", listener);
        return () => {
            window.removeEventListener("resize", listener);
        };
    }, [reportWindowSize]);
};
