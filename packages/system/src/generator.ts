import { generateHash } from "@kuma-ui/sheet";
import { SystemStyle } from "./types";
import { StyledProps } from "./compose";
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

    for (const [propName, propValue] of Object.entries(props)) {
      if (isStyledProp(propName.trim())) {
        styledProps[propName.trim()] = propValue;
      } else if (isPseudoProps(propName.trim())) {
        pseudoProps[propName.trim()] = propValue;
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
