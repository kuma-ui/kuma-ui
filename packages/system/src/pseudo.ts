import { ExcludeHyphen, RemoveColon } from ".";
import { StyledProps } from "./compose";
import { Pseudos } from "csstype";

export type PseudoProps = {
  [key in `_${ExcludeHyphen<RemoveColon<Pseudos>>}`]?: StyledProps;
};

export const normalizePseudo = (props: string) => {
  return props.replace("_", ":");
};

export const isPseudoProps = (props: unknown): props is keyof PseudoProps => {
  return `${props}`.startsWith("_");
};
