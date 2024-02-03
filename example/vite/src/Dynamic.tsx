import React from "react";
import { Box, Button } from "@kuma-ui/core";

export function Dynamic() {
  const [checked, toggle] = React.useReducer((state) => !state, false);
  const color = checked ? "colors.blue.light" : "green";

  return (
    <Box p={12} color={color}>
      dynamic
      <Button onClick={() => toggle()}>Change Color</Button>
    </Box>
  );
}
