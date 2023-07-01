import { text, TextProps } from "./text";
import { describe, expect, test } from "vitest";

describe("text utility function", () => {
  // Arrange
  const testCases: Array<[TextProps, string, string]> = [
    [{ textAlign: "center" }, "text-align: center;", ""],
    [{ textDecoration: "underline" }, "text-decoration: underline;", ""],
    [{ textIndent: 50 }, "text-indent: 50px;", ""],
    [
      { textIndent: [50, 100] },
      "text-indent: 50px;",
      "@media (min-width: 576px) { text-indent: 100px; }",
    ],
  ];

  test.each(testCases)(
    "should return the correct CSS styles for the given TextProps",
    (props, expectedBaseStyles, expectedMediaStyles) => {
      // Act
      const { base, media } = text(props);
      const mediaString = Object.entries(media)
        .map(
          ([breakpoint, css]) => `@media (min-width: ${breakpoint}) {${css}}`
        )
        .join("");

      // Assert
      expect(base.replace(/\s/g, "")).toBe(
        expectedBaseStyles.replace(/\s/g, "")
      );
      expect(mediaString.replace(/\s/g, "")).toBe(
        expectedMediaStyles.replace(/\s/g, "")
      );
    }
  );

  test("should only generate styles for valid TextKeys", () => {
    // Arrange
    const invalidProps = {
      invalid: "center",
      invalid2: "underline",
    };

    // Act
    const { base, media } = text(invalidProps as any);
    expect(base).toBe("");
    expect(media).toEqual({});
  });
});
