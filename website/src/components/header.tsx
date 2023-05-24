import React, { type FC, memo } from "react";
import { css, k, styled } from "@kuma-ui/core";
import Link from "next/link";
import { Inter, Rubik } from "next/font/google";

const rubik = Rubik({ weight: "500", subsets: ["hebrew"] });

export const Header: FC = memo(() => {
  return (
    <k.header
      position="sticky"
      top={0}
      width="100%"
      height={64}
      p="8px 16px"
      borderBottom={["1px solid #dadde1", "initial"]}
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
          href="/"
          className={css({
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
          })}
        >
          <k.span className={rubik.className} color="black" fontSize={24}>
            Kuma UI
          </k.span>
        </Link>
      </k.div>
    </k.header>
  );
});
