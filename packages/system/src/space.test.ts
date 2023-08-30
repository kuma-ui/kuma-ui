import { space, SpaceProps } from "./space";
import { describe, expect, test } from "vitest";

describe("space utility function", () => {
  // Arrange
  const testCases: Array<[SpaceProps, string, string]> = [
    [{ margin: 8 }, "margin: 8px;", ""],
    [{ m: 8 }, "margin: 8px;", ""],
    [{ marginTop: "8px" }, "margin-top: 8px;", ""],
    [{ mt: "8px" }, "margin-top: 8px;", ""],
    [{ mx: 8 }, "margin-left: 8px; margin-right: 8px;", ""],
    [
      { mx: [4, 8] },
      "margin-left: 4px; margin-right: 4px;",
      "@media (min-width: 576px) { margin-left: 8px; margin-right: 8px; }",
    ],
    [{ m: 0 }, "margin: 0px;", ""],
    [{ margin: "1rem" }, "margin: 1rem;", ""],
  ];

  test.each(testCases)(
    "should return the correct CSS styles for the given SpaceProps",
    (props, expectedBaseStyles, expectedMediaStyles) => {
      // Act
      const { base, media } = space(props);
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

  test("should only generate styles for valid SpaceKeys", () => {
    // Arrange
    const invalidProps = {
      invalid: 8,
      invalid2: "8px",
    };

    // Act
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any -- FIXME
    const { base, media } = space(invalidProps as any);
    expect(base).toBe("");
    expect(media).toEqual({});
  });
});
