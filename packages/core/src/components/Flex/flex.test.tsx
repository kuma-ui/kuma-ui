import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, it, expect } from "vitest";
import { Flex, FlexProps } from "./react";

describe("Flex component", () => {
  it("should renders all the allowed shorthand style props", () => {
    // Arrange
    const props: FlexProps = {
      flexDir: "column",
      justify: "center",
      alignItems: "center",
      alignContent: "center",
      alignSelf: "center",
      flex: "1 1 auto",
      flexFlow: "row wrap",
      flexWrap: "wrap",
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: "auto",
      justifyItems: "center",
      justifySelf: "center",
      gap: 1,
    };

    // Act
    render(<Flex {...props}>Flexbox</Flex>);

    // Assert
    expect(screen.getByText("Flexbox")).toBeInTheDocument();
  });
});
