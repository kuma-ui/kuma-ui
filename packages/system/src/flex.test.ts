import { flex, FlexProps } from "./flex";
import { describe, expect, test } from "vitest";

describe("flex utility function", () => {
  // Arrange
  const testCases: Array<[FlexProps, string, string]> = [
    [{ flexDir: "column" }, "flex-direction: column;", ""],
    [{ justify: "center" }, "justify-content: center;", ""],
  ];

  test.each(testCases)(
    "should return the correct CSS styles for the given FlexProps",
    (props, expectedStyles, expectedMediaStyle) => {
      // Act
      const styles = flex(props);
      const mediaString = Object.entries(styles.media)
        .map(
          ([breakpoint, css]) => `@media (min-width: ${breakpoint}) {${css}}`
        )
        .join("");
      // Asert
      expect(styles.base.replace(/\s/g, "")).toBe(
        expectedStyles.replace(/\s/g, "")
      );
      expect(mediaString.replace(/\s/g, "")).toBe(expectedMediaStyle);
    }
  );

  test("should only generate styles for valid FlexKeys", () => {
    // Arrange
    const invalidProps = {
      invalid: 8,
      invalid2: "8px",
    };

    // Act
    const style = flex(invalidProps as any);
    expect(style.base.replace(/\s/g, "")).toBe("".replace(/\s/g, ""));
  });
});
