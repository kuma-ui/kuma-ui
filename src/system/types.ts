import * as CSS from "csstype";
import { StyledKeyType } from "./keys";

// A type for non-undefined CSS property values
export type CSSProperty = Exclude<
  CSS.Properties[keyof CSS.Properties],
  undefined
>;

// A type representing a single CSS property value or an array of them
export type CSSValue<P extends keyof CSS.Properties> =
  | CSS.Properties[P]
  | Array<NonNullable<CSS.Properties[P]>>;

// // A utility type that maps a set of style keys to corresponding CSS property keys
export type UtilityCSSMapping<K extends StyledKeyType> = {
  [key in K]: keyof CSS.Properties;
};
