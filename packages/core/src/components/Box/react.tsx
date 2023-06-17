import { StyledProps, PseudoProps } from "@kuma-ui/system";
import React, { ReactNode } from "react";
import { As, ComponentWithAs, MergeWithAs, PropsOf } from "../types";

type BoxProps = StyledProps &
  Partial<PseudoProps> & {
    children?: ReactNode;
  };

type BoxComponent<T extends As = "div"> = ComponentWithAs<T, BoxProps>;

/**
 * Box is the most abstract component in Kuma UI, providing a base upon which all other components are built.
 * It renders a div element by default, and can accept any system style properties for extensive customization.
 *
 * @see — Further documentation will be available in the future.
 */
const Box: BoxComponent = <T extends As = "div">({
  as: Component = "div",
  children,
  ...props
}: MergeWithAs<PropsOf<T>, BoxProps>) =>
  React.createElement(Component, props, children);

export { Box, type BoxComponent, BoxProps };
