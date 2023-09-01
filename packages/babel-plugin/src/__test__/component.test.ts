import { theme } from "@kuma-ui/sheet";
import { babelTransform, getExpectSnapshot } from "./testUtils";

describe("headless component", () => {
  test("using default props should match snapshot", () => {
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
});
