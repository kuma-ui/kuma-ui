import { babelTransform, getExpectSnapshot } from "./testUtils";

describe("k api", () => {
  describe.each([[undefined], ["classic" as const], ["automatic" as const]])(
    "Snapshot tests (runtime: %s)",
    (runtime) => {
      test("basic usage should match snapshot", () => {
        // Arrange
        const inputCode = `
        import { k } from '@kuma-ui/core'
        function App() {
          return <k.div fontSize={24}></k.div>
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
        import { k } from '@kuma-ui/core'
        function App() {
          return <k.a fontSize={[16, 24]} />
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
        import { k } from '@kuma-ui/core'
        function App() {
          return <k.div p={2} />
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
        import { k } from '@kuma-ui/core'
        function App() {
          return <k.div p={2} _after={{ color: 'blue' }} />
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
        import { k } from '@kuma-ui/core'
        function App() {
          return <k.span p={2} _hover={{ color: 'red' }} />
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
        import { k, css } from '@kuma-ui/core'
        function App() {
          return (
            <k.div
              p={2}
              _hover={{ color: 'red' }}
              className={css({ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' })}
            />
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
