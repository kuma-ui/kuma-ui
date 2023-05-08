import { type FC, memo } from "react";
import { k, styled } from "@kuma-ui/core";

export const Header: FC = memo(() => {
  return (
    <k.header
      width="100%"
      height={64}
      display="flex"
      justify="space-between"
      alignItems="center"
      p="8px 16px"
    >
      <k.a fontWeight="600" href="">
        Kuma UI 🐻
      </k.a>
    </k.header>
  );
});
