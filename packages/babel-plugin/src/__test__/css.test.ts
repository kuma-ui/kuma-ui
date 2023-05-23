import { describe, expect, test } from "@jest/globals";
import { babelTransform } from "./testUtils";

describe("css function", () => {
  describe("Snapshot tests", () => {
    test("basic usage should match snapshot", () => {
      // Arrange
      const inputCode = `
        import { css } from '@kuma-ui/core'
        const style = css({ color: 'red' })
      `;
      // Act
      const { code } = babelTransform(inputCode);
      // Assert
      expect(code).toMatchSnapshot();
    });

    test("using space props should match snapshot", () => {
      // Arrange
      const inputCode = `
        import { css } from '@kuma-ui/core'
        const style = css({ p: 2 })
      `;
      // Act
      const { code } = babelTransform(inputCode);
      // Assert
      expect(code).toMatchSnapshot();
    });

    test("using pseudo props should match snapshot", () => {
      // Arrange
      const inputCode = `
        import { css } from '@kuma-ui/core'
        const style = css({ _hover: { color: 'red' } })
      `;
      // Act
      const { code } = babelTransform(inputCode);
      // Assert
      expect(code).toMatchSnapshot();
    });
  });
});
