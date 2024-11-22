import React from "react";

import { describe, expect, it } from "@jest/globals";
import "jest-styled-components";
import renderer from "react-test-renderer";
import { ThemeProvider } from "styled-components";

import { Badge } from "@/enishi-ui/components/dataDisplay/Badge";

import { createThemes } from "@/theme";

const { theme } = createThemes("#1F4682");

describe("<Badge />", () => {
    it("should merge user classes & spread custom props to the root node", () => {
        const component = renderer.create(
            <ThemeProvider theme={theme}>
                <Badge className="my-badge" data-my-prop="notificationBadge" />
            </ThemeProvider>
        );
        let tree = component.toJSON() as renderer.ReactTestRendererJSON;
        expect(tree).toMatchSnapshot();

        void renderer.act(() => {
            tree.props as React.ComponentPropsWithRef<typeof Badge>;
        });
        tree = component.toJSON() as renderer.ReactTestRendererJSON;
        expect(tree).toMatchSnapshot();
    });
});
