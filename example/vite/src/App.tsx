import { Box, HStack, styled, css, Select as S } from "@kuma-ui/core";
import { Dynamic } from "./Dynamic";

function App() {
  const red = "red";
  return (
    <HStack>
      <Dynamic key={1} />
      <Dynamic key={2} />
    </HStack>
  );
}

const HelloWorld = styled("p")`
  color: red;
`;

export default App;
