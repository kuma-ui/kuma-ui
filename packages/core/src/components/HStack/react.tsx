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
import { defaultHStackTag } from "./handler";
import { forwardRef } from "../forwardRef";

type HStackProps = ComponentProps<"HStack">;

type HStackComponent<T extends As = "div"> = ComponentWithAs<T, HStackProps>;

/**
 * HStack is a Box component with `display="flex"` and `flex-direction: row` set by default. It makes it easier to layout and align child components in a horizontal direction. It is a fundamental layout component in Kuma UI.
 *
 * @see — http://kuma-ui.com/docs/Components/HStack
 */
const HStack: HStackComponent = forwardRef(
  ({ as: Component = defaultHStackTag, children, ...props }, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- FIXME
    const variant = props.variant
      ? theme.getVariants("HStack")?.variants?.[props.variant]
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

export { HStack, type HStackComponent, HStackProps };
