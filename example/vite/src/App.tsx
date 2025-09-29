import {
  Box,
  HStack,
  styled,
  css,
  Select as S,
  Text,
  Button,
  Link,
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
    <Box color="GrayText" border="1px solid" borderColor="orange">
      test
      <Styled>Styled</Styled>
      <Text contain="size">日本語</Text>
      <Dynamic />
      <Link
        href="https://www.kuma-ui.com/"
        target="_blank"
        _after={{
          content: '"🚀"',
          fontSize: 24,
        }}
      >
        Go to Our Website
      </Link>
    </Box>
  );
}

export default App;

const Styled = styled.div`
  color: orange;
`;
