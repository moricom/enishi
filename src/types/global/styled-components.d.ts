import type { AppTheme } from "@/theme";

declare module "styled-components" {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/consistent-type-definitions
    interface DefaultTheme extends AppTheme {}
}
