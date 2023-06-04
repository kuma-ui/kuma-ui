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

type RemoveColon<T extends string> = T extends `${infer R}${infer R2}`
  ? R extends ":"
    ? RemoveColon<R2>
    : `${R}${R2}`
  : T;

type ExcludeHyphen<T extends string> = Exclude<T, `-${string}`>;

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
