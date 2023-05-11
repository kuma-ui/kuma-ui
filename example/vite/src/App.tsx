import { k, styled } from "@kuma-ui/core";

function App() {
  return (
    <div>
      <k.div fontSize={50} color="red">
        hello
      </k.div>
      <Text color="blue">world</Text>
      <k.button p="10px 12px" fontSize={16} disabled>
        button
      </k.button>
    </div>
  );
}

export default App;

const Text = styled("p")`
  color: red;
`;
