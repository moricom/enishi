const hexRegex = /^#(?<r>[a-f\d]{2})(?<g>[a-f\d]{2})(?<b>[a-f\d]{2})$/iu;
export const isValidHex = (hex: string) => hexRegex.test(hex);
