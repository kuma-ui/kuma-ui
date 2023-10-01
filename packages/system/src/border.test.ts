import { border, BorderProps } from "./border";
import { describe, expect, test } from "vitest";

describe("border utility function", () => {
  // Arrange
  const testCases: Array<[BorderProps, string, string]> = [
    [{ borderX: 1 }, "border-left: 1px; border-right: 1px;", ""],
    [{ borderY: 1 }, "border-top: 1px; border-bottom: 1px;", ""],
    [{ border: 1 }, "border: 1px;", ""],
    [{ border: "1px" }, "border: 1px;", ""],
    [{ border: "1px solid red" }, "border: 1px solid red;", ""],
    [{ borderTop: 1 }, "border-top: 1px;", ""],
    [{ borderLeft: 1 }, "border-left: 1px;", ""],
    [{ borderRight: 1 }, "border-right: 1px;", ""],
    [{ borderBottom: 1 }, "border-bottom: 1px;", ""],
    [{ borderRadius: 1 }, "border-radius: 1px;", ""],
    [{ borderTopLeftRadius: 1 }, "border-top-left-radius: 1px;", ""],
    [{ borderTopRightRadius: 1 }, "border-top-right-radius: 1px;", ""],
    [{ borderBottomLeftRadius: 1 }, "border-bottom-left-radius: 1px;", ""],
    [{ borderBottomRightRadius: 1 }, "border-bottom-right-radius: 1px;", ""],
    [{ borderStyle: "solid" }, "border-style: solid;", ""],
    [{ borderTopStyle: "solid" }, "border-top-style: solid;", ""],
    [{ borderRightStyle: "solid" }, "border-right-style: solid;", ""],
    [{ borderLeftStyle: "solid" }, "border-left-style: solid;", ""],
    [{ borderBottomStyle: "solid" }, "border-bottom-style: solid;", ""],
    [{ borderWidth: 1 }, "border-width: 1px;", ""],
    [{ borderWidth: 0 }, "border-width: 0px;", ""],
    [{ borderWidth: "20px" }, "border-width: 20px;", ""],
    [{ borderTopWidth: 1 }, "border-top-width: 1px;", ""],
    [{ borderRightWidth: 1 }, "border-right-width: 1px;", ""],
    [{ borderLeftWidth: 1 }, "border-left-width: 1px;", ""],
    [{ borderBottomWidth: 1 }, "border-bottom-width: 1px;", ""],
    [{ borderStartWidth: 1 }, "border-inline-start-width: 1px;", ""],
    [{ borderEndWidth: 1 }, "border-inline-end-width: 1px;", ""],
    [{ borderStartStyle: "dashed" }, "border-inline-start-style: dashed;", ""],
    [
      { borderEndStyle: "revert-layer" },
      "border-inline-end-style: revert-layer;",
      "",
    ],
    [{ borderStart: 1 }, "border-inline-start: 1px;", ""],
    [{ borderEnd: 1 }, "border-inline-end: 1px;", ""],
    [{ borderStart: "inherit" }, "border-inline-start: inherit;", ""],
    [
      { borderEnd: "medium dashed blue" },
      "border-inline-end: medium dashed blue;",
      "",
    ],
    [
      { borderStartRadius: 1 },
      "border-top-left-radius: 1px; border-bottom-left-radius: 1px;",
      "",
    ],
    [
      { borderEndRadius: 1 },
      "border-top-right-radius: 1px; border-bottom-right-radius: 1px;",
      "",
    ],
    [
      { borderStartRadius: "1px 2px" },
      "border-top-left-radius: 1px 2px; border-bottom-left-radius: 1px 2px;",
      "",
    ],
    [
      { borderEndRadius: "1px 2px" },
      "border-top-right-radius: 1px 2px; border-bottom-right-radius: 1px 2px;",
      "",
    ],
    [{ borderRadius: "1rem" }, "border-radius: 1rem;", ""],
  ];

  test.each(testCases)(
    "should return the correct CSS styles for the given BorderProps",
    (props, expectedStyles, expectedMediaStyle) => {
      // Act
      const styles = border(props);
      const mediaString = Object.entries(styles.media)
        .map(
          ([breakpoint, css]) => `@media (min-width: ${breakpoint}) {${css}}`,
        )
        .join("");
      // Asert
      expect(styles.base.replace(/\s/g, "")).toBe(
        expectedStyles.replace(/\s/g, ""),
      );
      expect(mediaString.replace(/\s/g, "")).toBe(expectedMediaStyle);
    },
  );

  test("should only generate styles for valid BorderKeys", () => {
    // Arrange
    const invalidProps = {
      invalid: 8,
      invalid2: "8px",
    };

    // Act
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any -- FIXME
    const style = border(invalidProps as any);
    expect(style.base.replace(/\s/g, "")).toBe("".replace(/\s/g, ""));
  });
});
