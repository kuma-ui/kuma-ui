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
import { defaultGridTag } from "./handler";
import { forwardRef } from "../forwardRef";

type GridProps = ComponentProps<"Grid">;

type GridComponent<T extends As = "div"> = ComponentWithAs<T, GridProps>;

/**
 * Grid is a powerful component that allows for 2-dimensional layouts and alignment of child components.
 *
 * @see — http://kuma-ui.com/docs/Components/Grid
 */
const Grid: GridComponent = forwardRef(
  ({ as: Component = defaultGridTag, children, ...props }, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- FIXME
    const variant = props.variant
      ? theme.getVariants("Grid")?.variants?.[props.variant]
      : {};
    return (
      <Box
        as={Component}
        ref={ref}
        {...variant}
        {...props}
        children={children}
        IS_KUMA_DEFAULT
      />
    );
  }
);

export { Grid, type GridComponent, GridProps };
