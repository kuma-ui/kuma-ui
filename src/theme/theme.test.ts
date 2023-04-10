import { Theme, theme, defaultBreakpoints } from ".";
import { describe, expect, test, beforeEach } from "@jest/globals";

describe("Theme", () => {
  beforeEach(() => {
    theme.reset();
  });

  test("should only allow a single instance of the Theme class", () => {
    // Act & Assert
    expect(() => {
      new Theme(); // This should throw an error
    }).toThrowError("You can only create one instance!");
  });

  test("should allow setting and getting breakpoints", () => {
    // Arrange
    const breakpoints = {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    };

    // Act
    theme.setBreakpoints(breakpoints);

    // Assert
    expect(theme.getBreakpoints()).toEqual(breakpoints);
  });

  test("should return default breakpoints when none are set", () => {
    // Act & Assert
    expect(theme.getBreakpoints()).toEqual(defaultBreakpoints);
  });
});
