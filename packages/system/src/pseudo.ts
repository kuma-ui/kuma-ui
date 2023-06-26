import { StyledProps } from "./compose";
import { ThemeSystemType, ExcludeHyphen, RemoveColon } from "./types";
import { Pseudos } from "csstype";

export type PseudoProps<T extends ThemeSystemType = ThemeSystemType> = {
  [key in `_${ExcludeHyphen<RemoveColon<Pseudos>>}`]?: StyledProps<T>;
};

export const normalizePseudo = (props: string) => {
  return props.replace("_", ":");
};

export const isPseudoProps = (props: unknown): props is keyof PseudoProps => {
  return `${props}`.startsWith("_");
};
