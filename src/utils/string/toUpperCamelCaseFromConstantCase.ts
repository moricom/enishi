export const toUpperCamelCaseFromConstantCase = (constantCaseString: string): string =>
    constantCaseString
        .toLowerCase()
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");
