import { describe, expect, it } from "@jest/globals";

import { getScreenSize } from "@/utils/device/getScreenSize";

describe("between", () => {
    it("should work", () => {
        window.innerWidth = 1024;
        expect(getScreenSize()).toEqual(1024);
    });
});
