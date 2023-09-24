import { babelTransform, getExpectSnapshot } from "./testUtils";
import { beforeEach } from "vitest";
import { sheet, theme } from "@kuma-ui/sheet";

describe("styled function", () => {
  beforeEach(() => {
    sheet.reset();
    theme.setUserTheme({
      colors: {
        "colors.background": "rgba(255, 0, 0, 0.5)",
      },
      breakpoints: {
        "breakpoints.sm": "768px",
      },
    });
  });

  describe.each([[undefined], ["classic" as const], ["automatic" as const]])(
    "Snapshot tests (runtime: %s)",
    () => {
      test("'styled' tag function usage should match snapshot", () => {
        // Arrange
        const inputCode = `
        import { styled } from '@kuma-ui/core'
        const Box = styled('div')\`
          position: relative;
          width: 300px;
          height: 300px;
          background-color: rgba(255, 0, 0, 0.5);
          &:hover {
            background-color: rgba(0, 0, 255, 0.5);
          }
          @media (max-width: 768px) {
            flex-direction: column;
          }
        \`
        function App() {
          return <Box>test</Box>
        }
      `;
        // Act
        const result = babelTransform(inputCode);
        // Assert
        expect(getExpectSnapshot(result)).toMatchSnapshot();
      });

      test("'styled' tag property usage should match snapshot", () => {
        // Arrange
        const inputCode = `
        import { styled } from '@kuma-ui/core'
        const Box = styled.div\`
          position: relative;
          width: 300px;
          height: 300px;
          background-color: rgba(255, 0, 0, 0.5);
          &:hover {
            background-color: rgba(0, 0, 255, 0.5);
          }
          @media (max-width: 768px) {
            flex-direction: column;
          }
        \`
        function App() {
          return <Box>test</Box>
        }
      `;
        // Act
        const result = babelTransform(inputCode);
        // Assert
        expect(getExpectSnapshot(result)).toMatchSnapshot();
      });

      test("'styled' tag property usage should match snapshot", () => {
        // Arrange
        const inputCode = `
        import { styled } from '@kuma-ui/core'
        const GreenButton = styled.button\`
          background: green;
        \`
        const GreenButtonRedText = styled(GreenButton)\`
          color: red;
        \`
        function App() {
          return <GreenButton>test</GreenButton>
        }
      `;
        // Act
        const result = babelTransform(inputCode);
        // Assert
        expect(getExpectSnapshot(result)).toMatchSnapshot();
      });

      test("placeholder usage should match snapshot", () => {
        const originalCode = `
        import { styled } from '@kuma-ui/core'
        const Box = styled('div')\`
          position: relative;
          width: 300px;
          height: 300px;
          background-color: rgba(255, 0, 0, 0.5);
          &:hover {
            background-color: rgba(0, 0, 255, 0.5);
          }
          @media (max-width: 768px) {
            flex-direction: column;
          }
        \`
        function App() {
          return <Box>test</Box>
        }
      `;

        // Arrange
        const inputCode = `
        import { styled } from '@kuma-ui/core'
        const Box = styled('div')\`
          position: relative;
          width: 300px;
          height: 300px;
          background-color: t("colors.background");
          &:hover {
            background-color: rgba(0, 0, 255, 0.5);
          }
          @media (max-width: t("breakpoints.sm")) {
            flex-direction: column;
          }
        \`
        function App() {
          return <Box>test</Box>
        }
      `;
        // Act
        const result = babelTransform(inputCode);
        const original = babelTransform(originalCode);
        // Assert
        expect(getExpectSnapshot(result)).toEqual(getExpectSnapshot(original));
      });

      test("using pseudo elements should match snapshot", () => {
        // Arrange
        const inputCode = `
        import { styled } from '@kuma-ui/core'
        const Box = styled('div')\`
          position: relative;
          width: 300px;
          height: 300px;
          background-color: rgba(255, 0, 0, 0.5);
          &:hover {
            background-color: rgba(0, 0, 255, 0.5);
          }
          @media (max-width: 768px) {
            flex-direction: column;
          }
        \`
        function App() {
          return <Box>test</Box>
        }
      `;
        // Act
        const result = babelTransform(inputCode);
        // Assert
        expect(getExpectSnapshot(result)).toMatchSnapshot();
      });

      test("using className prop should match snapshot", () => {
        // Arrange
        const inputCode = `
        import { styled, css } from '@kuma-ui/core'
        const Box = styled('span')\`
          position: relative;
          width: 300px;
          height: 300px;
          background-color: rgba(255, 0, 0, 0.5);
          &:hover {
            background-color: rgba(0, 0, 255, 0.5);
          }
          @media (max-width: 768px) {
            flex-direction: column;
          }
        \`
        function App() {
          return (
            <Box
              className={css({ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' })}
            >
              test
            </Box>
          )
        }
        `;
        // Act
        const result = babelTransform(inputCode);
        // Assert
        expect(getExpectSnapshot(result)).toMatchSnapshot();
      });
    }
  );
});
