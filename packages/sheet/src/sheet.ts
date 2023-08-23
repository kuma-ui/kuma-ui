import { theme } from ".";
import { generateHash } from "./hash";
import { cssPropertyRegex, removeSpacesExceptInPropertiesRegex } from "./regex";
import { compile, serialize, stringify, Element } from "stylis";

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
    const isProduction = process.env.NODE_ENV === "production";
    if (isProduction) return "kuma-";
    return isDynamic ? "🦄-" : "🐻-";
  }

  addRule(style: SystemStyle, isDynamic = false) {
    const className =
      Sheet.getClassNamePrefix(isDynamic) + generateHash(JSON.stringify(style));
    this._addBaseRule(className, style.base);
    for (const [breakpoint, css] of Object.entries(style.responsive)) {
      this._addMediaRule(className, css, breakpoint);
    }
    for (const [_, pseudo] of Object.entries(style.pseudo)) {
      this._addPseudoRule(className, pseudo);
    }
    return className;
  }

  private _addBaseRule(className: string, css: string) {
    css = css.replace(cssPropertyRegex, "$1$2");
    this.base.push(`.${className}{${css}}`);
  }

  private _addMediaRule(
    className: string,
    css: string,
    breakpoint: string
  ): void {
    css = css.replace(cssPropertyRegex, "$1$2");
    const mediaCss =
      `@media (min-width: ${breakpoint}) { .${className} { ${css} } }`.replace(
        removeSpacesExceptInPropertiesRegex,
        "$1$2$3"
      );
    this.responsive.push(mediaCss);
  }

  private _addPseudoRule(
    className: string,
    pseudo: SystemStyle["pseudo"][number]
  ) {
    const css = pseudo.base.replace(cssPropertyRegex, "$1$2");
    const pseudoCss = `.${className}${pseudo.key} { ${css} }`.replace(
      removeSpacesExceptInPropertiesRegex,
      "$1$2$3"
    );
    this.pseudo.push(pseudoCss);
    for (const [breakpoint, _css] of Object.entries(pseudo.responsive)) {
      this._addMediaRule(`${className}${pseudo.key}`, _css, breakpoint);
    }
  }

  /**
   * parseCSS takes in raw CSS and parses it to valid CSS using Stylis.
   * It's useful for handling complex CSS such as media queries and pseudo selectors.
   */
  parseCSS(style: string): string {
    const id = Sheet.getClassNamePrefix() + generateHash(style);

    const elements: Element[] = [];

    compile(`.${id}{${style}}`).forEach((element) => {
      const { breakpoints } = theme.getUserTheme();
      if (element.type === "@media") {
        const props = Array.isArray(element.props)
          ? element.props
          : [element.props];
        const newProps: string[] = [];
        let newValue = element.value;
        for (const key in breakpoints) {
          newValue = newValue.replaceAll(key, breakpoints[key]);
        }
        props.forEach((prop) => {
          for (const key in breakpoints) {
            newProps.push(prop.replaceAll(key, breakpoints[key]));
            break;
          }
        });
        element.props = newProps;
        element.value = newValue;
      }
      elements.push(element);
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
