import React from "react";
import { As, ComponentWithAs, ComponentProps } from "../types";
import { Box } from "../Box";
import { defaultHStackTag } from "./handler";
import { forwardRef } from "../forwardRef";
import { resolveMergedBoxProps } from "../variants";

type HStackProps = ComponentProps<"HStack">;
type HStackComponent<T extends As = "div"> = ComponentWithAs<T, HStackProps>;

/**
 * HStack is a Box component with `display="flex"` and `flex-direction: row` set by default. It makes it easier to layout and align child components in a horizontal direction. It is a fundamental layout component in Kuma UI.
 *
 * @see — http://kuma-ui.com/docs/Components/HStack
 */
const HStack: HStackComponent = forwardRef<HStackProps, "div">(
  ({ as: Component = defaultHStackTag, children, ...props }, ref) => {
    const mergedProps = resolveMergedBoxProps("HStack", props);

    return (
      <Box {...mergedProps} as={Component} ref={ref}>
        {children}
      </Box>
    );
  },
);

export { HStack, type HStackComponent, HStackProps };
