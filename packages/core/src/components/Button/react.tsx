import React from "react";
import { As, ComponentWithAs, ComponentProps } from "../types";
import { Box } from "../Box";
import { defaultButtonTag } from "./handler";
import { forwardRef } from "../forwardRef";
import { resolveMergedBoxProps } from "../variants";

type ButtonProps = ComponentProps<"Button">;
type ButtonComponent<T extends As = "button"> = ComponentWithAs<T, ButtonProps>;

/**
 * Button is a clickable component used to trigger actions or events in a Kuma UI application.
 *
 * @see — http://kuma-ui.com/docs/Components/Button
 */
const Button: ButtonComponent = forwardRef<ButtonProps, "button">(
  ({ as: Component = defaultButtonTag, children, ...props }, ref) => {
    const mergedProps = resolveMergedBoxProps("Button", props);

    return (
      <Box {...mergedProps} as={Component} ref={ref}>
        {children}
      </Box>
    );
  },
);

export { Button, type ButtonComponent, ButtonProps };
