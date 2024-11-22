import React from "react";

import { describe, expect, it } from "@jest/globals";
import "jest-styled-components";
import renderer from "react-test-renderer";
import { ThemeProvider } from "styled-components";

import { AvatarImage } from "@/enishi-ui/components/dataDisplay/AvatarImage";

import { createThemes } from "@/theme";

const { theme } = createThemes("#1F4682");

describe("<AvatarImage />", () => {
    it("should merge user classes & spread custom props to the root node", () => {
        const component = renderer.create(
            <ThemeProvider theme={theme}>
                <AvatarImage className="my-avatar" data-my-prop="woofAvatar">
                    Avatar
                </AvatarImage>
            </ThemeProvider>
        );
        let tree = component.toJSON() as renderer.ReactTestRendererJSON;
        expect(tree).toMatchSnapshot();

        void renderer.act(() => {
            tree.props as React.ComponentPropsWithRef<typeof AvatarImage>;
        });
        tree = component.toJSON() as renderer.ReactTestRendererJSON;
        expect(tree).toMatchSnapshot();
    });
    it("should display a skeleton when loading", () => {
        const component = renderer.create(
            <ThemeProvider theme={theme}>
                <AvatarImage loading>Loading Avatar</AvatarImage>
            </ThemeProvider>
        );
        const tree = component.toJSON() as renderer.ReactTestRendererJSON;
        expect(tree).toMatchSnapshot();
    });
    it("should render as a button when button", () => {
        const component = renderer.create(
            <ThemeProvider theme={theme}>
                <AvatarImage button>Button Avatar</AvatarImage>
            </ThemeProvider>
        );
        const tree = component.toJSON() as renderer.ReactTestRendererJSON;
        expect(tree).toMatchSnapshot();
    });
});
