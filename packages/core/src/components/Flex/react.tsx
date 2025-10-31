import React from "react";
import { As, ComponentWithAs, ComponentProps } from "../types";
import { Box } from "../Box";
import { defaultFlexTag } from "./handler";
import { forwardRef } from "../forwardRef";
import { resolveMergedBoxProps } from "../variants";

type FlexProps = ComponentProps<"Flex">;
type FlexComponent<T extends As = "div"> = ComponentWithAs<T, FlexProps>;

/**
 * Flex is a Box component with 'display: flex' by default. It's used to create flexible layouts in a Kuma UI application.
 * Like Box, it can accept any system style properties for extensive customization.
 *
 * @see — http://kuma-ui.com/docs/Components/Flex
 */
const Flex: FlexComponent = forwardRef<FlexProps, "div">(
  ({ as: Component = defaultFlexTag, children, ...props }, ref) => {
    const mergedProps = resolveMergedBoxProps("Flex", props);

    return (
      <Box {...mergedProps} as={Component} ref={ref}>
        {children}
      </Box>
    );
  },
);

export { Flex, type FlexComponent, FlexProps };
