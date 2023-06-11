type NestedObject<T> = {
  [_: string | number]: T | NestedObject<T>;
};

type Theme = {
  colors: NestedObject<string>;
};

type Pre<T> = {
  [Key in keyof T]: T[Key];
} & {};

type UnionToIntersection<U> = (
  U extends unknown ? (_: U) => void : never
) extends (_: infer I) => void
  ? I
  : never;

type ObjectFlatten<T extends object, K extends string = ""> = T extends Record<
  infer Key,
  unknown
>
  ? Key extends string | number
    ? T[Key] extends object
      ? ObjectFlatten<T[Key], K extends "" ? Key : `${K}.${Key}`>
      : Record<K extends "" ? Key : `${K}.${Key}`, T[Key]>
    : Record<Key, T[Key]>
  : never;

export interface ThemeInput {}

function flattenObject(ob: Record<string, unknown>) {
  const toReturn: Record<string, unknown> = {};

  for (const i in ob) {
    if (!ob.hasOwnProperty(i)) continue;

    if (typeof ob[i] == "object" && ob[i] !== null) {
      const flatObject = flattenObject(ob[i] as Record<string, unknown>);
      for (const x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;

        toReturn[i + "." + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
}

export function createTheme<const T extends Theme>(
  theme: T
): { colors: Pre<UnionToIntersection<ObjectFlatten<T>>> } {
  return flattenObject(theme) as any;
}

const s = createTheme({ colors: { red: "#red", blue: { dark: "#blue" } } });
