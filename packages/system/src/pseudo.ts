import { StyledProps } from "./consumeStyleProps";
import { ThemeSystemType, ExcludeHyphen, RemoveColon } from "./types";
import { Pseudos } from "csstype";

export type PseudoKeys = `_${ExcludeHyphen<RemoveColon<Pseudos>>}`;
export type PseudoProps<T extends ThemeSystemType = ThemeSystemType> = Partial<
  Record<PseudoKeys, StyledProps<T>>
>;

export const normalizePseudo = (props: string) => {
  return props.replace("_", ":");
};

export const isPseudoProps = (props: unknown): props is keyof PseudoProps => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- FIXME
  return `${props}`.startsWith("_");
};
