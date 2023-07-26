import { flex, FlexProps } from "./flex";
import { describe, expect, test } from "vitest";

describe("flex utility function", () => {
  // Arrange
  const testCases: Array<[FlexProps, string, string]> = [
    [{ flexDir: "column" }, "flex-direction: column;", ""],
    [{ justify: "center" }, "justify-content: center;", ""],
    [{ alignContent: "center" }, "align-content: center;", ""],
    [{ alignItems: "center" }, "align-items: center;", ""],
    [{ alignSelf: "center" }, "align-self: center;", ""],
    [{ flex: 1 }, "flex: 1;", ""],
    [{ flex: "1 1 100px" }, "flex: 1 1 100px;", ""],
    [{ flexBasis: 1 }, "flex-basis: 1px;", ""],
    [{ flexBasis: "100px" }, "flex-basis: 100px;", ""],
    [{ flexFlow: "row wrap" }, "flex-flow: row wrap;", ""],
    [{ flexGrow: 1 }, "flex-grow: 1;", ""],
    [{ flexShrink: 1 }, "flex-shrink: 1;", ""],
    [{ flexWrap: "wrap" }, "flex-wrap: wrap;", ""],
    [{ justifyItems: "center" }, "justify-items: center;", ""],
    [{ justifySelf: "center" }, "justify-self: center;", ""],
    [{ gap: 1 }, "gap: 1px;", ""],
    [{ gap: "10px 20px" }, "gap: 10px 20px;", ""],
    [{ gap: 0 }, "gap: 0px;", ""],
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any -- FIXME
    const style = flex(invalidProps as any);
    expect(style.base.replace(/\s/g, "")).toBe("".replace(/\s/g, ""));
  });
});
