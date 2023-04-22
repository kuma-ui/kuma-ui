import { styled } from "zero-styled/styled";
import { TypographyProps, ColorProps, StyledProps } from "zero-styled/system";

const color = "orange";
const colors = {
  orange: "orange",
};

function App() {
  return (
    <VStack p={[4, 8]} m={2} _hover={{ flexDir: "row" }}>
      <Text fontSize="24px" color={color}>
        hello world
      </Text>
      <Text fontSize="24px" color={colors.orange}>
        Member Expression
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
