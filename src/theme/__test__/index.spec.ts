import { describe, expect, it } from "@jest/globals";

import { createThemes } from "@/theme";

describe("Theme", () => {
    const primaryColor = "#3f51b5";
    const { theme, darkTheme } = createThemes(primaryColor);

    it("createThemes generates light and dark themes", () => {
        expect(theme.mode).toBe("light");
        expect(darkTheme.mode).toBe("dark");
    });

    it("createThemes generates themes with correct primary colors", () => {
        expect(theme.palette.primary).toStrictEqual({
            "10": "#ECEEF8",
            "100": "#3F51B5",
            "1000": "#060812",
            "20": "#D9DCF0",
            "200": "#3949A3",
            "30": "#C5CBE9",
            "300": "#324191",
            "40": "#B2B9E1",
            "400": "#2C397F",
            "50": "#9FA8DA",
            "500": "#26316D",
            "60": "#8C97D3",
            "600": "#20295B",
            "70": "#7985CB",
            "700": "#192048",
            "80": "#6574C4",
            "800": "#131836",
            "90": "#5262BC",
            "900": "#0D1024"
        });
        expect(darkTheme.palette.primary).toStrictEqual({
            "10": "#0E0F15",
            "100": "#8C97D3",
            "1000": "#F4F5FB",
            "20": "#1C1E2A",
            "200": "#98A1D7",
            "30": "#2A2D3F",
            "300": "#A3ACDC",
            "40": "#383C54",
            "400": "#AFB6E0",
            "50": "#464C6A",
            "500": "#BAC1E5",
            "60": "#545B7F",
            "600": "#C6CBE9",
            "70": "#626A94",
            "700": "#D1D5ED",
            "80": "#7079A9",
            "800": "#DDE0F2",
            "90": "#7E88BE",
            "900": "#E8EAF6"
        });
    });

    it("createThemes generates light theme with text colors object", () => {
        expect(theme.palette.text).toEqual(expect.any(Object));
    });

    it("createThemes generates dark theme with text colors object", () => {
        expect(darkTheme.palette.text).toEqual(expect.any(Object));
    });

    const rgbaRegex = /^rgba\((?<r>\d{1,3}), (?<g>\d{1,3}), (?<b>\d{1,3}), (?<a>\d(?:\.\d{1,2})?)\)$/u;

    it("createThemes generates light theme with hover, active, and highlight functions", () => {
        const color = theme.palette.primary["500"];
        expect(theme.palette.action.hover(color)).toMatch(rgbaRegex);
        expect(theme.palette.action.active(color)).toMatch(rgbaRegex);
        expect(theme.palette.action.highlight(color)).toMatch(rgbaRegex);
    });

    it("createThemes generates dark theme with hover, active, and highlight functions", () => {
        const color = darkTheme.palette.primary["500"];
        expect(darkTheme.palette.action.hover(color)).toMatch(rgbaRegex);
        expect(darkTheme.palette.action.active(color)).toMatch(rgbaRegex);
        expect(darkTheme.palette.action.highlight(color)).toMatch(rgbaRegex);
    });

    // Additional tests can be added here to cover other aspects of the theme.
});
