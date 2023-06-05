import { ExcludeHyphen, RemoveColon } from ".";
import { StyledProps } from "./compose";
import { Pseudos } from "csstype";

export const pseudoMappings = {
  _active: ":active",
  _disabled: ":disabled",
  _hover: ":hover",
  _focus: ":focus",
  _focusVisible: ":focus_visible",
  _focusWithin: ":focus-within",
} as const;

export type PseudoProps = {
  [key in
    | keyof typeof pseudoMappings
    | `_${ExcludeHyphen<RemoveColon<Pseudos>>}`]?: StyledProps;
};

export const normalizePseudo = (props: string) => {
  return props.replace("_", ":");
};

export const isPseudoProps = (props: unknown): props is keyof PseudoProps => {
  return `${props}`.startsWith("_");
};
