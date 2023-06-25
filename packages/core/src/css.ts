import { StyledProps, PseudoProps } from "@kuma-ui/system";

export const css = (_strings: TemplateStringsArray): string => {
  throw Error('Using the "css" in runtime is not supported.');
};

