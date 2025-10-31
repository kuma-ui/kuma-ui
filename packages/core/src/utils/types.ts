export type UnionToIntersection<U> = (
  U extends unknown ? (_: U) => void : never
) extends (_: infer I) => void
  ? I
  : never;

// Preserving autocompletion with the String type
// eslint-disable-next-line @typescript-eslint/ban-types
export type _String = string & {};

export type Stringify<T> = T extends string | number ? `${T}` : _String;

type IsAny<T> = 0 extends 1 & T ? true : false;

export type IsUnknown<T> = unknown extends T
  ? If<IsAny<T>, false, true>
  : false;

export type IsNever<T> = [T] extends [never] ? true : false;

export type If<Q extends boolean, T, F> = Q extends true ? T : F;
