export type UnionToIntersection<U> = (
  U extends unknown ? (_: U) => void : never
) extends (_: infer I) => void
  ? I
  : never;

// eslint-disable-next-line @typescript-eslint/ban-types
export type _String = string & {};

export type Stringify<T> = T extends string ? T : _String;

export type IsAny<T> = 0 extends (1 & T) ? true : false;

export type If<Q extends boolean, T, F> = Q extends true ? T : F;
