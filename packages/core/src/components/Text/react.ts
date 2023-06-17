import { StyledProps, PseudoProps } from "@kuma-ui/system";
import React, { ReactNode } from "react";
import { As, ComponentWithAs, MergeWithAs, PropsOf } from "../types";

type TextProps = StyledProps &
  Partial<PseudoProps> & {
    children?: ReactNode;
  };

type TextComponent<T extends As = "p"> = ComponentWithAs<T, TextProps>;

const Text: TextComponent = <T extends As = "p">({
  as: Component = "p",
  children,
  ...props
}: MergeWithAs<PropsOf<T>, TextProps>) =>
  React.createElement(Component, props, children);

export { Text, type TextComponent, TextProps };
