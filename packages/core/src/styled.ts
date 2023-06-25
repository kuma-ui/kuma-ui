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
 * A higher-order component that wraps a given component with styled-system
 * functionality and applies the data-kuma-ui attribute.
 *
 * the Babel plugin replaces the styled function with the hashed class name during the build process.
 * This is essentially a placeholder for the actual implementation that happens in the Babel plugin.
 *
 * @param Component - The component to be wrapped with styled-system functionality
 * @returns A new component with styled-system functionality and a unique data-kuma-ui attribute
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
