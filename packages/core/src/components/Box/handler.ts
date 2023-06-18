const boxSpecificProps = ["variant"] as const;

const boxSpecificPropMap = new Map(
  boxSpecificProps.map((prop) => [prop, true])
);

type BoxSpecificProp = (typeof boxSpecificProps)[number];

export const isBoxProps = (propName: unknown): propName is BoxSpecificProp => {
  return Object.keys(boxSpecificPropMap).some((k) => k === propName);
};
