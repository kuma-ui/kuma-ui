import React from "react";
import { Header, Sidebar } from "@src/components";
import { css, k } from "@kuma-ui/core";
import "./reset.css";
import { getAllDocPaths } from "@src/utils/mdx";
export const metadata = {
  title: "Kuma UI - Zero-Runtime CSS-in-JS with type-safe utility props",
  description:
    "Kuma UI is a utility-first, zero-runtime CSS-in-JS library that offers an outstanding developer experience and optimized performance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <k.div role="presentation" display={["none", "initial"]}>
          <k.div
            style={{
              background:
                "radial-gradient(circle at 75% 50%, hsl(186 70% 90%), rgba(255, 255, 255, 0) 25%), radial-gradient(circle at 60% 30%, hsl(200 70% 90%), rgba(255, 255, 255, 0) 10%)",
            }}
            position="fixed"
            inset="100px"
            zIndex="-1"
          />
        </k.div>
        <k.div
          display="grid"
          gridTemplateRows="auto 1fr auto"
          gridTemplateColumns="100%"
          minHeight="100vh"
        >
          <Header />
          <k.div className={flexRow} maxWidth="90rem" mx="auto" width="100%">
            <Sidebar />
            <main className={layout}>{children}</main>
          </k.div>
        </k.div>
      </body>
    </html>
  );
}

const flexRow = css({
  display: ["block", "flex"],
  flexDir: "row",
});

const layout = css({
  m: ["40px 20px", "0 auto 0 0"],
  width: ["initial", "746px"],
});
