import { StyledProps, PseudoProps } from "@kuma-ui/system";
import React, { ReactNode } from "react";
import { As, ComponentWithAs, MergeWithAs, PropsOf } from "../types";

type HeadingProps = StyledProps &
  Partial<PseudoProps> & {
    children?: ReactNode;
  };

type HeadingComponent<
  T extends "h1" | "h2" | "h3" | "h4" | "h5" | "h6" = "h1"
> = ComponentWithAs<T, HeadingProps>;

/**
 * Used to render semantic HTML heading elements in a Kuma UI application.
 * By default, renders as h1 which can be customized with the 'as' prop.
 *
 * @see — Further documentation will be available in the future.
 */
const Heading: HeadingComponent = <
  T extends "h1" | "h2" | "h3" | "h4" | "h5" | "h6" = "h1"
>({
  as: Component = "h1",
  children,
  ...props
}: MergeWithAs<PropsOf<T>, HeadingProps>) =>
  React.createElement(Component, props, children);

export { Heading, type HeadingComponent, HeadingProps };
