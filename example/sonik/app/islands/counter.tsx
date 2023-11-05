import { Box } from "@kuma-ui/core";
import { useState } from "react";

export default function Counter() {
  const [color, setColor] = useState("red");
  const change = () => setColor(color === "red" ? "blue" : "red");
  return (
    <div>
      <Box as={"p"} color={color}>
        Dynamic Color: {color}
      </Box>
      <button onClick={change}>Change Color</button>
    </div>
  );
}
