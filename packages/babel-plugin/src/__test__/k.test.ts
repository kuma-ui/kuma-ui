import { babelTransform } from "./testUtils";

describe("k api", () => {
  describe("Snapshot tests", () => {
    test("basic usage should match snapshot", () => {
      // Arrange
      const inputCode = `
        import { k } from '@kuma-ui/core'
        function App() {
          return <k.div fontSize={24}></k.div>
        }
      `;
      // Act
      const { code } = babelTransform(inputCode);
      // Assert
      expect(code).toMatchSnapshot();
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
      const { code } = babelTransform(inputCode);
      // Assert
      expect(code).toMatchSnapshot();
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
      const { code } = babelTransform(inputCode);
      // Assert
      expect(code).toMatchSnapshot();
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
      const { code } = babelTransform(inputCode);
      // Assert
      expect(code).toMatchSnapshot();
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
      const { code } = babelTransform(inputCode);
      // Assert
      expect(code).toMatchSnapshot();
    });
  });
});
