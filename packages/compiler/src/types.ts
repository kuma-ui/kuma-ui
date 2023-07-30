export type StaticValue =
  | string
  | number
  | boolean
  | undefined
  | Array<string | number | undefined>
  | {
      [_ in string]: StaticValue;
    };

export type Conditional = {
  type: "Conditional";
  expression: string;
  whenTrue: StaticValue;
  whenFalse: StaticValue;
};

export type Value =
  | {
      type: "Static";
      value: StaticValue;
    }
  | Conditional
  | {
      type: "Record";
      value: {
        [_ in string]: Value;
      };
    };

export const staticValue = (value: StaticValue) =>
  ({ type: "Static", value } as const);

export const recordValue = (value: {
  [_ in string]: Value;
}) => ({ type: "Record", value } as const);

export const conditional = (x: {
  expression: string;
  whenTrue: StaticValue;
  whenFalse: StaticValue;
}): Conditional => ({
  type: "Conditional",
  ...x,
});
