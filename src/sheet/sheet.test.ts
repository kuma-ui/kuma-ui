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

  test("getCSS() should return the CSS string with unique rules", () => {
    // Arrange
    const css = "color: red;";
    const id = sheet.addRule(css);
    // Act
    const cssString = sheet.getCSS();
    // Assert
    expect(cssString).toContain(`.${id} {${css}}`);
  });
});
