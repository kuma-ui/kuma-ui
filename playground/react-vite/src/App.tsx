import { styled, z } from "zero-styled";
import { Box } from "./Box";

const color = "orange";
const colors = {
  red: "red",
  main: {
    test: {
      target: "orange",
    },
  },
};

function App() {
  return (
    <VStack
      p={[4, 8]}
      m={2}
      // _hover={{ flexDir: "row" }}
      display="grid"
      gridGap={1}
    >
      <Text fontSize="24px" color={color}>
        hello world
      </Text>
      <Text fontSize="24px" color={colors.red}>
        Red
      </Text>
      <Text fontSize="24px" color={colors.main.test.target}>
        Nested Member Expression
      </Text>
      <z.div fontSize={50}>hello</z.div>
    </VStack>
  );
}

export const VStack = styled("div")`
  display: flex;
  flex-direction: column;
  :hover {
    color: red;
  }
`;

const Text = styled("p")``;

export default App;
