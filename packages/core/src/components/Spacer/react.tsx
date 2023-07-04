import { StyledProps, PseudoProps } from "@kuma-ui/system";
import React, { ReactNode } from "react";
import {
  As,
  ComponentWithAs,
  MergeWithAs,
  PropsOf,
  StyleProps,
} from "../types";
import { Box } from "../Box";
import { SpacerSpecificProps, spacerHandler } from "./handler";
import { theme } from "@kuma-ui/sheet";

type SpacerProps = StyleProps & SpacerSpecificProps;

type SpacerComponent<T extends As = "div"> = ComponentWithAs<T, SpacerProps>;

/**
 * Spacer is a utility component used to create space between other components in a Kuma UI application.
 * Accepts 'size' and 'horizontal' props, which specify the size of the space and its orientation, respectively.
 *
 * @see — Further documentation will be available in the future.
 */
const Spacer: SpacerComponent = <T extends As = "div">({
  as: Component = "div",
  children,
  size,
  horizontal,
  ...props
}: MergeWithAs<PropsOf<T>, SpacerProps>) => {
  props = {
    ...spacerHandler({ size, horizontal }),
    ...props,
  };

  const variant = props.variant
    ? theme.getVariants("Spacer")?.variants?.[props.variant]
    : {};

  return <Box as={Component} {...variant} {...props} children={children} />;
};

export { Spacer, type SpacerComponent, SpacerProps };
