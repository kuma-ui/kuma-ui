import {
  Node,
  SyntaxKind,
  TaggedTemplateExpression,
  TemplateLiteral,
} from "ts-morph";
import { sheet } from "@kuma-ui/sheet";

const extractClassName = (templateLiteral: TemplateLiteral) => {
  if (Node.isNoSubstitutionTemplateLiteral(templateLiteral)) {
    const cssString = templateLiteral.getLiteralText();
    return cssString ? sheet.parseCSS(cssString) : undefined;
  }
  return undefined;
};

export const processTaggedTemplateExpression = (
  node: TaggedTemplateExpression,
  bindings: Record<string, string>
) => {
  const tag = node.getTag();
  // css``
  if (Node.isIdentifier(tag) && tag.getText() === bindings["css"]) {
    const className = extractClassName(node.getTemplate());
    if (className) {
      node.replaceWithText(JSON.stringify(className));
    }
  }
  // styled("xxx")``
  else if (
    Node.isCallExpression(tag) &&
    tag.getExpressionIfKind(SyntaxKind.Identifier)?.getText() ===
      bindings["styled"]
  ) {
    const className = extractClassName(node.getTemplate());
    if (className) {
      const componentArg = tag.getArguments()[0];
      const component = Node.isStringLiteral(componentArg)
        ? componentArg.getLiteralText()
        : "div";
      node.replaceWithText(`props => {
  const existingClassName = props.className || "";
  const newClassName = "${className || ""}";
  const combinedClassName = [existingClassName, newClassName].filter(Boolean).join(" ");
  return <${
    bindings["Box"]
  } as="${component}" {...props} className={combinedClassName} IS_KUMA_DEFAULT />;
}`);
    }
  }
};
