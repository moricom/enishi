export const up = (breakpoint: string, vertical = false): string =>
    `@media (min-${vertical ? "height" : "width"}: calc(${breakpoint} + 0.02px))`;
