import { theme } from "@kuma-ui/sheet";
import { babelTransform, getExpectSnapshot } from "./testUtils";

describe("headless component", () => {
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

  test("using default props should match snapshot", () => {
    // Arrange
    const inputCode = `
        import { Text } from '@kuma-ui/core'
        function App() {
          return <Text />
        }
      `;
    // Act
    const result = babelTransform(inputCode);
    // Assert
    expect(getExpectSnapshot(result)).toMatchSnapshot();
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
    const result = babelTransform(inputCode);
    // Assert
    expect(getExpectSnapshot(result)).toMatchSnapshot();
  });
});
