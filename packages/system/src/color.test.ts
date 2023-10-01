import { color, ColorProps } from "./color";
import { describe, expect, test } from "vitest";

describe("color utility function", () => {
  const testCases: Array<[ColorProps, string, string]> = [
    [{ background: "red" }, "background: red;", ""],
    [{ bg: "red" }, "background: red;", ""],
    [{ backgroundColor: "red" }, "background-color: red;", ""],
    [{ bgColor: "red" }, "background-color: red;", ""],
    [{ color: "red" }, "color: red;", ""],
    [{ borderColor: "red" }, "border-color: red;", ""],
    [{ outlineColor: "red" }, "outline-color: red;", ""],
    [{ accentColor: "red" }, "accent-color: red;", ""],
    [{ caretColor: "red" }, "caret-color: red;", ""],
    [{ opacity: 0.5 }, "opacity: 0.5;", ""],
    [{ opacity: 0 }, "opacity: 0;", ""],
  ];

  test.each(testCases)(
    "should return the correct CSS styles for the given ColorProps",
    (props, expectedStyles, expectedMediaStyle) => {
      const styles = color(props);
      const mediaString = Object.entries(styles.media)
        .map(
          ([breakpoint, css]) => `@media (min-width: ${breakpoint}) {${css}}`,
        )
        .join("");

      expect(styles.base.replace(/\s/g, "")).toBe(
        expectedStyles.replace(/\s/g, ""),
      );
      expect(mediaString.replace(/\s/g, "")).toBe(expectedMediaStyle);
    },
  );
});
