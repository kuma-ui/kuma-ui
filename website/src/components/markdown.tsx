import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { styled } from "@kuma-ui/core";
import { Inter, Rubik } from "next/font/google";
import { SyntaxHighlight } from "./syntaxHighlight";
const rubik = Rubik({ preload: false });

// type PromiseType<T> = T extends Promise<infer U> ? U : T;
export const Markdown = ({ source }: { source: string }) => {
  return (
    <ReactMarkdown
      children={source}
      remarkPlugins={[remarkGfm]}
      components={{
        h2: (props) => <H2 {...props} className={rubik.className} />,
        p: (props) => <P {...props} className={rubik.className} />,
        code: (props) => {
          console.log(props);
          return (
            <SyntaxHighlight
              language={props.className?.replace("language-", "") || "tsx"}
              children={props.children.toString()}
              inline={props.inline}
            />
          );
        },
      }}
    />
  );
};

const P = styled("p")`
  font-size: 1.1rem;
  margin-top: 1.25rem;
  line-height: 1.7;
`;

const H2 = styled("h2")`
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  line-height: 1.3;
  font-weight: 600;
  font-size: 1.5rem;
  letter-spacing: -0.025em;
  scroll-margin-block: 6.875rem;
`;
