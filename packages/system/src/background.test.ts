import { background, BackgroundProps } from "./background";
import { describe, expect, test } from "vitest";

describe("background utility function", () => {
  const testCases: Array<[BackgroundProps, string, string]> = [
    [
      { backgroundImage: "url('img_tree.png')" },
      "background-image: url('img_tree.png');",
      "",
    ],
    [
      { bgImage: "url('img_tree.png')" },
      "background-image: url('img_tree.png');",
      "",
    ],
    [{ backgroundSize: "cover" }, "background-size: cover;", ""],
    [{ bgSize: "cover" }, "background-size: cover;", ""],
    [{ bgSize: 10 }, "background-size: 10px;", ""],
    [{ backgroundPosition: "center" }, "background-position: center;", ""],
    [{ bgPosition: "center" }, "background-position: center;", ""],
    [{ backgroundPositionX: 10 }, "background-position-x: 10px;", ""],
    [{ bgPositionX: 10 }, "background-position-x: 10px;", ""],
    [{ backgroundPositionY: "25%" }, "background-position-y: 25%;", ""],
    [{ bgPositionY: "25%" }, "background-position-y: 25%;", ""],
    [{ backgroundRepeat: "no-repeat" }, "background-repeat: no-repeat;", ""],
    [{ bgRepeat: "no-repeat" }, "background-repeat: no-repeat;", ""],
    [{ backgroundAttachment: "fixed" }, "background-attachment: fixed;", ""],
    [{ bgAttachment: "fixed" }, "background-attachment: fixed;", ""],
    [{ backgroundClip: "border-box" }, "background-clip: border-box;", ""],
    [{ bgClip: "border-box" }, "background-clip: border-box;", ""],
    [
      { backgroundOrigin: "content-box" },
      "background-origin: content-box;",
      "",
    ],
    [{ bgOrigin: "content-box" }, "background-origin: content-box;", ""],
  ];

  test.each(testCases)(
    "should return the correct CSS styles for the given BackgroundProps",
    (props, expectedStyles, expectedMediaStyle) => {
      const styles = background(props);
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
