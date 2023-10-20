import { Box } from "@kuma-ui/core";
import type { LayoutHandler } from "@sonikjs/react";

declare global {
  var __KUMA_CSS__: string; // inserted by vite plugin
}

const handler: LayoutHandler = ({ children, head }) => {
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
        <style dangerouslySetInnerHTML={{ __html: globalThis.__KUMA_CSS__ }} />
      </head>
      <body>
        <div className="wrapper">
          <header>
            <h1>
              <a href="/">Top</a>
            </h1>
          </header>
          {children}
          <Box color="red" fontWeight="bold" fontSize="24px" pt="16px">
            This is colored by Kuma UI
          </Box>
          <footer style={{ marginTop: "2rem" }}>
            <small>© 2023 your name</small>
          </footer>
        </div>
      </body>
    </html>
  );
};

export default handler;
