"use client";

import React from "react";
import { Box, Button } from "@kuma-ui/core";

export function Dynamic() {
  const [checked, toggle] = React.useReducer((state) => !state, false);
  const [isButton, setIsButton] = React.useState(false);

  return (
    <Box p={6} bg={checked ? "colors.blue" : "colors.green"}>
      <Box variant={isButton ? "action" : "action2"} mb={(() => [6, 12])()}>dynamic</Box>
      <button onClick={() => setIsButton(v => !v)}>12345</button>
      <Button onClick={() => toggle()}>Change Color</Button>
    </Box>
  );
}
