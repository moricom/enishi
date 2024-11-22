export const down = (breakpoint: string, vertical = false): string => `@media (max-${vertical ? "height" : "width"}: ${breakpoint})`;
