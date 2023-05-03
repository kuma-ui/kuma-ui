import { type FC, memo } from "react";
import { k } from "@kuma-ui/core";
// import Link from "next/link";

export const Header: FC = memo(() => {
  return (
    <k.header
      width="100%"
      height={64}
      display="flex"
      justify="space-between"
      alignItems="center"
      px={16}
    >
      <k.a fontWeight="600" href="">
        Kuma UI 🐻
      </k.a>
    </k.header>
  );
});

// const Anchor = styled("a")``;
