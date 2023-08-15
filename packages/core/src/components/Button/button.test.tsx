import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, it, expect } from "vitest";
import { Button } from "./react";

describe("Button component", () => {
  it("should render correctly with props", () => {
    // Arrange
    const props = { p: 8, color: "white" };

    // Act
    render(<Button {...props}>Submit</Button>);

    // Assert
    expect(screen.getByRole("button", { name: "Submit" })).toHaveStyle({
      padding: "8px",
      color: "rgb(255, 255, 255)",
    });
  });
});
