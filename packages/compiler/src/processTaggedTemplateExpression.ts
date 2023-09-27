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
  // styled("xxx")`` or styled(AnotherComponent)``
  else if (
    Node.isCallExpression(tag) &&
    tag.getExpressionIfKind(SyntaxKind.Identifier)?.getText() ===
      bindings["styled"]
  ) {
    const componentArg = tag.getArguments()[0];
    if (Node.isStringLiteral(componentArg)) {
      const componentName = componentArg.getLiteralText();
      replaceTaggedTemplate(node, getBoxComponent(componentName, bindings));
    } else {
      replaceTaggedTemplate(node, componentArg.getFullText());
    }
  }

  // styled.xxx``
  else if (
    Node.isPropertyAccessExpression(tag) &&
    tag.getExpressionIfKind(SyntaxKind.Identifier)?.getText() ===
      bindings["styled"]
  ) {
    replaceTaggedTemplate(node, getBoxComponent(tag.getName(), bindings));
  }
};

function getBoxComponent(
  intrinsicComponentName: string,
  bindings: Record<string, string>
) {
  return `${bindings["Box"]} as="${intrinsicComponentName}"`;
}

function replaceTaggedTemplate(
  node: TaggedTemplateExpression,
  component: string
) {
  const className = extractClassName(node.getTemplate());
  if (className) {
    const replacement = `props => {
      const combinedClassName = [props.className, "${className}"].filter(Boolean).join(" ");
      return <${component} {...props} className={combinedClassName} IS_KUMA_DEFAULT />;
    }`;
    node.replaceWithText(replacement);
  }
}
