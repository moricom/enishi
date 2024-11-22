import { describe, expect, it } from "@jest/globals";

import { down } from "@/utils/css/mediaQuery/down";

describe("down", () => {
    it("should work", () => {
        expect(down("100")).toEqual("@media (max-width: 100)");
    });
    it("should work for vertical", () => {
        expect(down("700", true)).toEqual("@media (max-height: 700)");
    });
    it("should work for horizontal", () => {
        expect(down("400", false)).toEqual("@media (max-width: 400)");
    });
});
