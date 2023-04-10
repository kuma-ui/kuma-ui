import { compose, StyledProps } from "./compose";
import { space } from "./space";
import { typography } from "./typography";
import { layout } from "./layout";
import { color } from "./color";
import { describe, expect, test, beforeEach } from "@jest/globals";
import { flex } from "./flex";
describe("compose function", () => {
  test("should combine styles from multiple style functions", () => {
    // Arrange
    const combinedFunction = compose(space, typography, layout, color, flex);
    const props: StyledProps = {
      m: 8,
      fontSize: 16,
      width: "100%",
      bg: "red",
      color: "red",
      flexDir: ["column", "row"],
    };
    // Act
    const styles = combinedFunction(props);

    // Assert
    expect(styles).toContain("margin: 8px");
    expect(styles).toContain("font-size: 16px");
    expect(styles).toContain("width: 100%");
    expect(styles).toContain("background-color: red");
    expect(styles).toContain("flex-direction: column");
  });

  test("should not include invalid keys in the resulting CSS", () => {
    // Arrange
    const props = { invalid: true };
    // Act
    const styles = compose(space)(props as any);

    // Assert
    expect(styles).toBe("");
  });
});
