import { Box, StyleRegistry, createStyleRegistry } from "@kuma-ui/core";
import type { LayoutHandler } from "@sonikjs/react";
import { renderToString } from "react-dom/server";

declare const __KUMA_CSS__: string; // inserted by vite plugin

const handler: LayoutHandler = ({ children, head }) => {
  const body = (
    <body>
      <div className="wrapper">
        <header>
          <h1>
            <a href="/">Top</a>
          </h1>
        </header>
        <Box color="green" fontWeight="bold" fontSize="24px" py="16px">
          This is colored by Kuma UI
        </Box>
        {children}
        <footer style={{ marginTop: "2rem" }}>
          <small>© 2023 your name</small>
        </footer>
      </div>
    </body>
  );

  const registry = createStyleRegistry();
  renderToString(<StyleRegistry registry={registry}>{body}</StyleRegistry>); // Render here to determine the initial CSS.
  const runtimeCss = registry.styles();
  registry.flush();

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {import.meta.env.PROD ? (
          <>
            <link href="/static/style.css" rel="stylesheet" />
            <script type="module" src="/static/client.js"></script>
          </>
        ) : (
          <>
            <link href="/app/style.css" rel="stylesheet" />
            <script type="module" src="/app/client.ts"></script>
          </>
        )}
        {head.createTags()}
        <style dangerouslySetInnerHTML={{ __html: __KUMA_CSS__ }} />
        {runtimeCss}
      </head>
      {body}
    </html>
  );
};

export default handler;
