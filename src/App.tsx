/* eslint-disable react/jsx-max-depth */
import React, { Suspense, useMemo } from "react";

import { IconContext } from "@react-icons/all-files";
import { Toaster } from "react-hot-toast";
import { StyleSheetManager, ThemeProvider } from "styled-components";

import { config } from "@/config";
import { ErrorBoundary, LoadingPage } from "@/features/misc";
import { GlobalStyle } from "@/GlobalStyle";
import { EnishiRoutes } from "@/routes/index";
import { createThemes } from "@/theme";

const shouldForwardProp = (prop: string): boolean => ![""].includes(prop);
const { theme } = createThemes(config.DEFAULT_PRIMARY_COLOR);

export const App: React.FC = () => {
    const iconContext = useMemo<IconContext>(() => ({ size: "1.2rem", style: { verticalAlign: "middle" } }), []);

    return (
        <ErrorBoundary>
            <React.StrictMode>
                <IconContext.Provider value={iconContext}>
                    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
                        <ThemeProvider theme={theme}>
                            <GlobalStyle theme={theme} />
                            <Suspense fallback={<LoadingPage />}>
                                <EnishiRoutes />
                            </Suspense>
                        </ThemeProvider>
                    </StyleSheetManager>
                </IconContext.Provider>
                <Toaster containerClassName="enishi-app-notification-container-element" />
            </React.StrictMode>
        </ErrorBoundary>
    );
};
