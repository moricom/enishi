import { describe, expect, it, jest } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";

import { useVisibilityStatus } from "../useVisibilityStatus";

describe("useVisibilityStatus", () => {
    it("should detect visibility state changes", () => {
        // Mock the initial visibilityState
        const visibilityStateSpy = jest.spyOn(document, "visibilityState", "get");
        visibilityStateSpy.mockReturnValue("visible");
        const { result } = renderHook(() => useVisibilityStatus());
        expect(result.current).toBe("visible");

        // Simulate the page becoming hidden
        act(() => {
            const visibilityChange = new window.Event("visibilitychange");
            visibilityStateSpy.mockReturnValue("hidden");
            document.dispatchEvent(visibilityChange);
        });

        expect(result.current).toBe("hidden");

        // Simulate the page becoming visible again
        act(() => {
            const visibilityChange = new window.Event("visibilitychange");
            visibilityStateSpy.mockReturnValue("visible");
            document.dispatchEvent(visibilityChange);
        });
        expect(result.current).toBe("visible");
    });
});
