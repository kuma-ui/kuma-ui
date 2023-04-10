import { flex, FlexProps } from "./flex";
import { describe, expect, test, beforeEach } from "@jest/globals";

describe("flex utility function", () => {
  // Arrange
  const testCases: Array<[FlexProps, string]> = [
    [{ flexDir: "column" }, "flex-direction: column; "],
    [{ justify: "center" }, "justify-content: center; "],
  ];

  test.each(testCases)(
    "should return the correct CSS styles for the given FlexProps",
    (props, expectedStyles) => {
      // Act
      const styles = flex(props);
      // Asert
      expect(styles).toBe(expectedStyles);
    }
  );

  test("should only generate styles for valid FlexKeys", () => {
    // Arrange
    const invalidProps = {
      invalid: 8,
      invalid2: "8px",
    };

    // Act
    const style = flex(invalidProps as any);
    expect(style).toBe("");
  });
});
