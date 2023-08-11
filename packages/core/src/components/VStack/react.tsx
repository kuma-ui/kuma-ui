/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { theme } from "@kuma-ui/sheet";
import React from "react";
import {
  As,
  ComponentWithAs,
  MergeWithAs,
  PropsOf,
  ComponentProps,
} from "../types";
import { Box } from "../Box";
import { forwardRef } from "../forwardRef";

type VStackProps = ComponentProps<"VStack">;

type VStackComponent<T extends As = "div"> = ComponentWithAs<T, VStackProps>;

/**
 * VStack is a Box component with `display="flex"` and `flex-direction: column` set by default. It makes it easier to layout and align child components in a vertical direction. It is a fundamental layout component in Kuma UI.
 *
 * @see — http://kuma-ui.com/docs/Components/VStack
 */
const VStack: VStackComponent = forwardRef<"div", VStackProps>((props, ref) => {
  const { as: Component = "div", children, ...restProps } = props;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- FIXME
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const variant = restProps.variant
    ? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      theme.getVariants("VStack")?.variants?.[restProps.variant]
    : {};
  return (
    <Box
      ref={ref}
      as={Component}
      {...variant}
      {...restProps}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- FIXME
      children={children}
      IS_KUMA_DEFAULT
    />
  );
});

export { VStack, type VStackComponent, VStackProps };
