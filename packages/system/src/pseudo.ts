import { StyledProps } from "./consumeStyleProps";
import { ThemeSystemType, ExcludeHyphen, RemoveColon } from "./types";
import { Pseudos } from "csstype";

export type PseudoProps<T extends ThemeSystemType = ThemeSystemType> = {
  [key in `_${ExcludeHyphen<RemoveColon<Pseudos>>}`]?: StyledProps<T>;
};

export const normalizePseudo = (props: string) => {
  return props.replace("_", ":");
};

export const isPseudoProps = (props: unknown): props is keyof PseudoProps => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- FIXME
  return `${props}`.startsWith("_");
};
