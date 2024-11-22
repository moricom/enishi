export {};

declare global {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface ArrayConstructor {
        // eslint-disable-next-line @typescript-eslint/method-signature-style, @typescript-eslint/no-explicit-any, @typescript-eslint/no-redundant-type-constituents
        isArray(arg: any | readonly any[]): arg is readonly any[];
    }
}
