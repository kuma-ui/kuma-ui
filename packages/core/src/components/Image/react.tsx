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

type ImageProps = ComponentProps<"Image">;

type ImageComponent<T extends As = "img"> = ComponentWithAs<T, ImageProps>;

/**
 * Image is a component that displays an image, providing styling that integrates well with the Kuma UI ecosystem.
 *
 * @see — http://kuma-ui.com/docs/Components/Image
 */
const Image: ImageComponent = <T extends As>({
  as: Component = "img",
  children,
  ...props
}: MergeWithAs<PropsOf<T>, ImageProps>) => {
  const variant = props.variant
    ? theme.getVariants("Image")?.variants?.[props.variant]
    : {};

  return (
    <Box
      as={Component}
      {...variant}
      {...props}
      children={children}
      IS_KUMA_DEFAULT
    />
  );
};

export { Image, type ImageComponent, ImageProps };
