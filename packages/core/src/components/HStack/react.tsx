import { StyledProps, PseudoProps } from "@kuma-ui/system";
import React, { ReactNode } from "react";
import { As, ComponentWithAs, MergeWithAs, PropsOf } from "../types";
import { Box } from "../Box";

type HStackProps = StyledProps &
  Partial<PseudoProps> & {
    children?: ReactNode;
  };

type HStackComponent<T extends "h1" | "h2" | "h3" | "h4" | "h5" | "h6" = "h1"> =
  ComponentWithAs<T, HStackProps>;

/**
 * Used to render semantic HTML HStack elements in a Kuma UI application.
 * By default, renders as h1 which can be customized with the 'as' prop.
 *
 * @see — Further documentation will be available in the future.
 */
const HStack: HStackComponent = <
  T extends "h1" | "h2" | "h3" | "h4" | "h5" | "h6" = "h1"
>({
  as: Component = "h1",
  children,
  ...props
}: MergeWithAs<PropsOf<T>, HStackProps>) => (
  <Box as={Component} {...props} children={children} />
);

export { HStack, type HStackComponent, HStackProps };
