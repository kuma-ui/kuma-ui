"use client";
import React, { type FC, memo, useState, useEffect } from "react";
import { css, k, styled } from "@kuma-ui/core";
import Link from "next/link";
import { Inter, Rubik } from "next/font/google";
import Image from "next/image";

const rubik = Rubik({ weight: "500", subsets: ["hebrew"] });

export const Header: FC = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 56);
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <k.header
      position="sticky"
      top="0px"
      width="100%"
      height={64}
      p="8px 16px"
      borderBottom={["1px solid #dadde1", "initial"]}
      zIndex="1"
      bg="white"
      className={
        isScrolled
          ? css({ boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" })
          : undefined
      }
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
          <k.img src="/kuma.png" alt="" width={40} height={40} />
          <k.span color="black" fontSize={[20, 24]} fontWeight={600}>
            Kuma UI
          </k.span>
        </Link>
        <k.div>
          <Link
            href="https://github.com/poteboy/kuma-ui"
            target="__blank"
            aria-label="Kuma UI GitHub"
          >
            <GitHubIcon />
          </Link>
        </k.div>
      </k.div>
    </k.header>
  );
});

const GitHubIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28px"
      height="28px"
      viewBox="0 0 24 24"
    >
      <title>Kuma UI GitHub</title>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
};
