import { describe, expect, it } from "@jest/globals";

import { between } from "@/utils/css/mediaQuery/between";

describe("between", () => {
    it("should work", () => {
        expect(between("100", "200")).toEqual("@media (max-width: 200) and (min-width: calc(100 + 0.02px))");
    });
    it("should work for vertical", () => {
        expect(between("0", "300", true)).toEqual("@media (max-height: 300) and (min-height: calc(0 + 0.02px))");
    });
    it("should work for horizontal", () => {
        expect(between("600", "800", false)).toEqual("@media (max-width: 800) and (min-width: calc(600 + 0.02px))");
    });
});
