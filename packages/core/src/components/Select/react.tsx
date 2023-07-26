import { StyledProps, PseudoProps } from "@kuma-ui/system";
import React, { ReactNode } from "react";
import {
  As,
  ComponentProps,
  ComponentWithAs,
  MergeWithAs,
  PropsOf,
} from "../types";
import { Box } from "../Box";
import { theme } from "@kuma-ui/sheet";

type SelectProps = ComponentProps<"Select">;

type SelectComponent<T extends As = "select"> = ComponentWithAs<T, SelectProps>;

/**
 * Select is a component that allows the user to select one option from a list.
 *
 * @see — http://kuma-ui.com/docs/Components/Select
 */
const Select: SelectComponent = <T extends As = "select">({
  as: Component = "select",
  children,
  ...props
}: MergeWithAs<PropsOf<T>, SelectProps>) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- FIXME
  const variantStyle = props.variant
    ? theme.getVariants("Select")?.variants?.[props.variant]
    : {};

  return (
    <Box
      as={Component}
      {...variantStyle}
      {...props}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- FIXME
      children={children}
      IS_KUMA_DEFAULT
    />
  );
};

export { Select, type SelectComponent, SelectProps };
