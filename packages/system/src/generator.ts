import { generateHash } from "@kuma-ui/sheet";
import { SystemStyle } from "./types";
import { StyledProps } from "./compose";
import { isStyledProp } from "./keys";
import { PseudoProps, isPseudoProps, normalizePseudo } from "./pseudo";
import { all } from ".";

export class StyleGenerator {
  private style: SystemStyle;
  private className: string;

  constructor(props: StyledProps & PseudoProps, isDynamic = false) {
    const styledProps: { [key: string]: any } = {};
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
    const prefix = isDynamic ? "🦄-" : "🐻-";

    this.className = prefix + generateHash(JSON.stringify(this.style));
  }

  getClassName() {
    return this.className;
  }

  getCSS() {
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
