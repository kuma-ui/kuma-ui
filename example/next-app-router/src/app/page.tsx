import { k } from "@kuma-ui/core";
import { Button } from "./button";

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
          <Button></Button>
          Kuma UI
        </k.div>
      </k.header>
    </div>
  );
}
