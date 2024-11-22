import { useMemo } from "react";

import { config } from "@/config";

export const usePopupRootElement = () => {
    const popupRootElement = useMemo(() => document.getElementById(config.POPUP_ROOT_ELEMENT_ID), []);
    if (!popupRootElement) {
        throw new Error("The tooltip root element not found");
    }
    return popupRootElement;
};
