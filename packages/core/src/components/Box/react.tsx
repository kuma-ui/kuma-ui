import { StyledProps, PseudoProps } from "@kuma-ui/system";
import React, { ReactNode } from "react";
import { componentList } from "../componentList";

type BoxProps<T extends keyof JSX.IntrinsicElements> = {
  as?: T;
  children?: ReactNode;
} & JSX.IntrinsicElements[T] &
  StyledProps &
  Partial<PseudoProps>;

function Box<T extends keyof JSX.IntrinsicElements = "div">({
  as,
  children,
  ...props
}: BoxProps<T>) {
  const Component = as || "div";
  return React.createElement(Component, props, children);
}

export { Box, type BoxProps };
