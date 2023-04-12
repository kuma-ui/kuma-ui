import React, {
  ComponentType,
  ReactElement,
  ComponentProps,
  forwardRef,
  FunctionComponent,
  HTMLAttributes,
  cloneElement,
  createElement,
} from "react";
import { dataAttributeName } from "../utils/assignDataAttribute";
import {
  ResponsiveStyle,
  StyledProps,
  StyledKeyType,
  PseudoProps,
} from "../system";
import { sheet } from "../sheet";

type StyledComponentProps<T> = T extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[T]
  : T extends ComponentType<infer P>
  ? P
  : never;
/**
 * A higher-order component that wraps a given component with styled-system
 * functionality and applies the data-zero-styled attribute.
 *
 * the Babel plugin replaces the styled function with the hashed class name during the build process.
 * This is essentially a placeholder for the actual implementation that happens in the Babel plugin.
 *
 * @param Component - The component to be wrapped with styled-system functionality
 * @returns A new component with styled-system functionality and a unique data-zero-styled attribute
 */
export default function styled<
  T extends keyof JSX.IntrinsicElements | ComponentType<any>
>(Component: T) {
  return function <P extends Partial<StyledProps>>(
    strings: TemplateStringsArray,
    ...interpolations: ((props: P) => ResponsiveStyle)[]
  ): React.FC<Omit<StyledComponentProps<T>, StyledKeyType> & P> {
    throw Error('Using the "styled" tag in runtime is not supported.');
  };
}

// interface A extends PseudoProps, StyledProps,  {}
