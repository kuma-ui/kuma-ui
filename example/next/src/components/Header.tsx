import { k } from "@kuma-ui/core";

export const Header = () => {
  return (
    <k.header height={56}>
      <k.div
        maxWidth={1200}
        fontSize={32}
        fontWeight="600"
        fontFamily="quicksand"
        mx="auto"
        color="#D24663"
      >
        Kuma UI
      </k.div>
    </k.header>
  );
};
