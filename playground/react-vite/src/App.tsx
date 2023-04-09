import React, { useState } from "react";
import styled from "zero-styled/dist/styled";
import { space } from "zero-styled/dist/system/index";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <A p="4px">hello</A>
      <div>hello world</div>
    </div>
  );
}

export default App;

const A = styled("div")`
  ${space}
`;
