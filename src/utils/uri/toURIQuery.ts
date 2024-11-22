export const toURIQuery = (a: Record<string, number | string | null | undefined>): string => {
    const b = Object.entries(a)
        .filter((x): x is [string, string] => x[1] !== undefined && x[1] !== null)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join("&");

    return b ? `?${b}` : "";
};
