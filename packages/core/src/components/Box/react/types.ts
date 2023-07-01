import { StyledProps, PseudoProps } from "@kuma-ui/system";
import { ReactNode } from "react";
import { As, ComponentWithAs } from "../../types";

export type BoxProps = StyledProps &
  PseudoProps & {
    children?: ReactNode;
  };

export type BoxComponent<T extends As = "div"> = ComponentWithAs<T, BoxProps>;
