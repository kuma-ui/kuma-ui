import type { ComponentType } from "react";
import { ComponentProps, ComponentWithAs } from "./components/types";

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
  ): ComponentWithAs<T, ComponentProps<"Box">> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- FIXME
    throw Error('Using the "styled" tag in runtime is not supported.') as any;
  };
  return fn;
}

export { styled };
