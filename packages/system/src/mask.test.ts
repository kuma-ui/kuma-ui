import { mask, MaskProps } from "./mask";
import { describe, expect, test } from "vitest";

describe("mask utility function", () => {
  const testCases: Array<[MaskProps, string, string]> = [
    [{ mask: "url(#c1) luminance" }, "mask: url(#c1) luminance;", ""],
    [
      { maskBorder: 'url("border-mask.png") 25' },
      'mask-border: url("border-mask.png") 25;',
      "",
    ],
    [{ maskBorderMode: "alpha" }, "mask-border-mode: alpha;", ""],
    [{ maskBorderOutset: 1.5 }, "mask-border-outset: 1.5;", ""],
    [
      { maskBorderOutset: "7px 12px 14px 5px" },
      "mask-border-outset: 7px 12px 14px 5px;",
      "",
    ],
    [
      { maskBorderRepeat: "stretch round" },
      "mask-border-repeat: stretch round;",
      "",
    ],
    [{ maskBorderSlice: 10 }, "mask-border-slice: 10;", ""],
    [
      { maskBorderSlice: "10% 20% 30% 40%" },
      "mask-border-slice: 10% 20% 30% 40%;",
      "",
    ],
    [
      { maskBorderSource: 'url("border-mask.png")' },
      'mask-border-source: url("border-mask.png");',
      "",
    ],
    [{ maskBorderWidth: 10 }, "mask-border-width: 10;", ""],
    [
      { maskBorderWidth: "10% 20% 30% 40%" },
      "mask-border-width: 10% 20% 30% 40%;",
      "",
    ],
    [{ maskClip: "border-box" }, "mask-clip: border-box;", ""],
    [{ maskComposite: "add" }, "mask-composite: add;", ""],
    [{ maskImage: 'url("mask.png")' }, 'mask-image: url("mask.png");', ""],
    [{ maskMode: "alpha" }, "mask-mode: alpha;", ""],
    [{ maskOrigin: "border-box" }, "mask-origin: border-box;", ""],
    [{ maskPosition: "center" }, "mask-position: center;", ""],
    [{ maskRepeat: "repeat" }, "mask-repeat: repeat;", ""],
    [{ maskSize: 10 }, "mask-size: 10px;", ""],
    [{ maskSize: "10% 20%" }, "mask-size: 10% 20%;", ""],
    [{ maskType: "luminance" }, "mask-type: luminance;", ""],
    [{ maskBorderWidth: 0 }, "mask-border-width: 0;", ""],
  ];

  test.each(testCases)(
    "should return the correct CSS styles for the given MaskProps",
    (props, expectedStyles, expectedMediaStyle) => {
      const styles = mask(props);
      const mediaString = Object.entries(styles.media)
        .map(([breakpoint, css]) => `@media (min-width:  ${breakpoint}{${css}}`)
        .join("");

      expect(styles.base.replace(/\s/g, "")).toBe(
        expectedStyles.replace(/\s/g, "")
      );
      expect(mediaString.replace(/\s/g, "")).toBe(
        expectedMediaStyle.replace(/\s/g, "")
      );
    }
  );
});
