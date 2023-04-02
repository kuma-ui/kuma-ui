import { sheet } from "./sheet";

type CSSProperties = keyof CSSStyleDeclaration;
/**
 * the Babel plugin replaces the styled function with the hashed class name during the build process.
 * This is essentially a placeholder for the actual implementation that happens in the Babel plugin.
 */
export const styled = <T extends readonly CSSProperties[] | undefined>(
  strings: TemplateStringsArray,
  ...interpolations: T[]
) => {
  console.log("this code will not be executed");
  let cssString = "";

  strings.forEach((string, index) => {
    cssString += string;

    if (interpolations[index] !== undefined) {
      const interpolation = interpolations[index];

      if (
        typeof interpolation === "string" ||
        typeof interpolation === "number"
      ) {
        cssString += interpolation;
      } else {
        throw new Error("Dynamic values are not supported in Zero-Styled.");
      }
    }
  });

  const className = sheet.addRule(cssString);
  return className;
};
