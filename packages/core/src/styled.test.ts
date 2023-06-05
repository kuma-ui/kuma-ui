import { styled } from "./styled";
import { describe, expect, test } from "vitest";

describe("styled", () => {
  test('should throw an error when using the "styled" tag at runtime', () => {
    expect(() => styled("div")``).toThrowError(
      'Using the "styled" tag in runtime is not supported.'
    );
  });
});
