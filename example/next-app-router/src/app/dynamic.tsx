"use client";

import React from "react";
import { Box, Button } from "@kuma-ui/core";

export function Dynamic() {
  const [checked, toggle] = React.useReducer((state) => !state, false);
  const [isButton, setIsButton] = React.useState(false);

  return (
    <Box p={6} bg={checked ? "colors.blue" : "colors.green"}>
      <Box mb={[checked ? 6 : 0, 12]}>dynamic</Box>
      <Button onClick={() => toggle()}>Change Color</Button>
    </Box>
  );
}
