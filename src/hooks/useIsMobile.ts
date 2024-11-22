import { useTheme } from "styled-components";

import { useBoolean } from "@/enishi-ui/hooks/useBoolean";

import { useScreenSize } from "@/hooks/useScreenSize";
import { getScreenSize } from "@/utils/device/getScreenSize";

export const useIsMobile = (): boolean => {
    const theme = useTheme();
    const { value: isMobile, setValue } = useBoolean(getScreenSize() <= theme.breakpoints.pxSizes.mobileL);
    useScreenSize((screenSize) => {
        if (isMobile !== screenSize <= theme.breakpoints.pxSizes.mobileL) {
            setValue(screenSize <= theme.breakpoints.pxSizes.mobileL);
        }
    });
    return isMobile;
};
