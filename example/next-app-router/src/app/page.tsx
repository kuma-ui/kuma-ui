import { k, Box } from "@kuma-ui/core";
import { Dynamic } from "./dynamic";
import { Dynamic2 } from "./dynamic2";

export default function Home() {
  return (
    <div>
      <k.header height={56}>
        <k.div
          maxWidth={1200}
          fontSize={32}
          fontWeight="600"
          fontFamily="quicksand"
          mx="auto"
          color="green"
        >
          Kuma UI
        </k.div>
      </k.header>
      <Dynamic key={1} />
      <Dynamic key={2} />
      <Dynamic2 />
      <Box color={(() => "colors.blue")()}>dynamic</Box>
      <Box p={[8, 16]} color="colors.green">
        static
      </Box>
    </div>
  );
}
