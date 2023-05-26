import { getAllDocPaths, getMdContent } from "@src/utils/mdx";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { Markdown } from "@src/components";
import { css } from "@kuma-ui/core";

interface DocProps {
  params: {
    slug: string[];
  };
}

export async function generateMetadata({
  params,
}: DocProps): Promise<Metadata> {
  const page = await getMdContent(params.slug[0]);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
  };
}

export default async function Documentation(props: DocProps) {
  const content = await getMdContent(props.params.slug[0]);
  if (!content) redirect("/doc/introduction");

  return (
    <div
      className={css({
        maxWidth: "650px",
      })}
    >
      <Markdown source={content.contentHtml.toString()} />
    </div>
  );
}
