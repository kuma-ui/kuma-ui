import { StyledProps, PseudoProps } from "@kuma-ui/system";
import { theme } from "@kuma-ui/sheet";
import React, { ReactNode } from "react";
import {
  As,
  ComponentWithAs,
  MergeWithAs,
  PropsOf,
  ComponentProps,
} from "../types";
import { Box } from "../Box";

type GridProps = ComponentProps<"Grid">;

type GridComponent<T extends As = "div"> = ComponentWithAs<T, GridProps>;

/**
 * Grid is a powerful component that allows for 2-dimensional layouts and alignment of child components.
 *
 * @see — http://kuma-ui.com/docs/Components/Grid
 */
const Grid: GridComponent = <T extends As = "div">({
  as: Component = "div",
  children,
  ...props
}: MergeWithAs<PropsOf<T>, GridProps>) => {
  const variant = props.variant
    ? theme.getVariants("Grid")?.variants?.[props.variant]
    : {};
  return (
    <Box
      as={Component}
      {...variant}
      {...props}
      children={children}
      IS_KUMA_DEFAULT
    />
  );
};

export { Grid, type GridComponent, GridProps };
