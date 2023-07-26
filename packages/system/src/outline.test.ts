import { outline, OutlineProps } from "./outline";
import { describe, expect, test } from "vitest";

describe("outline utility function", () => {
  const testCases: Array<[OutlineProps, string, string]> = [
    [{ outline: "1px solid red" }, "outline: 1px solid red;", ""],
    [{ outlineOffset: 1 }, "outline-offset: 1px;", ""],
    [{ outlineStyle: "dotted" }, "outline-style: dotted;", ""],
    [{ outlineWidth: 1 }, "outline-width: 1px;", ""],
    [{ outlineWidth: "thin" }, "outline-width: thin;", ""],
    [{ outlineWidth: 0 }, "outline-width: 0px;", ""],
  ];

  test.each(testCases)(
    "should return the correct CSS styles for the given OutlineProps",
    (props, expectedStyles, expectedMediaStyle) => {
      const styles = outline(props);
      const mediaString = Object.entries(styles.media)
        .map(
          ([breakpoint, css]) => `@media (min-width: ${breakpoint}) {${css}}`
        )
        .join("");

      expect(styles.base.replace(/\s/g, "")).toBe(
        expectedStyles.replace(/\s/g, "")
      );
      expect(mediaString.replace(/\s/g, "")).toBe(expectedMediaStyle);
    }
  );
});
