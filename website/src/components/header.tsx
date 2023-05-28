"use client";
import React, {
  type FC,
  memo,
  useState,
  useEffect,
  CSSProperties,
  createRef,
} from "react";
import { css, k, styled } from "@kuma-ui/core";
import Link from "next/link";
import { Inter, Rubik } from "next/font/google";
import { createPortal } from "react-dom";
import { listItems } from "./sidebar";

const rubik = Rubik({ weight: "500", subsets: ["hebrew"] });

export const Header: FC = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 56);
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <React.Fragment>
      <k.header
        position="sticky"
        top="0px"
        width="100%"
        height={64}
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
          maxWidth="90rem"
          px="1.5rem"
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
            <k.img src="/kuma.png" alt="Kuma UI Logo" width={40} height={40} />
            <k.span color="black" fontSize={[20, 24]} fontWeight={600}>
              Kuma UI
            </k.span>
          </Link>
          <k.div display="flex" flexDir="row" gap={["16px", "32px"]}>
            <Link
              href="https://github.com/poteboy/kuma-ui/tree/main/example"
              target="__blank"
              className={css({
                display: ["none", "flex"],
                alignItems: "center",
                textDecoration: "none",
                flexDir: "row",
                gap: "4px",
              })}
            >
              <k.div
                color="black"
                fontWeight={600}
                transition='"color .25s"'
                _hover={{
                  color: "#2d7fbd",
                }}
              >
                Examples
              </k.div>
              <ArrowIcon />
            </Link>
            <Link
              href="https://github.com/poteboy/kuma-ui"
              target="__blank"
              aria-label="Kuma UI GitHub"
              className={css({
                display: "flex",
                alignItems: "center",
              })}
            >
              <GitHubIcon />
            </Link>
            <k.button
              display={["block", "none"]}
              bg="transparent"
              p="4px"
              style={{ border: "none" }}
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              aria-label="Menu Open"
            >
              <MenuIcon />
            </k.button>
          </k.div>
        </k.div>
      </k.header>
      <MobileSidebar
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </React.Fragment>
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

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 24 24"
    data-v-f3ed0000=""
    className={css({
      display: "inline-block",
      width: "12px",
      height: "12px",
    })}
    fill="#959595"
  >
    <title>Menu Open</title>
    <path d="M0 0h24v24H0V0z" fill="none"></path>
    <path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5H9z"></path>
  </svg>
);

const MenuIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 1024 1024"
    aria-hidden="true"
    focusable="false"
    height="1.25em"
    width="1.25em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path>
  </svg>
);

const MobileSidebar: React.FC<{
  open: boolean;
  onClose: () => void;
}> = memo(({ open, onClose }) => {
  useEffect(() => {
    const resize = () => {
      if (window.innerWidth >= 700) onClose();
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  return createPortal(
    <k.div
      style={{
        visibility: open ? "visible" : "hidden",
        zIndex: open ? 10 : -1,
        pointerEvents: open ? "auto" : "none",
      }}
      role="presentation"
      position="fixed"
      inset="0px"
      bg="rgba(0, 0, 0, 0.4)"
      display={["initial", "none"]}
      onClick={onClose}
    >
      <k.div
        position="absolute"
        role="dialog"
        width="70vw"
        height="100vh"
        bg="white"
        right="0px"
        transitionProperty="opacity,visibility,transform"
        aria-modal={true}
        transition="transform .6s cubic-bezier(0.215, 0.61, 0.355, 1)"
        style={{
          transform: open ? "none" : `translateX(100%)`,
        }}
        p="32px"
        onClick={(e) => e.stopPropagation()}
      >
        {open && (
          <nav>
            {listItems.map((item, index) => {
              const group = css({
                borderTop: "1px solid rgba(60, 60, 67, .12)",
                pt: "10px",
              });
              return (
                <div
                  className={index !== 0 ? group : undefined}
                  key={item.title}
                >
                  <k.div pb={10}>
                    <Link
                      href={`/docs/${item.path}`}
                      className={css({
                        py: 4,
                        textDecoration: "none",
                        color: "black",
                        fontWeight: 600,
                        display: "block",
                        width: "100%",
                      })}
                      onClick={(e) => onClose()}
                    >
                      {item.title}
                    </Link>
                  </k.div>
                </div>
              );
            })}
          </nav>
        )}
      </k.div>
    </k.div>,
    document.body
  );
});
