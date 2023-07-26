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
import { defaultButtonTag } from "./handler";

type ButtonProps = ComponentProps<"Button">;

type ButtonComponent<T extends As = "button"> = ComponentWithAs<T, ButtonProps>;

/**
 * Button is a clickable component used to trigger actions or events in a Kuma UI application.
 *
 * @see — http://kuma-ui.com/docs/Components/Button
 */
const Button: ButtonComponent = <T extends As = "button">({
  as: Component = defaultButtonTag,
  children,
  ...props
}: MergeWithAs<PropsOf<T>, ButtonProps>) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- FIXME
  const variant = props.variant
    ? theme.getVariants("Button")?.variants?.[props.variant]
    : {};
  return (
    <Box
      as={Component}
      {...variant}
      {...props}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- FIXME
      children={children}
      IS_KUMA_DEFAULT
    />
  );
};

export { Button, type ButtonComponent, ButtonProps };
