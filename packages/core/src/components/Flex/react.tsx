import { StyledProps, PseudoProps } from "@kuma-ui/system";
import React, { ReactNode } from "react";
import { As, ComponentWithAs, MergeWithAs, PropsOf } from "../types";

type FlexProps = StyledProps &
  Partial<PseudoProps> & {
    children?: ReactNode;
  };

type FlexComponent<T extends As = "div"> = ComponentWithAs<T, FlexProps>;

/**
 * Flex is a Box component with 'display: flex' by default. It's used to create flexible layouts in a Kuma UI application.
 * Like Box, it can accept any system style properties for extensive customization.
 *
 * @see — Further documentation will be available in the future.
 */
const Flex: FlexComponent = <T extends As = "div">({
  as: Component = "div",
  children,
  ...props
}: MergeWithAs<PropsOf<T>, FlexProps>) =>
  React.createElement(Component, props, children);

export { Flex, type FlexComponent, FlexProps };
