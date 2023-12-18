import { Tokens, generateHash, theme } from "@kuma-ui/sheet";
import { SystemStyle } from "./types";
import { StyledProps } from "./consumeStyleProps";
import { isStyledProp } from "./keys";
import { PseudoProps, isPseudoProps, normalizePseudo } from "./pseudo";
import { all } from ".";

export class StyleGenerator {
  private style: SystemStyle | undefined;
  private className: string;

  constructor(props: StyledProps & PseudoProps, isDynamic = false) {
    if (!props || Object.keys(props).length === 0) {
      this.className = "";
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- FIXME
    const styledProps: { [key: string]: any } = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- FIXME
    const pseudoProps: { [key: string]: any } = {};

    /**
     * Find the theme style from the user theme defined in the `kuma.config.ts` file.
     * @example
     * findThemeStyle("colors.primary") // returns "#000"
     */
    const findThemeStyle = (value: string) => {
      const userTheme = theme.getUserTheme();
      const propKey = value.split(".")[0] as Tokens;
      if (userTheme[propKey] === undefined) return undefined;

      for (const key in userTheme[propKey]) {
        if (value === key) {
          return userTheme[propKey]![key];
        }
      }
      return undefined;
    };

    /**
     * @example
     * isThemeStyle("colors.primary") // returns true
     * isThemeStyle("primary") // returns false
     */
    const isThemeStyle = (propValue: unknown): propValue is string => {
      return (
        typeof propValue === "string" &&
        /[a-zA-Z]+\.[a-zA-Z0-9]+/.test(propValue) &&
        !/^\w+\(.*\)$/.test(propValue) // exclude CSS functions
      );
    };

    /**
     * If the argument value is a user theme defined in the `kuma.config.ts` file, it is converted,
     * otherwise the value of value is returned as is.
     * @example
     * convertStyle("color", "colors.primary") // returns "#000000"
     * convertStyle("color", ['colors.primary', 'colors.secondary']) // returns ["#000000", "#ffffff"]
     * convertStyle("color", "#ffffff") // returns "#ffffff"
     */
    /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return -- FIXME */
    const convertStyle = (name: string, value: any) => {
      // color={['colors.primary', 'colors.secondary']}
      if (Array.isArray(value)) {
        return value.map((v) => {
          if (isThemeStyle(v)) {
            const customStyle = findThemeStyle(v);
            if (customStyle !== undefined) {
              return customStyle;
            }
          }
          return v;
        });
        // color="colors.primary"
      } else if (isThemeStyle(value)) {
        const customStyle = findThemeStyle(value);
        if (customStyle !== undefined) {
          return customStyle;
        }
        // color="#ffffff"
      } else if (isStyledProp(name)) {
        return value;
      }
      return value;
    };
    // eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return -- FIXME

    for (const [propName, propValue] of Object.entries(props)) {
      if (isPseudoProps(propName)) {
        pseudoProps[propName] = propValue;
        for (const [name, value] of Object.entries(propValue)) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- FIXME
          pseudoProps[propName] = {
            ...pseudoProps[propName],
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- FIXME
            [name]: convertStyle(name, value),
          };
        }
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- FIXME
        styledProps[propName] = convertStyle(propName, propValue);
      }
    }

    const convertedPseudoProps: SystemStyle["pseudo"] = Object.keys(pseudoProps)
      .length
      ? Object.entries(pseudoProps).map(([pseudoKey, pseudoValue]) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- FIXME
          const pseudoStyle = all(pseudoValue);
          return {
            key: normalizePseudo(pseudoKey),
            base: pseudoStyle.base,
            responsive: pseudoStyle.media,
          };
        })
      : [];
    this.style = {
      base: all(styledProps).base,
      responsive: all(styledProps).media,
      pseudo: convertedPseudoProps,
    };

    this.className =
      StyleGenerator.getClassNamePrefix(isDynamic) +
      generateHash(JSON.stringify(this.style));
  }

  private static getClassNamePrefix(isDynamic = false) {
    const isProduction = process.env.NODE_ENV === "production";
    if (isProduction) return "kuma-";
    return isDynamic ? "🦄-" : "🐻-";
  }

  getClassName() {
    return this.className;
  }

  getCSS() {
    if (!this.style) {
      return "";
    }

    let css = `.${this.className} { ${this.style.base} }`;
    for (const [breakpoint, cssValue] of Object.entries(
      this.style.responsive
    )) {
      css += `@media (min-width: ${breakpoint}) { .${this.className} { ${cssValue} } }`;
    }
    for (const pseudo of this.style.pseudo) {
      css += `.${this.className}${pseudo.key} { ${pseudo.base} }`;
      for (const [breakpoint, cssValue] of Object.entries(pseudo.responsive)) {
        css += `@media (min-width: ${breakpoint}) { .${this.className}${pseudo.key} { ${cssValue} } }`;
      }
    }
    return css;
  }

  getStyle() {
    return { css: this.getCSS(), className: this.getClassName() };
  }
}
