import { styled } from "zero-styled/styled";
import { TypographyProps, ColorProps, StyledProps } from "zero-styled/system";

function App() {
  const color = "orange";

  return (
    <VStack p={[4, 8]} m={2} _hover={{ flexDir: "row" }}>
      <Text fontSize="24px" color={color}>
        hello world
      </Text>
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
