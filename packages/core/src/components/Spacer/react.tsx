import { StyledProps, PseudoProps } from "@kuma-ui/system";
import React, { ReactNode } from "react";
import { As, ComponentWithAs, MergeWithAs, PropsOf } from "../types";

type SpacerProps = StyledProps &
  Partial<PseudoProps> & {
    children?: ReactNode;
  } & {
    size?: number | string;
    horizontal?: boolean;
  };

type SpacerComponent<T extends As = "div"> = ComponentWithAs<T, SpacerProps>;

const Spacer: SpacerComponent = <T extends As = "div">({
  as: Component = "div",
  children,
  ...props
}: MergeWithAs<PropsOf<T>, SpacerProps>) =>
  React.createElement(Component, props, children);

export { Spacer, type SpacerComponent, SpacerProps };
