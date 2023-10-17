// animation.test.ts
import { effect, EffectProps } from "./effect";
import { describe, expect, test } from "vitest";

describe("effects utility function", () => {
  // Arrange
  const testCases: Array<[EffectProps, string, string]> = [
    [{ transition: "0.5s ease" }, "transition: 0.5s ease;", ""],
    [{ transitionDuration: "0.5s" }, "transition-duration: 0.5s;", ""],
    [{ transitionProperty: "all" }, "transition-property: all;", ""],
    [
      { transitionTimingFunction: "ease-in-out" },
      "transition-timing-function: ease-in-out;",
      "",
    ],
    [{ transform: "scale(1.2)" }, "transform: scale(1.2);", ""],
    [{ transformBox: "border-box" }, "transform-box: border-box;", ""],
    [{ transformOrigin: "center" }, "transform-origin: center;", ""],
    [{ transformStyle: "preserve-3d" }, "transform-style: preserve-3d;", ""],
    [
      { clipPath: "ellipse(130px 140px at 10% 20%)" },
      "clip-path: ellipse(130px 140px at 10% 20%);",
      "",
    ],
  ];

  test.each(testCases)(
    "should return the correct CSS styles for the given EffectsProps",
    (props, expectedStyles, expectedMediaStyle) => {
      // Act
      const styles = effect(props);
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
});
