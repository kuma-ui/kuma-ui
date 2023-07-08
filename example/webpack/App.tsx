import { useReducer } from "react";
import { k, Box, Button } from "@kuma-ui/core";

function Dynamic() {
  const [checked, toggle] = useReducer((state) => !state, false);

  return (
    <Box p={12} bg={checked ? "blue" : "green"}>
      dynamic
      <Button onClick={() => toggle()}>Change Background Color</Button>
    </Box>
  );
}

export const App: React.VFC = () => {
  return (
    <>
      <k.div fontSize={24} color="orange">
        Hello World!
      </k.div>
      <Dynamic key={1} />
      <Dynamic key={2} />
    </>
  );
};
