import {
  Box,
  HStack,
  styled,
  css,
  Select as S,
  Text,
  VStack,
} from "@kuma-ui/core";
import { Dynamic } from "./Dynamic";
import { ElementType, useRef } from "react";

function App() {
  const red = "red";

  const ref = useRef<HTMLDivElement>(null);
  const aref = useRef<HTMLAnchorElement>(null);

  return (
    <HStack flexDir={["row", "column"]} gap="spacings.4">
      <Text>hello</Text>
      <Dynamic key={1} />
      <Dynamic key={2} />
      <VStack ref={ref}></VStack>
      {/* <VStack as='a' ref={aref}></VStack> */}
    </HStack>
  );
}

const HelloWorld = styled("p")`
  color: red;
`;

export default App;
