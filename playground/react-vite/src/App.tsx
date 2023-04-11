import React, { useState } from "react";
import styled from "zero-styled/dist/styled";
import { typography, combinedStyles } from "zero-styled/dist/system/index";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Box
        p={[4, 8]}
        m="2px"
        fontSize={["22px", "44px"]}
        display="flex"
        color={["red", "blue"]}
      >
        hello
      </Box>
      <Text fontSize="40px">hello world</Text>
    </div>
  );
}

export default App;

const Box = styled("div")`
  ${combinedStyles}
`;

const Text = styled("p")`
  ${typography}
`;
