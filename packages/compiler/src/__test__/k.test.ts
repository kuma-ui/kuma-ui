import { describe, beforeEach, test, expect } from "vitest";
import { compileSync } from "..";
import { getExpectSnapshotSync } from "./testUtils";
import { theme, sheet } from "@kuma-ui/sheet";

describe("k", () => {
  describe.each([{ wasm: false }, { wasm: true }])(
    "Snapshot tests with wasm: %p",
    ({ wasm }) => {
      test("basic usage should match snapshot", () => {
        // Arrange
        const inputCode = `
            import { k } from '@kuma-ui/core'
            function App() {
              return <k.div fontSize={24}></k.div>
            }
          `;
        // Act
        const result = compileSync({ code: inputCode, id: "test.tsx", wasm });
        // Assert
        expect(getExpectSnapshotSync(result)).toMatchSnapshot();
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
        const result = compileSync({ code: inputCode, id: "test.tsx", wasm });
        // Assert
        expect(getExpectSnapshotSync(result)).toMatchSnapshot();
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
        const result = compileSync({ code: inputCode, id: "test.tsx", wasm });
        // Assert
        expect(getExpectSnapshotSync(result)).toMatchSnapshot();
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
        const result = compileSync({ code: inputCode, id: "test.tsx", wasm });
        // Assert
        expect(getExpectSnapshotSync(result)).toMatchSnapshot();
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
        const result = compileSync({ code: inputCode, id: "test.tsx", wasm });
        // Assert
        expect(getExpectSnapshotSync(result)).toMatchSnapshot();
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
        const result = compileSync({ code: inputCode, id: "test.tsx", wasm });
        // Assert
        expect(getExpectSnapshotSync(result)).toMatchSnapshot();
      });

      test("should match snapshot when k is used more than once", () => {
        // Arrange
        const inputCode = `
            import { k } from '@kuma-ui/core'
            function App() {
              return <k.div fontSize={24}><k.div fontSize={24}></k.div></k.div>
            }
          `;
        // Act
        const result = compileSync({ code: inputCode, id: "test.tsx", wasm });
        // Assert
        expect(getExpectSnapshotSync(result)).toMatchSnapshot();
      });
    },
  );
});
