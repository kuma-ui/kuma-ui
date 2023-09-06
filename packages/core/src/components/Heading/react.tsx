import { StyledProps, PseudoProps } from "@kuma-ui/system";
import React, { ReactNode } from "react";
import {
  As,
  ComponentWithAs,
  MergeWithAs,
  PropsOf,
  ComponentProps,
} from "../types";
import { Box } from "../Box";
import { theme } from "@kuma-ui/sheet";
import { defaultHeadingTag } from "./handler";

type HeadingProps = ComponentProps<"Heading">;

type HeadingComponent<
  T extends "h1" | "h2" | "h3" | "h4" | "h5" | "h6" = "h1"
> = ComponentWithAs<T, HeadingProps>;

/**
 * Used to render semantic HTML heading elements in a Kuma UI application.
 * By default, renders as h1 which can be customized with the 'as' prop.
 *
 * @see — http://kuma-ui.com/docs/Components/Heading
 */
const Heading: HeadingComponent = <
  T extends "h1" | "h2" | "h3" | "h4" | "h5" | "h6" = "h1"
>({
  as: Component = defaultHeadingTag,
  children,
  ...props
}: MergeWithAs<PropsOf<T>, HeadingProps>) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- FIXME
  const variant = props.variant
    ? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any -- FIXME
      theme.getVariants("Heading")?.variants?.[props.variant as any]
    : {};
  return (
    <Box
      as={Component}
      {...variant}
      {...props}
      children={children}
      IS_KUMA_DEFAULT
    />
  );
};

export { Heading, type HeadingComponent, HeadingProps };
