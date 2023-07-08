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

type HStackProps = ComponentProps<"HStack">;

type HStackComponent<T extends As = "div"> = ComponentWithAs<T, HStackProps>;

/**
 * HStack is a Box component with 'display: HStack' by default. It's used to create HStackible layouts in a Kuma UI application.
 * Like Box, it can accept any system style properties for extensive customization.
 *
 * @see — Further documentation will be available in the future.
 */
const HStack: HStackComponent = <T extends As = "div">({
  as: Component = "div",
  children,
  ...props
}: MergeWithAs<PropsOf<T>, HStackProps>) => {
  const variant = props.variant
    ? theme.getVariants("HStack")?.variants?.[props.variant]
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

export { HStack, type HStackComponent, HStackProps };
