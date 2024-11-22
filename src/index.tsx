import React from "react";
import { createRoot } from "react-dom/client";

import "overlayscrollbars/overlayscrollbars.css";
import "react-image-crop/dist/ReactCrop.css";

import { App } from "@/App";
import { config } from "@/config";

// eslint-disable-next-line no-console
console.log(`created by: NozomiSugiyama
NODE_ENV  : ${config.NODE_ENV}
VERSION   : ${config.VERSION}`);

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
(window as any).enishiConfig = config;

const rootElement = document.getElementById("root");
if (!rootElement) {
    // eslint-disable-next-line no-alert
    alert("不明なエラーが発生しました。不具合が継続して発生する場合、担当者にご連絡ください。");
    throw new Error("#root does not found");
}

rootElement.style.height = `${window.innerHeight}px`;
const root = createRoot(rootElement);
root.render(<App />);

window.addEventListener("resize", () => {
    rootElement.style.height = `${window.innerHeight}px`;
});


const loadingContainer = document.getElementById("enishi-loading-container");
if (loadingContainer) {
    loadingContainer.style.display = "none";
}

if (config.NODE_ENV === "production") {
    document.addEventListener("keydown", (e) => {
        // Disable developer tools
        if (e.metaKey && e.altKey) {
            if (e.code === "KeyU" || e.code === "KeyI" || e.code === "KeyC" || e.code === "KeyJ") {
                e.preventDefault();
            }
        }
    });
}
