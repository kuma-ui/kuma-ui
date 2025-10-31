import React from "react";
import { As, ComponentWithAs, ComponentProps } from "../types";
import { Box } from "../Box";
import { defaultTextTag } from "./handler";
import { forwardRef } from "../forwardRef";
import { resolveMergedBoxProps } from "../variants";

type TextProps = ComponentProps<"Text">;

type TextComponent<T extends As = "p"> = ComponentWithAs<T, TextProps>;

/**
 * Used to render text content or paragraphs in a Kuma UI application.
 *
 * @see — http://kuma-ui.com/docs/Components/Text
 */
const Text: TextComponent = forwardRef<TextProps, "p">(
  ({ as: Component = defaultTextTag, children, ...props }, ref) => {
    const mergedProps = resolveMergedBoxProps("Text", props);

    return (
      <Box {...mergedProps} as={Component} ref={ref}>
        {children}
      </Box>
    );
  },
);

export { Text, type TextComponent, TextProps };
