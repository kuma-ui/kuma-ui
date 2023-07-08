import React from "react";
import { Box, Button } from "@kuma-ui/core";

export function Dynamic() {
  const [checked, toggle] = React.useReducer((state) => !state, false);

  return (
    <Box p={12} color={checked ? "colors.blue.light" : "green"}>
      dynamic
      <Button onClick={() => toggle()}>Change Color</Button>
    </Box>
  );
}
