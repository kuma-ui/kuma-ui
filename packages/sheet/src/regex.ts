export const removeSpacesAroundCssPropertyValues = (css: string) => {
  const regex = /(:)\s+|\s+(;)/g;
  return css.replace(regex, "$1$2");
};

// removes whitespace except around CSS property values and after commas.
export const removeSpacesExceptInProperties = (css: string) => {
  const regex = /(:)\s+|\s+(?=;)|(\{)\s+|\s+(?=\})|(,)\s+|\s+(?=,)|\s+(?={)/g;
  return css.replace(regex, "$1$2$3");
};
