import { applyResponsiveStyles } from "./responsive";
import { describe, expect, test, beforeEach } from "@jest/globals";

describe("applyResponsiveStyles", () => {
  test("returns a single CSS rule when given a single value", () => {
    // Arrange
    const cssProperty = "margin-top";
    const cssValue = "10px";
    const expected = "margin-top: 10px; ";

    // Act
    const result = applyResponsiveStyles(cssProperty, cssValue);

    // Assert
    expect(result).toBe(expected);
  });

  test("returns a base CSS rule and media queries when given an array of values", () => {
    // Arrange
    const cssProperty = "margin-top";
    const cssValues = ["10px", "20px", "30px"];

    // Act
    const result = applyResponsiveStyles(cssProperty, cssValues);

    // Assert
    expect(result).toContain("@media");
  });
});
