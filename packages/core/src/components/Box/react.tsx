import { StyledProps, PseudoProps } from "@kuma-ui/system";
import React, { ReactNode } from "react";
import { As, ComponentWithAs, MergeWithAs, PropsOf } from "../types";

type BoxProps = StyledProps &
  Partial<PseudoProps> & {
    children?: ReactNode;
  };

type BoxComponent<T extends As = "div"> = ComponentWithAs<T, BoxProps>;

const Box: BoxComponent = <T extends As = "div">({
  as: Component = "div",
  children,
  ...props
}: MergeWithAs<PropsOf<T>, BoxProps>) =>
  React.createElement(Component, props, children);

export { Box, type BoxComponent, BoxProps };
