import "@src/styles/globals.css";
import type { AppProps } from "next/app";
import type { AppContext, AppInitialProps, AppLayoutProps } from "next/app";
import type { ReactNode } from "react";

export default function App({ Component, pageProps }: AppLayoutProps) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
  return getLayout(<Component {...pageProps} />);
}
