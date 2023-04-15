import { styled } from "zero-styled/styled";
import {
  typography,
  compose,
  color,
  all,
  TypographyProps,
  ColorProps,
  StyledProps,
} from "zero-styled/system";

function App() {
  return (
    <Box p={[4, 8]} m="2px" display="flex">
      <Text fontSize={"40px"} _hover={{ color: "orange" }}>
        hello world
      </Text>
    </Box>
  );
}

export const Box = styled("div")<StyledProps>`
  ${all}
`;

const Text = styled("p")<TypographyProps & ColorProps>`
  ${compose(color, typography)}
`;

export default App;
