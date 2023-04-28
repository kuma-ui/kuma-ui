import { Sheet, sheet } from "./sheet";
import { describe, expect, test, beforeEach } from "@jest/globals";

describe("Sheet class", () => {
  beforeEach(() => {
    sheet.reset();
  });

  test("addRule() should add a new rule with a generated ID", () => {
    // Arrange
    const css = "color: red;";
    // Act
    const id = sheet.addRule(css);
    // Assert
    expect(id.startsWith("zero")).toBeTruthy();
  });

  test("addRule() should not add duplicate rules", () => {
    // Arrange
    const css = "color: red;";
    // Act
    const id1 = sheet.addRule(css);
    const id2 = sheet.addRule(css);
    // Assert
    expect(id1).toBe(id2);
  });

  test("addMediaRule() should add a new media rule with a generated ID", () => {
    // Arrange
    const className = "zero12345";
    const css = "padding: 8px;";
    const breakpoint = "576px";
    const mediaCss = `@media (min-width: ${breakpoint}) { .${className} { ${css} } }`;
    // Act
    sheet.addMediaRule(className, css, breakpoint);
    // Assert
    expect(sheet.getCSS()).toContain(mediaCss.replace(/\s/g, ""));
  });

  test("addPseudoRule() should add a new pseudo rule with a generated ID", () => {
    // Arrange
    const className = "zero12345";
    const css = "padding: 8px;";
    const pseudo = ":hover";
    const pseudoCss = `.${className}${pseudo} { ${css} }`.replace(/\s/g, "");
    // Act
    sheet.addPseudoRule(className, css, pseudo);
    // Assert
    expect(sheet.getCSS()).toContain(pseudoCss);
  });

  test("getCSS() should return the CSS string with unique rules", () => {
    // Arrange
    const css = "color: red;";
    const id = sheet.addRule(css);
    // Act
    const cssString = sheet.getCSS();
    // Assert
    expect(cssString).toContain(`.${id} {${css}}`.replace(/\s/g, ""));
  });

  test("getFromCache() should return undefined if no value is cached for the given key", () => {
    // Arrange
    const cacheKey = JSON.stringify({ color: "red" });
    // Act
    const cachedValue = sheet.getFromCache(cacheKey);
    // Assert
    expect(cachedValue).toBeUndefined();
  });

  test("addToCache() and getFromCache() should work correctly", () => {
    // Arrange
    const cacheKey = JSON.stringify({ color: "red" });
    const styles = { base: "color: red;", media: {} };
    // Act
    sheet.addToCache(cacheKey, styles);
    const cachedValue = sheet.getFromCache(cacheKey);
    // Assert
    expect(cachedValue).toEqual(styles);
  });
});
