import { theme, defaultBreakpoints } from "./theme";
import { describe, expect, test, beforeEach } from "vitest";

describe("Theme", () => {
  beforeEach(() => {
    theme.reset();
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
