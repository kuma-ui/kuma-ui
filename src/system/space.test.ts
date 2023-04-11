import { space, SpaceProps } from "./space";
import { describe, expect, test, beforeEach } from "@jest/globals";

describe("space utility function", () => {
  // Arrange
  const testCases: Array<[SpaceProps, string]> = [
    [{ m: 8 }, "margin: 8px; "],
    [{ mt: "8px" }, "margin-top: 8px; "],
    [{ mx: 8 }, "margin-left: 8px; margin-right: 8px; "],
    [
      { mx: [4, 8] },
      "margin-left: 4px; @media (min-width: 576px) { margin-left: 8px; }margin-right: 4px; @media (min-width: 576px) { margin-right: 8px; }",
    ],
  ];

  test.each(testCases)(
    "should return the correct CSS styles for the given SpaceProps",
    (props, expectedStyles) => {
      // Act
      const styles = space(props);
      // Asert
      expect(styles.replace(/\s/g, "")).toBe(expectedStyles.replace(/\s/g, ""));
    }
  );

  test("should only generate styles for valid SpaceKeys", () => {
    // Arrange
    const invalidProps = {
      invalid: 8,
      invalid2: "8px",
    };

    // Act
    const style = space(invalidProps as any);
    expect(style).toBe("");
  });
});
