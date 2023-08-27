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
import { defaultTextTag } from "./handler";

type TextProps = ComponentProps<"Text">;

type TextComponent<T extends As = "p"> = ComponentWithAs<T, TextProps>;

/**
 * Used to render text content or paragraphs in a Kuma UI application.
 *
 * @see — http://kuma-ui.com/docs/Components/Text
 */
const Text: TextComponent = <T extends As = "p">({
  as: Component = defaultTextTag,
  children,
  ...props
}: MergeWithAs<PropsOf<T>, TextProps>) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- FIXME
  const variant = props.variant
    ? theme.getVariants("Text")?.variants?.[props.variant]
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

export { Text, type TextComponent, TextProps };
