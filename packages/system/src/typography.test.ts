import { typography, TypographyProps } from "./typography";
import { describe, test, expect } from "vitest";

describe("typography utility function", () => {
  const testCases: Array<[TypographyProps, string, string]> = [
    [{ hyphenateCharacter: "'='" }, "hyphenate-character: '=';", ""],
    [{ hyphenateLimitChars: 10 }, "hyphenate-limit-chars: 10;", ""],
    [{ hyphenateLimitChars: "10 4 4" }, "hyphenate-limit-chars: 10 4 4;", ""],
    [{ hyphens: "manual" }, "hyphens: manual;", ""],
    [
      { hangingPunctuation: "first last" },
      "hanging-punctuation: first last;",
      "",
    ],
    [{ lineHeight: 2.5 }, "line-height: 2.5;", ""],
    [{ lineHeight: "2.5em" }, "line-height: 2.5em;", ""],
    [{ lineBreak: "loose" }, "line-break: loose;", ""],
    [{ orphans: 2 }, "orphans: 2;", ""],
    [{ rubyPosition: "over" }, "ruby-position: over;", ""],
    [{ unicodeBidi: "embed" }, "unicode-bidi: embed;", ""],
    [{ widows: 2 }, "widows: 2;", ""],
    [{ whiteSpace: "pre-wrap" }, "white-space: pre-wrap;", ""],
    [{ letterSpacing: 1 }, "letter-spacing: 1px;", ""],
    [{ wordSpacing: 1 }, "word-spacing: 1px;", ""],
    [{ wordBreak: "break-all" }, "word-break: break-all;", ""],
    [{ writingMode: "vertical-rl" }, "writing-mode: vertical-rl;", ""],
  ];

  test.each(testCases)(
    "should return the correct CSS styles for the given TypographyProps",
    (props, expectedStyles, expectedMediaStyles) => {
      const { base, media } = typography(props);
      const mediaString = Object.entries(media)
        .map(
          ([breakpoint, css]) => `@media (min-width: ${breakpoint}) {${css}}`
        )
        .join("");

      expect(base.replace(/\s/g, "")).toBe(expectedStyles.replace(/\s/g, ""));
      expect(mediaString.replace(/\s/g, "")).toBe(expectedMediaStyles);
    }
  );
});
