import { font, FontProps } from "./font";
import { describe, expect, test } from "vitest";

describe("font utility function", () => {
  // Arrange
  const testCases: Array<[FontProps, string, string]> = [
    [{ fontSize: 24 }, "font-size: 24px;", ""],
    [{ fontFamily: "Arial" }, "font-family: Arial;", ""],
    [{ fontWeight: 500 }, "font-weight: 500;", ""],
    [
      { fontSize: [24, 32] },
      "font-size: 24px;",
      "@media (min-width: 576px) { font-size: 32px; }",
    ],
    [{ fontSize: 0 }, "font-size: 0px;", ""],
  ];

  test.each(testCases)(
    "should return the correct CSS styles for the given FontProps",
    (props, expectedBaseStyles, expectedMediaStyles) => {
      // Act
      const { base, media } = font(props);
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

  test("should only generate styles for valid FontKeys", () => {
    // Arrange
    const invalidProps = {
      invalid: 24,
      invalid2: "Arial",
    };

    // Act
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any -- FIXME
    const { base, media } = font(invalidProps as any);
    expect(base).toBe("");
    expect(media).toEqual({});
  });
});
