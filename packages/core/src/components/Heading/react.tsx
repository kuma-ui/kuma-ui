import React from "react";
import { As, ComponentWithAs, ComponentProps } from "../types";
import { Box } from "../Box";
import { defaultHeadingTag } from "./handler";
import { forwardRef } from "../forwardRef";
import { resolveMergedBoxProps } from "../variants";

type HeadingProps = ComponentProps<"Heading">;

type HeadingComponent<
  T extends "h1" | "h2" | "h3" | "h4" | "h5" | "h6" = "h1",
> = ComponentWithAs<T, HeadingProps>;

/**
 * Used to render semantic HTML heading elements in a Kuma UI application.
 * By default, renders as h1 which can be customized with the 'as' prop.
 *
 * @see — http://kuma-ui.com/docs/Components/Heading
 */
const Heading: HeadingComponent = forwardRef<HeadingProps, "h1">(
  ({ as: Component = defaultHeadingTag, children, ...props }, ref) => {
    const mergedProps = resolveMergedBoxProps("Heading", props);

    return (
      <Box {...mergedProps} as={Component} ref={ref}>
        {children}
      </Box>
    );
  },
);

export { Heading, type HeadingComponent, HeadingProps };
