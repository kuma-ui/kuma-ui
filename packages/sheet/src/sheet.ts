import { generateHash } from "./hash";
import { cssPropertyRegex, removeSpacesExceptInPropertiesRegex } from "./regex";

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
  private cache: Map<string, ResponsiveStyle>;

  private constructor() {
    this.rules = [];
    this.responsive = [];
    this.pseudo = [];
    this.cache = new Map();
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
  }

  getCSS(): string {
    this.removeDuplicates();
    return (
      this.rules
        .map((rule) => `.${rule.id} {${rule.css}}`)
        .join("\n")
        .replace(cssPropertyRegex, "") +
      this.responsive.join("") +
      this.pseudo.join("")
    );
  }

  getFromCache(key: string): ResponsiveStyle | undefined {
    return this.cache.get(key);
  }

  addToCache(key: string, styles: ResponsiveStyle): void {
    this.cache.set(key, styles);
  }

  reset() {
    this.rules = [];
    this.responsive = [];
    this.pseudo = [];
  }
}

/**
 * The Sheet singleton class is responsible for managing the CSS rules, responsive
 * styles, and pseudo-classes used by Kuma-UI. It provides methods to add and retrieve
 * rules, and generates the final CSS output.
 *
 * Note that with the introduction of the StyleMap class, Sheet is no longer
 * responsible for handling the accumulation of unnecessary CSS during HMR.
 * Instead, it focuses on converting the given styles into appropriate CSS and
 * managing the cache for the compose function.
 */
export const sheet = Sheet.getInstance();
