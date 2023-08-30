import { LayoutProps } from ".";
import { grid } from "./grid";
import { describe, expect, test } from "vitest";
import { layout } from "./layout";

describe("layout utility function", () => {
  // Arrange
  const testCases: Array<[LayoutProps, string, string]> = [
    [{ width: 8 }, "width: 8px;", ""],
    [{ minWidth: "12px" }, "min-width: 12px;", ""],
    [{ height: "2em" }, "height: 2em;", ""],
    [{ maxHeight: "1rem" }, "max-height: 1rem;", ""],
    [{ display: "flex" }, "display: flex;", ""],
    [{ display: "sm" }, "display: sm;", ""], // size token won't be applied
    [{ zIndex: 1 }, "z-index: 1;", ""],
    [{ zIndex: "5" }, "z-index: 5;", ""],
  ];

  test.each(testCases)(
    "should return the correct CSS styles for the given LayoutProps",
    (props, expectedBaseStyles, expectedMediaStyles) => {
      // Act
      const { base, media } = layout(props);
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

  test("should only generate styles for valid LayoutKeys", () => {
    // Arrange
    const invalidProps = {
      invalid: 8,
      invalid2: "8px",
    };

    // Act
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any -- FIXME
    const { base, media } = grid(invalidProps as any);

    // Assert
    expect(base).toBe("");
    expect(media).toEqual({});
  });
});
