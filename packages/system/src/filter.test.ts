import { filter, FilterProps } from "./filter";
import { describe, test, expect } from "vitest";

describe("filter utility function", () => {
  const testCases: Array<[FilterProps, string, string]> = [
    [{ filter: "invert(100%)" }, "filter: invert(100%);", ""],
    [{ backdropFilter: "blur(2px)" }, "backdrop-filter: blur(2px);", ""],
  ];

  test.each(testCases)(
    "should return the correct CSS styles for the given FilterProps",
    (props, expectedStyles, expectedMediaStyle) => {
      // Act
      const styles = filter(props);
      const mediaString = Object.entries(styles.media)
        .map(
          ([breakpoint, css]) => `@media (min-width: ${breakpoint}) {${css}}`,
        )
        .join("");
      // Assert
      expect(styles.base.replace(/\s/g, "")).toBe(
        expectedStyles.replace(/\s/g, ""),
      );
      expect(mediaString.replace(/\s/g, "")).toBe(expectedMediaStyle);
    },
  );
});
