type StyleFunction = (props: any) => string;

export const compose = (...styleFunctions: StyleFunction[]): StyleFunction => {
  return (props: any): string => {
    return styleFunctions.reduce((styles, styleFunction) => {
      return styles + styleFunction(props);
    }, "");
  };
};
