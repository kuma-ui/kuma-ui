import type { ComponentType } from "react";
import {
  ResponsiveStyle,
  StyledProps,
  StyledKeyType,
  PseudoProps,
} from "@kuma-ui/system";

export type StyledComponentProps<T> = T extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[T]
  : T extends ComponentType<infer P>
  ? P
  : never;
/**
 * Kuma UI's `styled` API allows you to create styled React components using tagged template literals. This makes it a familiar and comfortable choice for developers who have worked with libraries like styled-components or Emotion.
 */
function styled<T extends keyof JSX.IntrinsicElements>(Component: T) {
  const fn = (
    strings: TemplateStringsArray
  ): React.FC<React.ComponentProps<T>> => {
    throw Error('Using the "styled" tag in runtime is not supported.') as any;
  };
  return fn;
}

export { styled };
