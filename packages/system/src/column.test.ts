import { describe, test, expect } from "vitest";
import { column, ColumnProps } from "./column";

describe("outline utility function", () => {
  const testCases: Array<[ColumnProps, string, string]> = [
    [{ columnCount: 1 }, "column-count: 1;", ""],
    [{ columnCount: "auto" }, "column-count: auto;", ""],
    [{ columnFill: "auto" }, "column-fill: auto;", ""],
    [{ columnGap: 1 }, "column-gap: 1px;", ""],
    [{ columnGap: "3%" }, "column-gap: 3%;", ""],
    [{ columnRule: "1px solid red" }, "column-rule: 1px solid red;", ""],
    [{ columnRuleColor: "red" }, "column-rule-color: red;", ""],
    [{ columnRuleStyle: "dotted" }, "column-rule-style: dotted;", ""],
    [{ columnRuleWidth: 1 }, "column-rule-width: 1px;", ""],
    [{ columnRuleWidth: "thin" }, "column-rule-width: thin;", ""],
    [{ columnSpan: "all" }, "column-span: all;", ""],
    [{ columnWidth: 1 }, "column-width: 1px;", ""],
    [{ columnWidth: "auto" }, "column-width: auto;", ""],
    [{ columns: 2 }, "columns: 2;", ""],
    [{ columns: "auto 2" }, "columns: auto 2;", ""],
    [{ columnWidth: 0 }, "column-width: 0px;", ""],
  ];

  test.each(testCases)(
    "should return the correct CSS styles for the given ColumnProps",
    (props, expectedStyles, expectedMediaStyle) => {
      const styles = column(props);
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
