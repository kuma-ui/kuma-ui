"use client";

import React from "react";
import { Box, Button } from "@kuma-ui/core";

export function Static() {
  const [checked, toggle] = React.useReducer((state) => !state, false);

  return (
    <Box p={6} bg={checked ? "colors.blue" : "colors.green"}>
      <Box mb={checked ? [6, 12] : [0, 12]}>static</Box>
      <Button onClick={() => toggle()}>Change Color</Button>
    </Box>
  );
}
