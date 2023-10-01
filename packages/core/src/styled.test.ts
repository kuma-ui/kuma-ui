import { styled } from "./styled";
import { describe, expect, test } from "vitest";

describe("styled", () => {
  test('should throw an error when using the "styled" tag as a function at runtime', () => {
    expect(() => styled("div")``).toThrowError(
      'Using the "styled" tag in runtime is not supported.',
    );
  });
  test('should throw an error when using a "styled" tag property at runtime', () => {
    expect(() => styled.div``).toThrowError(
      'Using the "styled" tag in runtime is not supported.',
    );
  });
});
