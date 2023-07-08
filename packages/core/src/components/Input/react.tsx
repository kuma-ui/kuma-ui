import { StyledProps, PseudoProps } from "@kuma-ui/system";
import React, { ReactNode } from "react";
import { As, ComponentWithAs, MergeWithAs, PropsOf } from "../types";
import { Box } from "../Box";
import { theme } from "@kuma-ui/sheet";

type InputProps = StyledProps &
  Partial<PseudoProps> & {
    children?: ReactNode;
  };

type InputComponent<T extends As = "input"> = ComponentWithAs<T, InputProps>;

const Input: InputComponent = <T extends As>({
  as: Component = "input",
  children,
  ...props
}: MergeWithAs<PropsOf<T>, InputProps>) => {
  const variantStyle = props.variant
    ? theme.getVariants("Input")?.variants?.[props.variant]
    : {};
  return (
    <Box
      as={Component}
      {...variantStyle}
      {...props}
      children={children}
      IS_KUMA_DEFAULT
    />
  );
};

export { Input, type InputComponent, InputProps };
