import { As, ComponentWithAs, ComponentProps } from "../../types";

export type BoxProps = ComponentProps;

export type BoxComponent<T extends As = "div"> = ComponentWithAs<T, BoxProps>;
