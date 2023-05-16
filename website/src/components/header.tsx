import React, { type FC, memo } from "react";
import { k, styled } from "@kuma-ui/core";
import Link from "next/link";
import { Logo } from "./logo";

export const Header: FC = memo(() => {
  return (
    <k.header
      position="sticky"
      top={0}
      width="100%"
      height={64}
      p="8px 16px"
      borderBottom="1px solid #dadde1"
    >
      <k.div
        maxWidth={1200}
        mx="auto"
        height="100%"
        display="flex"
        justify="space-between"
        alignItems="center"
      >
        <Link
          href=""
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
          }}
        >
          <Logo width={32} />
          <k.div
            color="black"
            fontWeight="700"
            fontFamily="Quicksand"
            fontSize={32}
          >
            Kuma UI
          </k.div>
        </Link>
      </k.div>
    </k.header>
  );
});
