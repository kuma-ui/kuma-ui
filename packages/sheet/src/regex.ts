// removes white space around property values
export const cssPropertyRegex = /(?<=:)\s+|\s+(?=;)/g;

// removes whitespace except around CSS property values and after commas.
export const removeSpacesExceptInPropertiesRegex =
  /(?<=:)\s+|\s+(?=;)|(?<=\{)\s+|\s+(?=\})|(?<=,)\s+|\s+(?=,)|\s+(?={)/g;
