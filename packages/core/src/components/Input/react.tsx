import { StyledProps, PseudoProps } from "@kuma-ui/system";
import React, { ReactNode } from "react";
import { As, ComponentWithAs, MergeWithAs, PropsOf } from "../types";
import { Box } from "../Box";

type InputProps = StyledProps &
  Partial<PseudoProps> & {
    children?: ReactNode;
  };

type InputComponent<T extends As = "input"> = ComponentWithAs<T, InputProps>;

const Input: InputComponent = <T extends As>({
  as: Component = "input",
  children,
  ...props
}: MergeWithAs<PropsOf<T>, InputProps>) => (
  <Box as={Component} {...props} children={children} />
);

export { Input, type InputComponent, InputProps };
