import Head from "next/head";
import Image from "next/image";
import { k } from "@kuma-ui/core";
import { Client, Header } from "@src/components";

export default function Home() {
  return (
    <div>
      <Header />
      <Client />
      <Client />
    </div>
  );
}
