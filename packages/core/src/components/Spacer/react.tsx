import { StyledProps, PseudoProps } from "@kuma-ui/system";
import React, { ReactNode } from "react";
import { As, ComponentWithAs, MergeWithAs, PropsOf } from "../types";
import { Box } from "../Box";
import { SpacerSpecificProps, spacerHandler } from "./handler";

type SpacerProps = StyledProps &
  Partial<PseudoProps> & {
    children?: ReactNode;
  } & SpacerSpecificProps;

type SpacerComponent<T extends As = "div"> = ComponentWithAs<T, SpacerProps>;

/**
 * Spacer is a utility component used to create space between other components in a Kuma UI application.
 * Accepts 'size' and 'horizontal' props, which specify the size of the space and its orientation, respectively.
 *
 * @see — Further documentation will be available in the future.
 */
const Spacer: SpacerComponent = <T extends As = "div">({
  as: Component = "div",
  children,
  ...props
}: MergeWithAs<PropsOf<T>, SpacerProps>) => {
  const { size, horizontal } = props;
  props = {
    ...spacerHandler({ size, horizontal }),
    ...props,
  };

  return <Box as={Component} {...props} children={children} />;
};

export { Spacer, type SpacerComponent, SpacerProps };
