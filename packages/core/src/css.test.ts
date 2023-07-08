import { css } from "./css";
import { describe, expect, test } from "vitest";

describe("css", () => {
  test('should throw an error when using the "css" at runtime', () => {
    expect(() => css``).toThrowError(
      'Using the "css" in runtime is not supported.'
    );
  });
});
