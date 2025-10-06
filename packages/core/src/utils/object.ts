import { UnionToIntersection } from "./types";

type ObjectKey = string | number;

// eslint-disable-next-line @typescript-eslint/ban-types
export type Pretty<T> = { [P in keyof T]: T[P] } & {};

export type NestedObject<T = unknown> = {
  [_: ObjectKey]: T | NestedObject<T>;
};

/**
 * Flattening an object
 * input
 * const a = {
 *   b: { c: 'd' }
 * }
 *
 * output
 * const a = {
 *   b.c: 'd'
 * }
 */
export function flattenObject<const T, T2 extends NestedObject<T>>(
  object: T2,
): FlattenObject<T2> {
  const result = {} as FlattenObject<T2>;
  for (const key in object) {
    if (!Object.hasOwn(object, key)) continue;
    const value = object[key];

    if (typeof value === "object" && value !== null) {
      const _object = flattenObject(value as NestedObject);
      for (const _key in _object) {
        if (!Object.hasOwn(_object, _key)) continue;
        //@ts-expect-error type
        result[key + "." + _key] = _object[_key];
      }
    } else {
      //@ts-expect-error type
      result[key] = value;
    }
  }
  return result;
}

/**
 * Flattening an object
 * input
 * const a = {
 *   b: { c: 'd' }
 * }
 *
 * output
 * const a = {
 *   b.c: 'd'
 * }
 */
export type FlattenObject<
  T extends NestedObject,
  RestKey extends string = "",
> = UnionToIntersection<
  T extends Record<infer Key, unknown>
    ? Key extends ObjectKey
      ? T[Key] extends NestedObject
        ? FlattenObject<
            T[Key],
            RestKey extends ""
              ? `${Key & string}`
              : `${RestKey}.${Key & string}`
          >
        : Record<
            RestKey extends ""
              ? `${Key & string}`
              : `${RestKey}.${Key & string}`,
            T[Key]
          >
      : Record<Key & string, T[Key]>
    : never
>;
