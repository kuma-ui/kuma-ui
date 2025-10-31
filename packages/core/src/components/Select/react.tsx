import React from "react";
import { As, ComponentWithAs, ComponentProps } from "../types";
import { Box } from "../Box";
import { defaultSelectTag } from "./handler";
import { forwardRef } from "../forwardRef";
import { resolveMergedBoxProps } from "../variants";

type SelectProps = ComponentProps<"Select">;

type SelectComponent<T extends As = "select"> = ComponentWithAs<T, SelectProps>;

/**
 * Select is a component that allows the user to select one option from a list.
 *
 * @see — http://kuma-ui.com/docs/Components/Select
 */
const Select: SelectComponent = forwardRef<SelectProps, "select">(
  ({ as: Component = defaultSelectTag, children, ...props }, ref) => {
    const mergedProps = resolveMergedBoxProps("Select", props);

    return (
      <Box {...mergedProps} as={Component} ref={ref}>
        {children}
      </Box>
    );
  },
);

export { Select, type SelectComponent, SelectProps };
