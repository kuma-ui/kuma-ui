import React from "react";
import { k, css } from "@kuma-ui/core";
import Link from "next/link";

export const Sidebar: React.FC<{}> = React.memo(() => {
  return (
    <k.aside>
      <k.nav position="sticky" width="256px" top={0} left={0}>
        <k.ul>
          <k.li mt="1rem">
            <Link
              href="/"
              className={css({
                p: "8px 16px",
                textDecoration: "none",
                color: "black",
                borderRadius: "0.375rem",
                fontSize: "16px",
                fontWeight: 600,
                _hover: {
                  bg: "#EDF7FF",
                  color: "#2d7fbd",
                },
              })}
            >
              Getting Started
            </Link>
          </k.li>
          <k.li mt="1rem">
            <Link
              href="/"
              className={css({
                p: "8px 16px",
                textDecoration: "none",
                color: "black",
                borderRadius: "0.375rem",
                fontSize: "16px",
                fontWeight: 600,
                _hover: {
                  bg: "#EDF7FF",
                  color: "#2d7fbd",
                },
              })}
            >
              API
            </Link>
          </k.li>
        </k.ul>
      </k.nav>
    </k.aside>
  );
});
