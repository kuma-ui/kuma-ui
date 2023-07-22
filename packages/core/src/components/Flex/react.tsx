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
import { defaultFlexTag } from "./handler";

type FlexProps = ComponentProps<"Flex">;

type FlexComponent<T extends As = "div"> = ComponentWithAs<T, FlexProps>;

/**
 * Flex is a Box component with 'display: flex' by default. It's used to create flexible layouts in a Kuma UI application.
 * Like Box, it can accept any system style properties for extensive customization.
 *
 * @see — http://kuma-ui.com/docs/Components/Flex
 */
const Flex: FlexComponent = <T extends As = "div">({
  as: Component = defaultFlexTag,
  children,
  ...props
}: MergeWithAs<PropsOf<T>, FlexProps>) => {
  const variant = props.variant
    ? theme.getVariants("Flex")?.variants?.[props.variant]
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

export { Flex, type FlexComponent, FlexProps };
