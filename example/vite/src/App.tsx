import {
  Box,
  HStack,
  styled,
  css,
  Select as S,
  Text,
  Button,
} from "@kuma-ui/core";
import { Dynamic } from "./Dynamic";
import { MouseEventHandler, useEffect, useRef } from "react";

function App() {
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonRef2 = useRef<HTMLButtonElement>(null);

  const onClick: MouseEventHandler<HTMLButtonElement> = () => {
    alert("Hi");
  };

  useEffect(() => {
    if (ref.current) {
      console.log("ref", ref.current);
      // console.log("buttonRef", buttonRef.current);
    }
  }, []);

  return (
    <HStack flexDir={["row", "column"]} gap="spacings.4">
      <Text>hello</Text>
      <Dynamic key={1} />
      <Dynamic key={2} />
      {/* <Box ref={ref} color={true ? "red" : "blue"}>
        hello
      </Box> */}
      <Button ref={buttonRef} color={true ? "red" : "blue"}>
        hello
      </Button>
      <Box as="button" ref={buttonRef2} onClick={onClick}>
        Click Me!
      </Box>
      <Styled ref={ref}>hello</Styled>
    </HStack>
  );
}

export default App;

const Styled = styled.div`
  color: orange;
`;
