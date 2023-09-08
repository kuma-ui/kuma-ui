import { StyledProps, PseudoProps } from "@kuma-ui/system";
import React, { ReactNode } from "react";
import { As, ComponentWithAs, MergeWithAs, PropsOf } from "../types";
import { Box } from "../Box";
import { theme } from "@kuma-ui/sheet";
import { ComponentProps } from "../types";
import { defaultInputTag } from "./handler";

type InputProps = ComponentProps<"Input">;
type InputComponent<T extends As = "input"> = ComponentWithAs<T, InputProps>;

/**
 * The Input component inherits from the HTML input element and can be combined with Kuma UI's style properties for extensive customization.
 *
 * @see — http://kuma-ui.com/docs/Components/Input
 */
const Input: InputComponent = <T extends As>({
  as: Component = defaultInputTag,
  children,
  ...props
}: MergeWithAs<PropsOf<T>, InputProps>) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- FIXME
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
