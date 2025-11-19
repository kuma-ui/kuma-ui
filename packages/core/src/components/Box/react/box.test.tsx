import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Box } from ".";
import React, { MouseEventHandler, createRef } from "react";

describe("Box component", () => {
  it("should render correctly with given static props", () => {
    // Arrange
    const props = { p: 8, color: "white" };

    // Act
    render(<Box {...props}>This is a box</Box>);

    // Assert
    expect(screen.getByText("This is a box")).toHaveStyle({
      padding: "8px",
      color: "rgb(255, 255, 255)",
    });
  });

  it("should correctly override prop types by `as` prop", () => {
    // Arrange
    const ref = createRef<HTMLButtonElement>();
    const onClick: MouseEventHandler<HTMLButtonElement> = () => {};

    // Assert
    <Box as="button" ref={ref} onClick={onClick} />;
  });
});
