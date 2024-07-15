import { css, cx } from "./css";
import { describe, expect, test } from "vitest";

describe("css", () => {
  test('should throw an error when using the "css" at runtime', () => {
    expect(() => css``).toThrowError(
      'Using the "css" in runtime is not supported.',
    );
  });
});

describe("cx", () => {
  test("should merge multiple class names", () => {
    expect(
      cx(
        "one",
        "two",
        true && "three",
        false && "four",
        null && "five",
        undefined && "six",
      ),
    ).toEqual("one two three");
  });
});
