// animation.test.ts
import { effect, EffectProps } from "./effect";
import { describe, expect, test, beforeEach } from "@jest/globals";

describe("effects utility function", () => {
  // Arrange
  const testCases: Array<[EffectProps, string, string]> = [
    [{ transition: "0.5s ease" }, "transition: 0.5s ease;", ""],
    [{ transform: "scale(1.2)" }, "transform: scale(1.2);", ""],
  ];

  test.each(testCases)(
    "should return the correct CSS styles for the given EffectsProps",
    (props, expectedStyles, expectedMediaStyle) => {
      // Act
      const styles = effect(props);
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
});
