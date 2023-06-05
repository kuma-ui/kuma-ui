import { generateHash } from "./hash";
import { cssPropertyRegex, removeSpacesExceptInPropertiesRegex } from "./regex";
import { compile, serialize, stringify } from "stylis";

// to avoid cyclic dependency, we declare an exact same type declared in @kuma-ui/system
type ResponsiveStyle = {
  base: string;
  media: {
    [breakpoint: string]: string;
  };
};

export interface Rule {
  id: string;
  css: string;
}

export class Sheet {
  private static instance: Sheet;
  private rules: Rule[];
  private responsive: string[];
  private pseudo: string[];

  private css: string[];

  private constructor() {
    this.rules = [];
    this.responsive = [];
    this.pseudo = [];
    this.css = [];
  }

  static getInstance() {
    if (!Sheet.instance) {
      Sheet.instance = new Sheet();
    }
    return Sheet.instance;
  }

  addRule(css: string): string {
    css = css.replace(cssPropertyRegex, "");
    const id = "kuma-" + generateHash(css);
    const existingRule = this.rules.find((rule) => rule.id === id);
    if (!existingRule) this.rules.push({ id, css });
    return id;
  }

  addMediaRule(className: string, css: string, breakpoint: string): void {
    css = css.replace(cssPropertyRegex, "");
    const mediaCss =
      `@media (min-width: ${breakpoint}) { .${className} { ${css} } }`.replace(
        removeSpacesExceptInPropertiesRegex,
        ""
      );
    this.responsive.push(mediaCss);
  }

  addPseudoRule(className: string, css: string, pseudo: string): void {
    css = css.replace(cssPropertyRegex, "");
    const pseudoCss = `.${className}${pseudo} { ${css} }`.replace(
      removeSpacesExceptInPropertiesRegex,
      ""
    );
    this.pseudo.push(pseudoCss);
  }

  /**
   * parseCSS takes in raw CSS and parses it to valid CSS using Stylis.
   * It's useful for handling complex CSS such as media queries and pseudo selectors.
   */
  parseCSS(style: string): string {
    const id = "kuma-" + generateHash(style);
    const css = serialize(compile(`.${id}{${style}}`), stringify);
    this.css.push(css);
    return id;
  }

  removeDuplicates() {
    const hashMap = new Map<string, string>();
    for (const rule of this.rules) {
      if (hashMap.has(rule.id)) continue;
      else hashMap.set(rule.id, rule.css);
    }
    this.rules = Array.from(hashMap, (entry) => ({
      id: entry[0],
      css: entry[1],
    }));
    this.responsive = [...new Set(this.responsive)];
    this.pseudo = [...new Set(this.pseudo)];
    this.css = [...new Set(this.css)];
  }

  getCSS(): string {
    this.removeDuplicates();
    return (
      this.rules
        .map((rule) => `.${rule.id} {${rule.css}}`)
        .join("\n")
        .replace(cssPropertyRegex, "") +
      this.responsive.join("") +
      this.pseudo.join("") +
      this.css.join("")
    );
  }

  reset() {
    this.rules = [];
    this.responsive = [];
    this.pseudo = [];
    this.css = [];
  }
}

/**
 * The Sheet singleton class is responsible for managing the CSS rules, responsive
 * styles, and pseudo-classes used by Kuma-UI. It provides methods to add and retrieve
 * rules, and generates the final CSS output.
 */
export const sheet = Sheet.getInstance();
