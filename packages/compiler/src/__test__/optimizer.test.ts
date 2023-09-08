import { compile } from "../compile";
import { getExpectSnapshot } from "./testUtils";
import { describe, it, expect } from "vitest";
import { componentList } from "@kuma-ui/core/components/componentList";

describe("optimizer", () => {
  it("should compile Kuma components to raw HTML when no dynamic props are given", () => {
    // Arrange
    const code = `
        import { Box, Text } from "@kuma-ui/core";
        
        function App() {
          const red = "red";
          return (
            <HStack flexDir={["row", "column"]}>
              <Text>hello</Text>
            </HStack>
          );
        }
        `;

    // Act
    const result = compile(code, "file.tsx", componentList);
    // Assert
    expect(getExpectSnapshot(result)).toMatchSnapshot();
  });

  it("should not compile Kuma components with dynamic props to raw HTML", () => {
    // Arrange
    const code = `
      import { Box, Text, HStack } from "@kuma-ui/core";
      import { useState } from 'react'
      
      function App() {
        const red = "red"
        return (
          <HStack color={true ? red : 'blue'}>
            <Text>hello</Text>
          </HStack>
        );
      }
      `;

    // Act
    const result = compile(code, "file.tsx", componentList);

    // Assert
    expect(getExpectSnapshot(result)).not.toMatchSnapshot();
  });

  it("should not compile to raw HTML when spread attributes are present", () => {
    // Arrange
    const code = `
      import { Box, Text, HStack } from "@kuma-ui/core";
      
      function App(props) {
        return (
          <HStack {...props}>
            <Text>hello</Text>
          </HStack>
        );
      }
      `;

    // Act
    const result = compile(code, "file.tsx", componentList);

    // Assert
    expect(getExpectSnapshot(result)).not.toMatchSnapshot();
  });

  it("should compile SelfClosingTags with static styles to raw HTML", () => {
    // Arrange
    const code = `
      import { Image } from "@kuma-ui/core";
      
      function App() {
        return (
          <Image src="path/to/image.jpg" alt="Sample Image" />
        );
      }
      `;

    // Act
    const result = compile(code, "file.tsx", componentList);

    // Assert
    expect(getExpectSnapshot(result)).toMatchSnapshot();
  });
});
