/* eslint-disable complexity */

import React from "react";

import { styled } from "styled-components";

import type { enishiUIProps } from "@/enishi-ui/components/type";

type Gravity =
    | "bottom_center"
    | "bottom_left"
    | "bottom_right"
    | "center_left"
    | "center_right"
    | "center"
    | "top_center"
    | "top_left"
    | "top_right";
const Host = styled.div<{
    $orientation: "horizontal" | "vertical";
    $gravity: Gravity;
    $fullWidth: boolean;
    $fullHeight: boolean;
    $flexWrap: boolean;
    $flexGrow: number;
    $gap?: string;
}>`
    display: flex;
    flex-wrap: ${({ $flexWrap }) => ($flexWrap ? "wrap" : "initial")};
    flex-direction: ${({ $orientation }) => ($orientation === "horizontal" ? "row" : "column")};
    justify-content: ${({ $orientation, $gravity }) =>
        // prettier-ignore
        $orientation === "vertical" ? (
            $gravity === "top_left"      ? "flex-start"
          : $gravity === "top_center"    ? "flex-start"
          : $gravity === "top_right"     ? "flex-start"
          : $gravity === "center_left"   ? "center"
          : $gravity === "center"        ? "center"
          : $gravity === "center_right"  ? "center"
          : $gravity === "bottom_left"   ? "flex-end"
          : $gravity === "bottom_center" ? "flex-end"
          : $gravity === "bottom_right"  ? "flex-end"
          :                               "flex-start"
        )
      : $orientation === "horizontal" ? (
            $gravity === "top_left"      ? "flex-start"
          : $gravity === "top_center"    ? "center"
          : $gravity === "top_right"     ? "flex-end"
          : $gravity === "center_left"   ? "flex-start"
          : $gravity === "center"        ? "center"
          : $gravity === "center_right"  ? "flex-end"
          : $gravity === "bottom_left"   ? "flex-start"
          : $gravity === "bottom_center" ? "center"
          : $gravity === "bottom_right"  ? "flex-end"
          :                               "flex-start"
        )
      :                                "flex-start"};
    align-items: ${({ $orientation, $gravity }) =>
        // prettier-ignore
        $orientation === "vertical" ? (
            $gravity === "top_left"      ? "flex-start"
          : $gravity === "top_center"    ? "center"
          : $gravity === "top_right"     ? "flex-end"
          : $gravity === "center_left"   ? "flex-start"
          : $gravity === "center"        ? "center"
          : $gravity === "center_right"  ? "flex-end"
          : $gravity === "bottom_left"   ? "flex-start"
          : $gravity === "bottom_center" ? "center"
          : $gravity === "bottom_right"  ? "flex-end"
          :                               "flex-start"
        )
      : $orientation === "horizontal" ? (
            $gravity === "top_left"      ? "flex-start"
          : $gravity === "top_center"    ? "flex-start"
          : $gravity === "top_right"     ? "flex-start"
          : $gravity === "center_left"   ? "center"
          : $gravity === "center"        ? "center"
          : $gravity === "center_right"  ? "center"
          : $gravity === "bottom_left"   ? "flex-end"
          : $gravity === "bottom_center" ? "flex-end"
          : $gravity === "bottom_right"  ? "flex-end"
          :                               "flex-start"
        )
      :                                "flex-start"};
    flex-grow: ${({ $flexGrow }) => $flexGrow};
    width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "initial")};
    height: ${({ $fullHeight }) => ($fullHeight ? "100%" : "initial")};
    box-sizing: border-box;
    gap: ${({ $gap }) => $gap ?? "unset"};
`;

type Props = enishiUIProps<{
    orientation?: "horizontal" | "vertical";
    gravity?: Gravity;
    fullWidth?: boolean;
    fullHeight?: boolean;
    flexible?: boolean | number;
    gap?: string;
    wrap?: boolean;
    onScroll?: React.UIEventHandler<HTMLDivElement> | undefined;
}>;

const LinearLayoutHost = (
    {
        className,
        style,
        orientation = "horizontal",
        gravity = "top_left",
        fullWidth = false,
        fullHeight = false,
        flexible = false,
        wrap = false,
        gap,
        onClick,
        children,
        onScroll,
        colorTheme: _,
        ...props
    }: Props,
    ref: React.ForwardedRef<HTMLDivElement>
): React.ReactElement => (
    <Host
        $flexGrow={flexible === true ? 1 : flexible || 0}
        $flexWrap={wrap}
        $fullHeight={fullHeight}
        $fullWidth={fullWidth}
        $gap={gap}
        $gravity={gravity}
        $orientation={orientation}
        className={className}
        onClick={onClick}
        onScroll={onScroll}
        ref={ref}
        role="presentation"
        style={style}
        {...props}
    >
        {children}
    </Host>
);

export const LinearLayout = React.forwardRef<HTMLDivElement, Props>(LinearLayoutHost);
