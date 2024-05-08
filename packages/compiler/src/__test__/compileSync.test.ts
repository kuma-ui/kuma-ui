import { describe, beforeAll, test, expect } from "vitest";
import { compileSync } from "..";
import { getExpectSnapshotSync } from "./testUtils";
import { theme } from "@kuma-ui/sheet";

describe("compileSync", () => {
  beforeAll(() => {
    theme.setUserTheme({
      components: {
        Text: {
          baseStyle: {
            textDecoration: "underline", // will be overwritten by defaultProps
          },
          variants: {
            primary: {
              color: "green",
            },
            secondary: {
              color: "blue",
            },
          },
          defaultProps: {
            variant: "primary",
            textDecoration: "line-through",
            fontSize: "16px",
          },
        },
      },
    });
  });

  describe("wasm", () => {
    test("using default props should match snapshot", () => {
      // Arrange
      const inputCode = `
            import { Text } from '@kuma-ui/core'
            function App() {
              return <Text />
            }
          `;
      // Act
      const result = compileSync({
        code: inputCode,
        id: "test.tsx",
        wasm: true,
      });
      // Assert
      expect(getExpectSnapshotSync(result)).toMatchSnapshot();
    });

    test("using default props with inline props should match snapshot", () => {
      // Arrange
      const inputCode = `
            import { Text } from '@kuma-ui/core'
            function App() {
              return <Text variant="secondary" fontSize="12px" />
            }
          `;
      // Act
      const result = compileSync({
        code: inputCode,
        id: "test.tsx",
        wasm: true,
      });
      // Assert
      expect(getExpectSnapshotSync(result)).toMatchSnapshot();
    });
  });

  describe("babel", () => {
    test("using default props should match snapshot", () => {
      // Arrange
      const inputCode = `
              import { Text } from '@kuma-ui/core'
              function App() {
                return <Text />
              }
            `;
      // Act
      const result = compileSync({
        code: inputCode,
        id: "test.tsx",
        wasm: false,
      });
      // Assert
      expect(getExpectSnapshotSync(result)).toMatchSnapshot();
    });

    test("using default props with inline props should match snapshot", () => {
      // Arrange
      const inputCode = `
              import { Text } from '@kuma-ui/core'
              function App() {
                return <Text variant="secondary" fontSize="12px" />
              }
            `;
      // Act
      const result = compileSync({
        code: inputCode,
        id: "test.tsx",
        wasm: false,
      });
      // Assert
      expect(getExpectSnapshotSync(result)).toMatchSnapshot();
    });
  });
});
