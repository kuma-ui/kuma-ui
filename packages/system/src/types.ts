import * as CSS from "csstype";
import { StyledKeyType } from "./keys";

// A type for non-undefined CSS property values
export type CSSProperty = Exclude<
  CSS.Properties[keyof CSS.Properties],
  undefined
>;

type ConditionalNumber<Q, DefaultValue> = Q extends true
  ? number
  : DefaultValue;

// A type representing a single CSS property value or an array of them, with an optional number type if Q is true
export type CSSValue<
  P extends keyof CSS.Properties,
  Q extends boolean = false
> =
  | CSS.Properties[P]
  | ConditionalNumber<Q, never>
  | Array<NonNullable<CSS.Properties[P] | ConditionalNumber<Q, never>>>;

// // A utility type that maps a set of style keys to corresponding CSS property keys
export type UtilityCSSMapping<K extends StyledKeyType> = {
  [key in K]: keyof CSS.Properties;
};

export type ResponsiveStyle = {
  base: string;
  media: { [breakpoint: string]: string };
};
