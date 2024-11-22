import { describe, expect, it } from "@jest/globals";

import { fail, succeed } from "@/utils/result";

import type { Failed, Succeeded } from "@/utils/result";

describe("succeed", () => {
    it("should return a succeeded", () => {
        const excepted: Succeeded<undefined> = {
            type: "succeeded",
            data: undefined
        };
        const result = succeed(undefined);
        expect(result).toEqual(excepted);
    });
    it("should return a succeeded containing the passed data", () => {
        const data = {
            message: "test1",
            1: "test2",
            [Symbol("test")]: "test3"
        };
        const excepted: Succeeded<typeof data> = {
            type: "succeeded",
            data
        };
        const result = succeed(data);
        expect(result).toEqual(excepted);
    });
});

describe("fail", () => {
    it("should return a failed", () => {
        const excepted: Failed<undefined> = {
            type: "failed",
            data: undefined
        };
        const result = fail(undefined);
        expect(result).toEqual(excepted);
    });
    it("should return a failed containing the passed data", () => {
        const data = {
            message: "test-message"
        };
        const excepted: Failed<typeof data> = {
            type: "failed",
            data
        };
        const result = fail(data);
        expect(result).toEqual(excepted);
    });
});
