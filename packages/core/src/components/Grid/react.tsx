import React from "react";
import { As, ComponentWithAs, ComponentProps } from "../types";
import { Box } from "../Box";
import { defaultGridTag } from "./handler";
import { forwardRef } from "../forwardRef";
import { resolveMergedBoxProps } from "../variants";

type GridProps = ComponentProps<"Grid">;
type GridComponent<T extends As = "div"> = ComponentWithAs<T, GridProps>;

/**
 * Grid is a powerful component that allows for 2-dimensional layouts and alignment of child components.
 *
 * @see — http://kuma-ui.com/docs/Components/Grid
 */
const Grid: GridComponent = forwardRef<GridProps, "div">(
  ({ as: Component = defaultGridTag, children, ...props }, ref) => {
    const mergedProps = resolveMergedBoxProps("Grid", props);

    return (
      <Box {...mergedProps} as={Component} ref={ref}>
        {children}
      </Box>
    );
  },
);

export { Grid, type GridComponent, GridProps };
