import { styled } from "zero-styled/styled";
import { TypographyProps, ColorProps, StyledProps } from "zero-styled/system";
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
      _hover={{ flexDir: "row" }}
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
      <Box color="red">hello</Box>
    </VStack>
  );
}

export const VStack = styled("div")<StyledProps>`
  display: flex;
  flex-direction: column;
  :hover {
    color: red;
  }
`;

const Text = styled("p")<ColorProps & TypographyProps>``;

export default App;
