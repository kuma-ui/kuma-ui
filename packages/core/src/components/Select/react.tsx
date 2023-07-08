import { StyledProps, PseudoProps } from "@kuma-ui/system";
import React, { ReactNode } from "react";
import { As, ComponentWithAs, MergeWithAs, PropsOf } from "../types";
import { Box } from "../Box";
import { theme } from "@kuma-ui/sheet";

type SelectProps = StyledProps &
  Partial<PseudoProps> & {
    children?: ReactNode;
  };

type SelectComponent<T extends As = "select"> = ComponentWithAs<T, SelectProps>;

const Select: SelectComponent = <T extends As = "select">({
  as: Component = "select",
  children,
  ...props
}: MergeWithAs<PropsOf<T>, SelectProps>) => {
  const variantStyle = props.variant
    ? theme.getVariants("Select")?.variants?.[props.variant]
    : {};

  return (
    <Box
      as={Component}
      {...variantStyle}
      {...props}
      children={children}
      IS_KUMA_DEFAULT
    />
  );
};

export { Select, type SelectComponent, SelectProps };
