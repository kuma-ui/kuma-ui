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
        a: ({ node, ...props }) => <Anchor {...props} />,
        pre: ({ node, ...props }) => (
          <pre className={css({ mt: "1.25rem" })} {...props} />
        ),
        table: ({ node, ...props }) => <Table children={props.children} />,
        thead: ({ node, ...props }) => <Thead children={props.children} />,
        th: ({ node, ...props }) => <Th children={props.children} />,
        td: ({ node, ...props }) => <Td children={props.children} />,
        ul: ({ node, ...props }) => <Ul children={props.children} />,
        li: ({ node, ...props }) => <Li children={props.children} />,
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

const Ul = styled("ul")`
  margin-top: 0.5rem;
  margin-left: 1.25rem;
  list-style-type: initial;
`;

const Li = styled("li")`
  font-size: 1.1rem;
  line-height: 1.7;
  padding-bottom: 12px;
`;
