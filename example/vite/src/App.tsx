import { Box, HStack, styled, css, Select as S, Text } from "@kuma-ui/core";
import { Dynamic } from "./Dynamic";

function App() {
  const red = "red";
  return (
    <HStack flexDir={["row", "column"]} gap="spacings.4">
      <Text variant={"primary"}>hello</Text>
      <Dynamic key={1} />
      <Dynamic key={2} />
    </HStack>
  );
}

const HelloWorld = styled("p")`
  color: red;
`;

export default App;
