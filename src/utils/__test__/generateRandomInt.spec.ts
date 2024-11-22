import { describe, expect, it } from "@jest/globals";

import { generateRandomInt } from "@/utils/generateRandomInt";

describe("generateRandomInt", () => {
    it("should return a number", () => {
        const value = generateRandomInt(0, 100);
        expect(value).toEqual(expect.any(Number));
    });
    it("should return a number with the value `1`", () => {
        const min = 1;
        const max = 1;
        const value = generateRandomInt(min, max);
        expect(value).toBeGreaterThanOrEqual(min);
        expect(value).toBeLessThanOrEqual(max);
    });
    it("should return a number with the value between 0 and 100", () => {
        const min = 0;
        const max = 100;
        const value = generateRandomInt(min, max);
        expect(value).toBeGreaterThanOrEqual(min);
        expect(value).toBeLessThanOrEqual(max);
    });
    it("should return a number with the value between -100 and -200", () => {
        const min = -100;
        const max = -200;
        const value = generateRandomInt(min, max);
        expect(value).toBeLessThanOrEqual(min);
        expect(value).toBeGreaterThanOrEqual(max);
    });
});
