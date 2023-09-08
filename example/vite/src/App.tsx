import { Box, HStack, styled, css, Select as S, Text } from "@kuma-ui/core";
import { Dynamic } from "./Dynamic";

function App() {
  const red = "red";
  return (
    <HStack flexDir={["row", "column"]} gap="spacings.4">
      <Text>hello</Text>
      <Dynamic key={1} />
      <Dynamic key={2} />
    </HStack>
  );
}

export default App;
