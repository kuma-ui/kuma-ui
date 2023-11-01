import { compose, StyledProps } from "./compose";
import { describe, expect, test } from "vitest";
describe("compose function", () => {
  test("should combine styles from multiple style functions", () => {
    // Arrange
    const combinedFunction = compose();
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
      transition: "all 0.5s ease-in-out",
      outline: "none",
      borderTop: "1px solid red",
      animation: "fadein 2s",
      maskRepeat: "no-repeat",
      columnCount: 2,
      bgImage: "url('img_tree.png')",
      bgSize: "cover",
      bgPosition: "center",
      bgRepeat: "no-repeat",
      bgAttachment: "fixed",
      bgClip: "border-box",
      bgOrigin: "content-box",
      marginRight: 4,
      textAlign: "right",
      backdropFilter: "drop-shadow(4px 4px 10px blue)",
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
      "box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, .2)",
    );
    expect(styles.base).toContain("list-style: square;");
    expect(styles.base).toContain("z-index: 9999;");
    expect(styles.base).toContain("cursor: pointer;");
    expect(styles.base).toContain("transition: all 0.5s ease-in-out;");
    expect(styles.base).toContain("outline: none;");
    expect(styles.base).toContain("border-top: 1px solid red;");
    expect(styles.base).toContain("animation: fadein 2s;");
    expect(styles.base).toContain("mask-repeat: no-repeat;");
    expect(styles.base).toContain("column-count: 2;");
    expect(styles.base).toContain("background-image: url('img_tree.png');");
    expect(styles.base).toContain("background-size: cover;");
    expect(styles.base).toContain("background-position: center;");
    expect(styles.base).toContain("background-repeat: no-repeat;");
    expect(styles.base).toContain("background-attachment: fixed;");
    expect(styles.base).toContain("background-clip: border-box;");
    expect(styles.base).toContain("background-origin: content-box;");
    expect(styles.base).toContain("margin-right: 4px;");
    expect(styles.base).toContain("text-align: right;");
    expect(styles.base).toContain(
      "backdrop-filter: drop-shadow(4px 4px 10px blue);",
    );
  });

  test("should not include invalid keys in the resulting CSS", () => {
    // Arrange
    const props = { invalid: true };
    // Act
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any -- FIXME
    const styles = compose()(props as any);

    // Assert
    expect(styles.base).toBe("");
  });
});
