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

export type StyleTemplate<T extends keyof JSX.IntrinsicElements> = (
  strings: TemplateStringsArray
) => React.FC<React.ComponentProps<T>>;

function _styled<T extends keyof JSX.IntrinsicElements>(Component: T) {
  const fn: StyleTemplate<T> = (strings) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- FIXME
    throw Error('Using the "styled" tag in runtime is not supported.') as any;
  };
  return fn;
}
/**
 * Kuma UI's `styled` API allows you to create styled React components using tagged template literals. This makes it a familiar and comfortable choice for developers who have worked with libraries like styled-components or Emotion.
 */
const styled = new Proxy(_styled, {
  get(target, key) {
    return target(key as keyof JSX.IntrinsicElements);
  },
}) as typeof _styled & {
  [T in keyof JSX.IntrinsicElements]: StyleTemplate<T>;
};

export { styled };
