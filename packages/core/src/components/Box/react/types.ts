import { StyledProps, PseudoProps } from "@kuma-ui/system";
import { ReactNode } from "react";
import { As, ComponentWithAs, StyleProps } from "../../types";

export type BoxProps = StyleProps;

export type BoxComponent<T extends As = "div"> = ComponentWithAs<T, BoxProps>;
