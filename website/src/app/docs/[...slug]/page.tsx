// "use client";
import { getAllDocPaths, getMdxContent } from "@src/utils/mdx";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { Markdown } from "@src/components/markdown";

interface DocProps {
  params: {
    slug: string[];
  };
}

export async function generateMetadata({
  params,
}: DocProps): Promise<Metadata> {
  const page = await getMdxContent(params.slug[0]);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
  };
}

export default async function Documentation(props: DocProps) {
  const content = await getMdxContent(props.params.slug[0]);
  if (!content) redirect("/doc/introduction");
  const source = await serialize(content);

  return (
    <div>
      <div
        dangerouslySetInnerHTML={{ __html: content.contentHtml.toString() }}
      />
    </div>
  );
}
