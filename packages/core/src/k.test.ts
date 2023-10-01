import { k } from "./k";
import { describe, expect, test } from "vitest";

describe("k", () => {
  test(`should throw an error when using the "k" at runtime`, () => {
    expect(() => k.div).toThrowError(
      'Using the "k" in runtime is not supported.',
    );
  });
});
