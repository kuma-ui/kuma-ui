import { StyledProps, PseudoProps } from "@kuma-ui/system";
import React, { ReactNode } from "react";
import {
  As,
  ComponentWithAs,
  MergeWithAs,
  PropsOf,
  ComponentProps,
} from "../types";
import { Box } from "../Box";
import { theme } from "@kuma-ui/sheet";
import { defaultImageTag } from "./handler";
import { forwardRef } from "../forwardRef";

type ImageProps = ComponentProps<"Image">;

type ImageComponent<T extends As = "img"> = ComponentWithAs<T, ImageProps>;

/**
 * Image is a component that displays an image, providing styling that integrates well with the Kuma UI ecosystem.
 *
 * @see — http://kuma-ui.com/docs/Components/Image
 */
const Image: ImageComponent = forwardRef(
  ({ as: Component = defaultImageTag, children, ...props }, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- FIXME
    const variant = props.variant
      ? theme.getVariants("Image")?.variants?.[props.variant]
      : {};

    return (
      <Box
        as={Component}
        ref={ref}
        {...variant}
        {...props}
        children={children}
        IS_KUMA_DEFAULT
      />
    );
  }
);

export { Image, type ImageComponent, ImageProps };
