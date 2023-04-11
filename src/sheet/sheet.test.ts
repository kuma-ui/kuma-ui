import { Sheet, sheet } from ".";
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
    const id = sheet.addMediaRule(className, css, breakpoint);
    // Assert
    expect(sheet.getCSS()).toContain(mediaCss.replace(/\s/g, ""));
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
});
