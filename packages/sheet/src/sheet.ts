import { theme } from ".";
import { generateHash } from "./hash";
import {
  removeSpacesAroundCssPropertyValues,
  removeSpacesExceptInProperties,
} from "./regex";
import { compile, serialize, stringify, Element } from "stylis";
import { applyT } from "./placeholders";

// to avoid cyclic dependency, we declare an exact same type declared in @kuma-ui/system
type ResponsiveStyle = {
  base: string;
  media: {
    [breakpoint: string]: string;
  };
};

type SystemStyle = {
  base: ResponsiveStyle["base"];
  responsive: ResponsiveStyle["media"];
  pseudo: {
    key: string;
    base: ResponsiveStyle["base"];
    responsive: ResponsiveStyle["media"];
  }[];
};

export { SystemStyle };

export class Sheet {
  private static instance: Sheet;
  private base: string[];
  private responsive: string[];
  private pseudo: string[];

  private css: string[];

  private constructor() {
    this.base = [];
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

  private static getClassNamePrefix(isDynamic = false) {
    if (process.env.NODE_ENV === "production") {
      const userPrefix = process.env.KUMA_CLASS_NAME_PREFIX;
      return userPrefix ? `${userPrefix}-` : "kuma-";
    }

    return isDynamic ? "🦄-" : "🐻-";
  }

  addRule(style: SystemStyle, isDynamic = false) {
    const className =
      Sheet.getClassNamePrefix(isDynamic) + generateHash(JSON.stringify(style));
    this._addBaseRule(className, this._processCSS(style.base));
    for (const [breakpoint, css] of Object.entries(style.responsive)) {
      this._addMediaRule(
        className,
        this._processCSS(css),
        this._processCSS(breakpoint),
      );
    }
    for (const [_, pseudo] of Object.entries(style.pseudo)) {
      this._addPseudoRule(className, pseudo);
    }
    return className;
  }

  private _addBaseRule(className: string, css: string) {
    const minifiedCss = removeSpacesAroundCssPropertyValues(css);
    this.base.push(`.${className}{${minifiedCss}}`);
  }

  private _addMediaRule(
    className: string,
    css: string,
    breakpoint: string,
  ): void {
    const minifiedCss = removeSpacesAroundCssPropertyValues(css);
    const mediaCss = removeSpacesExceptInProperties(
      `@media (min-width: ${breakpoint}) { .${className} { ${minifiedCss} } }`,
    );
    this.responsive.push(mediaCss);
  }

  private _addPseudoRule(
    className: string,
    pseudo: SystemStyle["pseudo"][number],
  ) {
    const css = removeSpacesAroundCssPropertyValues(
      this._processCSS(pseudo.base),
    );
    const pseudoCss = removeSpacesExceptInProperties(
      `.${className}${pseudo.key} { ${css} }`,
    );
    this.pseudo.push(pseudoCss);
    for (const [breakpoint, _css] of Object.entries(pseudo.responsive)) {
      this._addMediaRule(
        `${className}${pseudo.key}`,
        this._processCSS(_css),
        this._processCSS(breakpoint),
      );
    }
  }

  _processCSS(css: string): string {
    const placeholders = theme.getPlaceholders();

    return applyT(css, placeholders);
  }

  /**
   * parseCSS takes in raw CSS and parses it to valid CSS using Stylis.
   * It's useful for handling complex CSS such as media queries and pseudo selectors.
   */
  parseCSS(style: string): string {
    style = this._processCSS(style);

    const id = Sheet.getClassNamePrefix() + generateHash(style);

    const elements: Element[] = [];

    compile(`.${id}{${style}}`).forEach((element) => {
      const { breakpoints } = theme.getUserTheme();
      this.normalizeMediaQueries(element, breakpoints ?? {});

      if (this.applyGlobalSelectorNormalization(element, id)) {
        elements.push(element);
      }
    });

    const css = serialize(elements, stringify);

    this.css.push(css);
    return id;
  }

  removeDuplicates() {
    this.base = [...new Set(this.base)];
    this.responsive = [...new Set(this.responsive)];
    this.pseudo = [...new Set(this.pseudo)];
    this.css = [...new Set(this.css)];
  }

  private static escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  private static toArray(props: Element["props"]): string[] {
    if (Array.isArray(props)) {
      return props;
    }

    if (typeof props === "string") {
      return [props];
    }

    return [];
  }

  private static replaceBreakpoints(
    value: string,
    breakpoints: Record<string, string>,
  ): string {
    let next = value;

    for (const key in breakpoints) {
      next = next.replaceAll(key, breakpoints[key]);
    }

    return next;
  }

  private normalizeMediaQueries(
    element: Element,
    breakpoints: Record<string, string>,
  ): void {
    if (Array.isArray(element.children)) {
      element.children.forEach((child) =>
        this.normalizeMediaQueries(child, breakpoints),
      );
    }

    if (element.type !== "@media") {
      return;
    }

    const props = Sheet.toArray(element.props).map((prop) =>
      Sheet.replaceBreakpoints(prop, breakpoints),
    );

    element.props = props;

    if (typeof element.value === "string") {
      element.value = Sheet.replaceBreakpoints(element.value, breakpoints);
    }
  }

  private applyGlobalSelectorNormalization(
    element: Element,
    className: string,
  ): boolean {
    if (Array.isArray(element.children)) {
      const children = element.children;

      for (let index = 0; index < children.length; ) {
        if (this.applyGlobalSelectorNormalization(children[index], className)) {
          index += 1;
        } else {
          children.splice(index, 1);
        }
      }

      element.length = children.length;
    }

    if (element.type !== "rule") {
      return true;
    }

    const { selectors, touched } = this.normalizeSelectorList(
      element.props,
      className,
    );

    if (!touched) {
      return true;
    }

    if (selectors.length === 0) {
      return false;
    }

    element.props = selectors;

    if (typeof element.value === "string") {
      element.value = Sheet.stripGlobalTokens(element.value, selectors[0]);
    }

    return true;
  }

  private normalizeSelectorList(
    props: Element["props"],
    className: string,
  ): { selectors: string[]; touched: boolean } {
    const raw = Sheet.toArray(props);

    const selectors: string[] = [];
    let touched = false;

    const classNamePattern = new RegExp(
      `^\\.${Sheet.escapeRegExp(className)}\\s*`,
    );

    raw.forEach((entry) => {
      entry
        .split(",")
        .map((selector) => selector.trim())
        .filter(Boolean)
        .forEach((selector) => {
          if (!selector.includes(":global")) {
            selectors.push(selector);
            return;
          }

          touched = true;

          const cleaned = Sheet.stripGlobalTokens(
            selector.replace(classNamePattern, ""),
          );

          if (cleaned) {
            selectors.push(cleaned);
          }
        });
    });

    return { selectors, touched };
  }

  private static stripGlobalTokens(value: string, fallback?: string): string {
    const cleaned = value
      .replace(/:global\(([^)]+)\)/g, "$1")
      .replace(/:global\b/g, "")
      .trim();

    if (cleaned) {
      return cleaned;
    }

    return fallback ?? value;
  }

  getCSS(): string {
    this.removeDuplicates();
    return (
      this.base.join("") +
      this.responsive.join("") +
      this.pseudo.join("") +
      this.css.join("")
    );
  }

  reset() {
    this.base = [];
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
