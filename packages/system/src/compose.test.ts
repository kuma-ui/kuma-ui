import { compose, StyledProps } from "./compose";
import { space } from "./space";
import { typography } from "./typography";
import { layout } from "./layout";
import { color } from "./color";
import { describe, expect, test } from "vitest";
import { flex } from "./flex";
import { shadow } from "./shadow";
import { list } from "./list";
describe("compose function", () => {
  test("should combine styles from multiple style functions", () => {
    // Arrange
    const combinedFunction = compose(
      space,
      typography,
      layout,
      color,
      flex,
      shadow,
      list
    );
    const props: StyledProps = {
      m: 8,
      fontSize: 16,
      width: "100%",
      bg: "red",
      opacity: 0.5,
      color: "red",
      flexDir: ["column", "row"],
      boxShadow: "12px 12px 2px 1px rgba(0, 0, 255, .2)",
      listStyle: "square",
      zIndex: 9999,
      cursor: "pointer",
    };
    // Act
    const styles = combinedFunction(props);

    // Assert
    expect(styles.base).toContain("margin: 8px");
    expect(styles.base).toContain("font-size: 16px");
    expect(styles.base).toContain("width: 100%");
    expect(styles.base).toContain("background: red");
    expect(styles.base).toContain("opacity: 0.5;");
    expect(styles.base).toContain("flex-direction: column");
    expect(styles.base).toContain(
      "box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, .2)"
    );
    expect(styles.base).toContain("list-style: square;");
    expect(styles.base).toContain("z-index: 9999;");
    expect(styles.base).toContain("cursor: pointer;");
  });

  test("should not include invalid keys in the resulting CSS", () => {
    // Arrange
    const props = { invalid: true };
    // Act
    const styles = compose(space)(props as any);

    // Assert
    expect(styles.base).toBe("");
  });
});
