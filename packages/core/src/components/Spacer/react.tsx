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
import { SpacerSpecificProps, spacerHandler } from "./handler";
import { theme } from "@kuma-ui/sheet";
import { defaultSpacerTag } from "./handler";

type SpacerProps = ComponentProps<"Spacer"> & SpacerSpecificProps;

type SpacerComponent<T extends As = "div"> = ComponentWithAs<T, SpacerProps>;

/**
 * Spacer is a utility component used to create space between other components in a Kuma UI application.
 * Accepts 'size' and 'horizontal' props, which specify the size of the space and its orientation, respectively.
 *
 * @see — Further documentation will be available in the future.
 */
const Spacer: SpacerComponent = <T extends As = "div">({
  as: Component = defaultSpacerTag,
  children,
  size,
  horizontal,
  ...props
}: MergeWithAs<PropsOf<T>, SpacerProps>) => {
  props = {
    ...spacerHandler({ size, horizontal }),
    ...props,
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- FIXME
  const variant = props.variant
    ? theme.getVariants("Spacer")?.variants?.[props.variant]
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

export { Spacer, type SpacerComponent, SpacerProps };
