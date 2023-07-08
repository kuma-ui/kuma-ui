import { StyledProps, PseudoProps } from "@kuma-ui/system";
import { theme } from "@kuma-ui/sheet";
import React, { ReactNode } from "react";
import {
  As,
  ComponentWithAs,
  MergeWithAs,
  PropsOf,
  ComponentProps,
} from "../types";
import { Box } from "../Box";

type VStackProps = ComponentProps<"VStack">;

type VStackComponent<T extends As = "div"> = ComponentWithAs<T, VStackProps>;

/**
 * VStack is a Box component with 'display: VStack' by default. It's used to create VStackible layouts in a Kuma UI application.
 * Like Box, it can accept any system style properties for extensive customization.
 *
 * @see — Further documentation will be available in the future.
 */
const VStack: VStackComponent = <T extends As = "div">({
  as: Component = "div",
  children,
  ...props
}: MergeWithAs<PropsOf<T>, VStackProps>) => {
  const variant = props.variant
    ? theme.getVariants("VStack")?.variants?.[props.variant]
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

export { VStack, type VStackComponent, VStackProps };
