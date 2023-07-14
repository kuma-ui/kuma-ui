import { theme, defaultBreakpoints } from "./theme";
import { describe, expect, test, beforeEach } from "vitest";

describe("Theme", () => {
  beforeEach(() => {
    theme.reset();
  });

  test("should allow setting and getting theme", () => {
    // Arrange
    const userTheme = {
      colors: {},
      breakpoints: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      components: {},
    };
    // Act
    theme.setUserTheme(userTheme);

    // Assert
    expect(theme.getUserTheme()).toEqual(userTheme);
  });
});
