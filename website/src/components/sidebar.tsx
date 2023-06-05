"use client";
import React from "react";
import { k, css } from "@kuma-ui/core";
import Link from "next/link";
import { headers } from "next/headers";
import { usePathname } from "next/navigation";

export const Sidebar: React.FC<{}> = React.memo(() => {
  const segment = getLastPathSegment(usePathname());
  return (
    <k.aside display={["none", "block"]}>
      <k.nav
        position="sticky"
        width="280px"
        top="calc(56px + 1rem)"
        left={0}
        pl="24px"
        pr="32px"
      >
        <k.ul style={{ listStyleType: "none" }}>
          {listItems.map((item) => {
            const focused =
              item.path.trim() === segment.trim()
                ? { color: "#2d7fbd", background: "#EDF7FF" }
                : undefined;
            return (
              <k.li mt="1rem" key={item.title}>
                <Link
                  href={`/docs/${item.path}`}
                  className={listItem}
                  style={{
                    ...focused,
                    transition: "color .25s, background .25s",
                  }}
                  aria-current={
                    item.path.trim() === segment.trim() ? "page" : undefined
                  }
                >
                  {item.title}
                </Link>
              </k.li>
            );
          })}
        </k.ul>
      </k.nav>
    </k.aside>
  );
});

function getLastPathSegment(urlString: string | null) {
  if (!urlString) return "";
  // const url = new URL(urlString);
  const pathSegments = urlString.split("/");
  return pathSegments[pathSegments.length - 1];
}

export const listItems = [
  {
    title: "Introduction",
    path: "introduction",
  },
  {
    title: "Getting Started",
    path: "getting-started",
  },
  {
    title: "API",
    path: "api",
  },
  {
    title: "Styled System",
    path: "styled-system",
  },
  {
    title: "Responsive Styles",
    path: "responsive-styles",
  },
  {
    title: "Benchmarks",
    path: "benchmarks",
  },
  {
    title: "Contributing",
    path: "contributing",
  },
  {
    title: "Roadmap",
    path: "roadmap",
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
