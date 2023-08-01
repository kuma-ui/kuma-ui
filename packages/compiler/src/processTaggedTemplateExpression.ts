import { Node, SyntaxKind, TaggedTemplateExpression } from "ts-morph";
import { sheet } from "@kuma-ui/sheet";

const parseCssTemplate = (cssTemplateLiteral: Node) => {
  if (Node.isNoSubstitutionTemplateLiteral(cssTemplateLiteral)) {
    const cssString = cssTemplateLiteral.getLiteralText();
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
    const cssTemplateLiteral = node.getTemplate();
    const className = parseCssTemplate(cssTemplateLiteral);
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
    const cssTemplateLiteral = node.getTemplate();
    const className = parseCssTemplate(cssTemplateLiteral);
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
