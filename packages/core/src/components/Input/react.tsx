import React from "react";
import { As, ComponentWithAs, ComponentProps } from "../types";
import { Box } from "../Box";
import { defaultInputTag } from "./handler";
import { forwardRef } from "../forwardRef";
import { resolveMergedBoxProps } from "../variants";

type InputProps = ComponentProps<"Input">;
type InputComponent<T extends As = "input"> = ComponentWithAs<T, InputProps>;

/**
 * The Input component inherits from the HTML input element and can be combined with Kuma UI's style properties for extensive customization.
 *
 * @see — http://kuma-ui.com/docs/Components/Input
 */
const Input: InputComponent = forwardRef<InputProps, "input">(
  ({ as: Component = defaultInputTag, children, ...props }, ref) => {
    const mergedProps = resolveMergedBoxProps("Input", props);

    return (
      <Box {...mergedProps} as={Component} ref={ref}>
        {children}
      </Box>
    );
  },
);

export { Input, type InputComponent, InputProps };
