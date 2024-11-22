export const between = (breakpointMin: string, breakpointMax: string, vertical = false): string =>
    `@media (max-${vertical ? "height" : "width"}: ${breakpointMax}) and (min-${
        vertical ? "height" : "width"
    }: calc(${breakpointMin} + 0.02px))`;
