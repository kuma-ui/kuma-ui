import {
  Box,
  Flex,
  Spacer,
  Text,
  Button,
  Heading,
  styled,
  css,
  Select as S,
} from "@kuma-ui/core";
import { Dynamic } from "./Dynamic";

function App() {
  const red = "red";
  return (
    <Box as="main" display="flex" flexDir={["column"]}>
      <Dynamic key={1} />
      <Dynamic key={2} />
    </Box>
  );
}

const HelloWorld = styled("p")`
  color: red;
`;

export default App;
