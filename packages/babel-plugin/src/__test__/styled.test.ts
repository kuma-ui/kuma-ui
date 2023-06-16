import { babelTransform, getExpectSnapshot } from "./testUtils";

describe("styled function", () => {
  describe.each([[undefined], ["classic" as const], ["automatic" as const]])(
    "Snapshot tests (runtime: %s)",
    (runtime) => {
      test("basic usage should match snapshot", () => {
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
        const result = babelTransform(inputCode, runtime);
        // Assert
        expect(getExpectSnapshot(result)).toMatchSnapshot();
      });

      test("using responsive props should match snapshot", () => {
        // Arrange
        const inputCode = `
        import { styled } from '@kuma-ui/core'
        const Box = styled('a')\`
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
          return <Box fontSize={[16, 24]}>test</Box>
        }
      `;
        // Act
        const result = babelTransform(inputCode, runtime);
        // Assert
        expect(getExpectSnapshot(result)).toMatchSnapshot();
      });

      test("using space props should match snapshot", () => {
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
          return <Box p={2}>test</Box>
        }
      `;
        // Act
        const result = babelTransform(inputCode, runtime);
        // Assert
        expect(getExpectSnapshot(result)).toMatchSnapshot();
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
          return <Box p={2} _after={{ color: 'blue' }}>test</Box>
        }
      `;
        // Act
        const result = babelTransform(inputCode, runtime);
        // Assert
        expect(getExpectSnapshot(result)).toMatchSnapshot();
      });

      test("using pseudo props should match snapshot", () => {
        // Arrange
        const inputCode = `
        import { styled } from '@kuma-ui/core'
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
          return <Box p={2} _hover={{ color: 'red' }}>test</Box>
        }
      `;
        // Act
        const result = babelTransform(inputCode, runtime);
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
              p={2}
              _hover={{ color: 'red' }}
              className={css({ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' })}
            >
              test
            </Box>
          )
        }
        `;
        // Act
        const result = babelTransform(inputCode, runtime);
        // Assert
        expect(getExpectSnapshot(result)).toMatchSnapshot();
      })
    }
  );
});
