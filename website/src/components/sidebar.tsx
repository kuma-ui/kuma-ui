import React from "react";
import { k, css } from "@kuma-ui/core";
import Link from "next/link";

export const Sidebar: React.FC<{}> = React.memo(() => {
  return (
    <k.aside mt="1rem">
      <k.nav position="sticky" width="256px" top="calc(56px + 1rem)" left={0}>
        <k.ul style={{ listStyleType: "none" }}>
          <k.li mt="1rem">
            <Link
              href="/"
              className={listItem}
              style={{ color: "#2d7fbd", background: "#EDF7FF" }}
            >
              Introduction
            </Link>
          </k.li>
          <k.li mt="1rem">
            <Link
              href="/"
              className={listItem}
              //   style={{ color: "#2d7fbd", background: "#EDF7FF" }}
            >
              Getting Started
            </Link>
          </k.li>
          <k.li mt="1rem">
            <Link href="/" className={listItem}>
              API
            </Link>
          </k.li>
        </k.ul>
      </k.nav>
    </k.aside>
  );
});

const listItems = [
  {
    title: "Introduction",
    path: "/",
  },
  {
    title: "Getting Started",
    path: "getting-started",
  },
  {
    title: "API",
    path: "API",
  },
];

const listItem = css({
  display: "block",
  width: "80%",
  p: "8px 16px",
  textDecoration: "none",
  borderRadius: "0.375rem",
  fontSize: "16px",
  fontWeight: 600,
  color: "black",
  _hover: { bg: "#EDF7FF", color: "#2d7fbd" },
});
