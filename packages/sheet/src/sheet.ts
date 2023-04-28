import { generateHash } from "./hash";
// import { ResponsiveStyle } from "../system"; //　モノレポ化により後ほど対応

type ResponsiveStyle = {
  base: string;
  media: { [breakpoint: string]: string };
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
    css = css.replace(/\s/g, "");
    const id = "zero" + generateHash(css);
    const existingRule = this.rules.find((rule) => rule.id === id);
    if (!existingRule) this.rules.push({ id, css });
    return id;
  }

  addMediaRule(className: string, css: string, breakpoint: string): void {
    const mediaCss =
      `@media (min-width: ${breakpoint}) { .${className} { ${css} } }`.replace(
        /\s/g,
        ""
      );
    this.responsive.push(mediaCss);
  }

  addPseudoRule(className: string, css: string, pseudo: string): void {
    const pseudoCss = `.${className}${pseudo} { ${css} }`.replace(/\s/g, "");
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
        .replace(/\s/g, "") +
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

// Export a single instance of the Sheet class
export const sheet = Sheet.getInstance();
