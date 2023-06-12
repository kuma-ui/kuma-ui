import { StyledProps, PseudoProps } from "@kuma-ui/system";
import { ThemeSystem } from "./theme";

type CSSFunction = (styles: StyledProps<ThemeSystem> & PseudoProps<ThemeSystem>) => string;

export const css: CSSFunction = () => {
  throw Error('Using the "css" in runtime is not supported.');
};
