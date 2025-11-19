import React from "react";
import { As, ComponentWithAs, ComponentProps } from "../types";
import { Box } from "../Box";
import { defaultImageTag } from "./handler";
import { forwardRef } from "../forwardRef";
import { resolveMergedBoxProps } from "../variants";

type ImageProps = ComponentProps<"Image">;
type ImageComponent<T extends As = "img"> = ComponentWithAs<T, ImageProps>;

/**
 * Image is a component that displays an image, providing styling that integrates well with the Kuma UI ecosystem.
 *
 * @see — http://kuma-ui.com/docs/Components/Image
 */
const Image: ImageComponent = forwardRef<ImageProps, "img">(
  ({ as: Component = defaultImageTag, children, ...props }, ref) => {
    const mergedProps = resolveMergedBoxProps("Image", props);

    return (
      <Box {...mergedProps} as={Component} ref={ref}>
        {children}
      </Box>
    );
  },
);

export { Image, type ImageComponent, ImageProps };
