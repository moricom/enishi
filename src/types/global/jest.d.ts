/* eslint-disable @typescript-eslint/method-signature-style */
/* eslint-disable @typescript-eslint/consistent-type-definitions */

declare module "expect" {
    interface AsymmetricMatchers {
        toBeGreaterThanString(argument: string): void;
        toBeLessThanString(argument: string): void;
    }
    interface Matchers<R> {
        toBeGreaterThanString(argument: string): R;
        toBeLessThanString(argument: string): R;
    }
}
export {};
