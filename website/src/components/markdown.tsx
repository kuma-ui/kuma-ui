import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { styled, css } from "@kuma-ui/core";
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
        h2: ({ node, level, ...props }) => (
          <H2 {...props} className={rubik.className} />
        ),
        h3: ({ node, level, ...props }) => (
          <H3 {...props} className={rubik.className} />
        ),
        h4: ({ node, level, ...props }) => (
          <h4
            {...props}
            className={rubik.className + " " + css({ mt: "1rem" })}
          />
        ),
        p: ({ node, ...props }) => <P {...props} className={rubik.className} />,
        code: (props) => {
          return (
            <SyntaxHighlight
              language={props.className?.replace("language-", "") || "tsx"}
              children={props.children.toString()}
              inline={props.inline}
            />
          );
        },
        a: (props) => <Anchor {...props} />,
        pre: (props) => <pre className={css({ mt: "1.25rem" })} {...props} />,
        table: (props) => <Table {...props} />,
        thead: (props) => <Thead {...props} />,
        th: (props) => <Th {...props} />,
        td: (props) => <Td {...props} />,
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

const H3 = styled("h3")`
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  line-height: 1.2;
  font-weight: 600;
  font-size: 1.25rem;
  letter-spacing: -0.025em;
  scroll-margin-block: 6.875rem;
`;

const Anchor = styled("a")`
  color: #327eb9;
  text-decoration: none;
`;

const Table = styled("table")`
  margin: 1.2rem auto;
  width: auto;
  border-collapse: collapse;
  font-size: 0.95em;
  line-height: 1.5;
  word-break: normal;
  display: block;
  overflow: auto;
`;

const Thead = styled("thead")`
  display: table-header-group;
  vertical-align: middle;
  border-color: inherit;
`;

const Th = styled("th")`
  font-weight: 700;
  background: #edf2f7;
  padding: 0.5rem;
  border: 1px solid #cfdce6;
`;

const Td = styled("td")`
  padding: 0.5rem;
  border: 1px solid #cfdce6;
  background: #fff;
  width: 1%;
  white-space: break-spaces;
`;
