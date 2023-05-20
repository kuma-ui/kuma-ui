import { StyledProps, PseudoProps } from "@kuma-ui/system";

type CSSFunction = {
  (styles: StyledProps & PseudoProps): string;
};

export const css: CSSFunction = () => {
  throw Error('Using the "css" in runtime is not supported.');
};
