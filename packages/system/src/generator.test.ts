import { StyleGenerator } from "./generator";
import { theme } from "@kuma-ui/sheet";
import { describe, expect, test, afterEach } from "vitest";

describe("StyleGenerator class", () => {
  afterEach(() => theme.reset());
  test("should correctly generate className and CSS from given styledProps", () => {
    // Arrange
    const props = {
      fontSize: 24,
      color: ["red", "blue"],
      _hover: { color: "black" },
    };

    // Act
    const { className, css } = new StyleGenerator(props).getStyle();

    // Assert
    expect(className.startsWith("🐻-")).toBeTruthy();
    expect(css.replace(/\s/g, "")).toContain(
      `.${className} { font-size: 24px;color: red; }@media (min-width: 576px) { .${className} { color: blue; } }.${className}:hover { color: black; }`.replace(
        /\s/g,
        "",
      ),
    );
    expect(css).toContain(`.${className}:hover { color: black; }`);
  });

  test("should generate unique className for different styledProps", () => {
    // Arrange
    const props1 = { fontSize: 24, color: "red" };
    const props2 = { fontSize: 24, color: "blue" };

    // Act
    const generator1 = new StyleGenerator(props1);
    const generator2 = new StyleGenerator(props2);

    const className1 = generator1.getClassName();
    const className2 = generator2.getClassName();

    // Assert
    expect(className1).not.toBe(className2);
  });

  test("should generate same className for identical styledProps", () => {
    // Arrange
    const props1 = { fontSize: 24, color: "red" };
    const props2 = { fontSize: 24, color: "red" };

    // Act
    const generator1 = new StyleGenerator(props1);
    const generator2 = new StyleGenerator(props2);

    const className1 = generator1.getClassName();
    const className2 = generator2.getClassName();

    // Assert
    expect(className1).toBe(className2);
  });

  test("should return an empty string for the classname and css if props are empty", () => {
    const props = {};
    const { className, css } = new StyleGenerator(props).getStyle();

    expect(className).toBe("");
    expect(css).toBe("");
  });

  test("should correctly generate className and CSS from given styledProps with theme", () => {
    // Arrange
    theme.setUserTheme({
      colors: {
        "colors.primary": "red",
      },
    });
    const props = {
      color: "colors.primary",
      _hover: { color: "colors.primary", fontSize: 24 },
    };

    // Act
    const { className, css } = new StyleGenerator(props).getStyle();

    // Assert
    expect(className.startsWith("🐻-")).toBeTruthy();
    expect(css.replace(/\s/g, "")).toContain(
      `.${className} { color: red; } .${className}:hover { color: red;font-size: 24px; }`.replace(
        /\s/g,
        "",
      ),
    );
  });

  test("should interpolate theme tokens with breakpoints in styledProps", () => {
    // Arrange
    theme.setUserTheme({
      colors: {
        "colors.primary": "blue",
        "colors.secondary": "green",
      },
      breakpoints: {
        sm: "576px",
        md: "768px",
      },
    });

    const props = {
      color: ["colors.primary", "colors.secondary"],
      _hover: { color: ["colors.secondary", "colors.primary"] },
    };

    // Act
    const { className, css } = new StyleGenerator(props).getStyle();

    // Assert
    expect(css.replace(/\s/g, "")).toContain(
      `.${className} { color: blue; } @media (min-width: 576px) { .${className} { color: green; } } .${className}:hover { color: green; } @media (min-width: 576px) { .${className}:hover { color: blue; } }`.replace(
        /\s/g,
        "",
      ),
    );
  });
});
