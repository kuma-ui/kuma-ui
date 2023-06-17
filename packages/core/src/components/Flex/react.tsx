import { StyledProps, PseudoProps } from "@kuma-ui/system";
import React, { ReactNode } from "react";
import { As, ComponentWithAs, MergeWithAs, PropsOf } from "../types";

type FlexProps = StyledProps &
  Partial<PseudoProps> & {
    children?: ReactNode;
  };

type FlexComponent<T extends As = "div"> = ComponentWithAs<T, FlexProps>;

const Flex: FlexComponent = <T extends As = "div">({
  as: Component = "div",
  children,
  ...props
}: MergeWithAs<PropsOf<T>, FlexProps>) =>
  React.createElement(Component, props, children);

export { Flex, type FlexComponent, FlexProps };
