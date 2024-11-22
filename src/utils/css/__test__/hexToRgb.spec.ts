import { describe, expect, it } from "@jest/globals";

import { hexToRgb } from "@/utils/css/hexToRgb";

describe("hetToRgb", () => {
    it("should work", () => {
        expect(hexToRgb("#ffffff")).toStrictEqual({ b: 255, g: 255, r: 255 });
        expect(hexToRgb("#000000")).toStrictEqual({ b: 0, g: 0, r: 0 });
        expect(hexToRgb("#ff0000")).toStrictEqual({ b: 0, g: 0, r: 255 });
        expect(hexToRgb("#00ff00")).toStrictEqual({ b: 0, g: 255, r: 0 });
        expect(hexToRgb("#0000ff")).toStrictEqual({ b: 255, g: 0, r: 0 });
    });

    it("should throw error", () => {
        expect(() => hexToRgb("")).toThrowError("Invalid hex color");
        expect(() => hexToRgb("#")).toThrowError("Invalid hex color");
        expect(() => hexToRgb("fff")).toThrowError("Invalid hex color");
    });
});
