import type { PropsWithChildren } from "react";
import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { config } from "@/config";
import { LoadingPage } from "@/features/misc";
import { MainLayout } from "@/layout/MainLayout";
import { ScrollToTop } from "@/routes/ScrollToTop";
import { lazyImport } from "@/utils/lazyImport";

const { MainPage } = lazyImport(async () => import(/* webpackChunkName: "MainPage" */ "@/features/misc/routes/MainPage"), "MainPage");

const { ResetPage } = lazyImport(async () => import(/* webpackChunkName: "ResetPage" */ "@/features/misc/routes/ResetPage"), "ResetPage");

export const EnishiRoutes: React.FC<PropsWithChildren> = ({ children }) => (
    <BrowserRouter basename={config.BASE_URL}>
        <ScrollToTop />
        <Routes>
            <Route element={<ResetPage />} path="/reset" />
            {children}
            <Route
                element={
                    <Routes>
                        <Route
                            element={
                                <React.Suspense fallback={<LoadingPage />}>
                                    <MainLayout>
                                        <MainPage />
                                    </MainLayout>
                                </React.Suspense>
                            }
                            path="*"
                        />
                    </Routes>
                }
                path="*"
            />
        </Routes>
    </BrowserRouter>
);
