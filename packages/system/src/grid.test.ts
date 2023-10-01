import { grid, GridProps } from "./grid";
import { describe, expect, test } from "vitest";

describe("grid utility function", () => {
  // Arrange
  const testCases: Array<[GridProps, string, string]> = [
    [{ gridGap: 8 }, "grid-gap: 8px;", ""],
    [{ gridColumn: "2 / 3" }, "grid-column: 2 / 3;", ""],
    [{ gridTemplateRows: "auto 1fr" }, "grid-template-rows: auto 1fr;", ""],
    [
      { gridGap: [8, 16] },
      "grid-gap: 8px;",
      "@media (min-width: 576px) { grid-gap: 16px; }",
    ],
    [{ gridColumnStart: 0 }, "grid-column-start: 0;", ""],
  ];

  test.each(testCases)(
    "should return the correct CSS styles for the given GridProps",
    (props, expectedBaseStyles, expectedMediaStyles) => {
      // Act
      const { base, media } = grid(props);
      const mediaString = Object.entries(media)
        .map(
          ([breakpoint, css]) => `@media (min-width: ${breakpoint}) {${css}}`,
        )
        .join("");

      // Assert
      expect(base.replace(/\s/g, "")).toBe(
        expectedBaseStyles.replace(/\s/g, ""),
      );
      expect(mediaString.replace(/\s/g, "")).toBe(
        expectedMediaStyles.replace(/\s/g, ""),
      );
    },
  );

  test("should only generate styles for valid GridKeys", () => {
    // Arrange
    const invalidProps = {
      invalid: 8,
      invalid2: "8px",
    };

    // Act
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any -- FIXME
    const { base, media } = grid(invalidProps as any);
    expect(base).toBe("");
    expect(media).toEqual({});
  });
});
