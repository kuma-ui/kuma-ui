import { background, BackgroundProps } from "./background";
import { describe, expect, test } from "vitest";

describe("background utility function", () => {
  const testCases: Array<[BackgroundProps, string, string]> = [
    [
      { bgImage: "url('img_tree.png')" },
      "background-image: url('img_tree.png');",
      "",
    ],
    [{ bgSize: "cover" }, "background-size: cover;", ""],
    [{ bgSize: 10 }, "background-size: 10px;", ""],
    [{ bgPosition: "center" }, "background-position: center;", ""],
    [{ bgPositionX: 10 }, "background-position-x: 10px;", ""],
    [{ bgPositionY: "25%" }, "background-position-y: 25%;", ""],
    [{ bgRepeat: "no-repeat" }, "background-repeat: no-repeat;", ""],
    [{ bgAttachment: "fixed" }, "background-attachment: fixed;", ""],
    [{ bgClip: "border-box" }, "background-clip: border-box;", ""],
    [{ bgOrigin: "content-box" }, "background-origin: content-box;", ""],
  ];

  test.each(testCases)(
    "should return the correct CSS styles for the given BackgroundProps",
    (props, expectedStyles, expectedMediaStyle) => {
      const styles = background(props);
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
