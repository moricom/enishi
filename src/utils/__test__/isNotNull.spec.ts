import { describe, expect, it } from "@jest/globals";

import { isNotNull } from "@/utils/isNotNull";

describe("isNotNull", () => {
    it("should return false if null", () => {
        expect(isNotNull(null)).toBe(false);
    });

    it("should return true if undefined", () => {
        expect(isNotNull(undefined)).toBe(true);
    });

    it("should return true otherwise", () => {
        expect(isNotNull(0)).toBe(true);
        expect(isNotNull(1)).toBe(true);
        expect(isNotNull("")).toBe(true);
        expect(isNotNull("string")).toBe(true);
        expect(isNotNull(true)).toBe(true);
        expect(isNotNull(false)).toBe(true);
        expect(isNotNull({})).toBe(true);
        expect(isNotNull([])).toBe(true);
    });
});
