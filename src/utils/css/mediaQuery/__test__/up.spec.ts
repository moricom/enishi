import { describe, expect, it } from "@jest/globals";

import { up } from "@/utils/css/mediaQuery/up";

describe("up", () => {
    it("should work", () => {
        expect(up("600")).toEqual("@media (min-width: calc(600 + 0.02px))");
    });
    it("should work for vertical", () => {
        expect(up("400", true)).toEqual("@media (min-height: calc(400 + 0.02px))");
    });
    it("should work for horizontal", () => {
        expect(up("300", false)).toEqual("@media (min-width: calc(300 + 0.02px))");
    });
});
