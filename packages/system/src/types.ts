import * as CSS from "csstype";
import { StyledKeyType } from "./keys";
import { Tokens } from "@kuma-ui/sheet";

type If<C extends boolean, T, F> = C extends true ? T : F;

// eslint-disable-next-line @typescript-eslint/ban-types
export type ThemeSystemType = Record<Tokens, string & {}>;

// A type for non-undefined CSS property values
export type CSSProperty = Exclude<
  CSS.Properties[keyof CSS.Properties],
  undefined
>;

export type RemoveColon<T extends string> = T extends `${infer R}${infer R2}`
  ? R extends ":"
    ? RemoveColon<R2>
    : `${R}${R2}`
  : T;

export type ExcludeHyphen<T extends string> = Exclude<T, `-${string}`>;

// A type representing a single CSS property value or an array of them, with an optional number type if Q is true
export type CSSValue<
  P extends keyof CSS.Properties,
  Q extends boolean = false,
> = CSSProperties<P, Q>[P];

export type CSSProperties<
  P extends keyof CSS.Properties,
  Q extends boolean = false,
> = If<
  Q,
  Pick<CSS.PropertiesFallback<number>, P>,
  Pick<CSS.PropertiesFallback, P>
>;

// // A utility type that maps a set of style keys to corresponding CSS property keys
export type UtilityCSSMapping<K extends StyledKeyType> = {
  [key in K]: keyof CSS.Properties;
};

export type ResponsiveStyle = {
  base: string;
  media: { [breakpoint: string]: string };
};

export type SystemStyle = {
  base: ResponsiveStyle["base"];
  responsive: ResponsiveStyle["media"];
  pseudo: {
    key: string;
    base: ResponsiveStyle["base"];
    responsive: ResponsiveStyle["media"];
  }[];
};

export type AddProperty<T, T2> = {
  [Key in keyof T]: T[Key] | T2;
};
