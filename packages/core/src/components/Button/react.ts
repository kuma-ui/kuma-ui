import { StyledProps, PseudoProps } from "@kuma-ui/system";
import React, { ReactNode } from "react";
import { As, ComponentWithAs, MergeWithAs, PropsOf } from "../types";

type ButtonProps = StyledProps &
  Partial<PseudoProps> & {
    children?: ReactNode;
  };

type ButtonComponent<T extends As = "button"> = ComponentWithAs<T, ButtonProps>;

const Button: ButtonComponent = <T extends As = "button">({
  as: Component = "button",
  children,
  ...props
}: MergeWithAs<PropsOf<T>, ButtonProps>) =>
  React.createElement(Component, props, children);

export { Button, type ButtonComponent, ButtonProps };
