import React from "react";
import { As, ComponentWithAs, ComponentProps } from "../types";
import { Box } from "../Box";
import { defaultVStackTag } from "./handler";
import { forwardRef } from "../forwardRef";
import { resolveMergedBoxProps } from "../variants";

type VStackProps = ComponentProps<"VStack">;

type VStackComponent<T extends As = "div"> = ComponentWithAs<T, VStackProps>;

/**
 * VStack is a Box component with `display="flex"` and `flex-direction: column` set by default. It makes it easier to layout and align child components in a vertical direction. It is a fundamental layout component in Kuma UI.
 *
 * @see — http://kuma-ui.com/docs/Components/VStack
 */
const VStack: VStackComponent = forwardRef<VStackProps, "div">(
  ({ as: Component = defaultVStackTag, children, ...props }, ref) => {
    const mergedProps = resolveMergedBoxProps("VStack", props);

    return (
      <Box {...mergedProps} as={Component} ref={ref}>
        {children}
      </Box>
    );
  },
);

export { VStack, type VStackComponent, VStackProps };
