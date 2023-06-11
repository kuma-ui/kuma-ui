export type UnionToIntersection<U> = (
  U extends unknown ? (_: U) => void : never
) extends (_: infer I) => void
  ? I
  : never;
