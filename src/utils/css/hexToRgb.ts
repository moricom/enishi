export const hexToRgb = (hex: string) => {
    const result = /^#?(?<r>[a-f\d]{2})(?<g>[a-f\d]{2})(?<b>[a-f\d]{2})$/iu.exec(hex);
    if (!result?.groups?.r || !result.groups.g || !result.groups.b) {
        throw new Error("Invalid hex color");
    }
    return <const>{
        r: parseInt(result.groups.r, 16),
        g: parseInt(result.groups.g, 16),
        b: parseInt(result.groups.b, 16)
    };
};
