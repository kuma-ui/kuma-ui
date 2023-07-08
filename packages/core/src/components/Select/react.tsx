import { StyledProps, PseudoProps } from "@kuma-ui/system";
import React, { ReactNode } from "react";
import { As, ComponentWithAs, MergeWithAs, PropsOf } from "../types";
import { Box } from "../Box";

type SelectProps = StyledProps &
  Partial<PseudoProps> & {
    children?: ReactNode;
  };

type SelectComponent<T extends As = "select"> = ComponentWithAs<T, SelectProps>;

const Select: SelectComponent = <T extends As = "select">({
  as: Component = "select",
  children,
  ...props
}: MergeWithAs<PropsOf<T>, SelectProps>) => (
  <Box as={Component} {...props} children={children} IS_KUMA_DEFAULT />
);

export { Select, type SelectComponent, SelectProps };
