"use client";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

type PromiseType<T> = T extends Promise<infer U> ? U : T;
export const Markdown = (source: PromiseType<ReturnType<typeof serialize>>) => {
  // return <MDXRemote {...source}  />;
  console.log(source);
  return <div>{JSON.stringify(source)}</div>;
};
