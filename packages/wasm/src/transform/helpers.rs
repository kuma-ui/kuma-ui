use oxc_ast::ast::{self, *};
use oxc_ast::AstBuilder;
use oxc_span::{Atom, Span, SPAN};
use std::collections::HashMap;

/// Recursively extracts the identifier name from the given JSX member expression object.
fn extract_identifier_name<'a>(object: &'a JSXMemberExpressionObject<'a>) -> &'a str {
    match object {
        JSXMemberExpressionObject::Identifier(ident) => &ident.name,
        JSXMemberExpressionObject::MemberExpression(member_expr) => {
            extract_identifier_name(&member_expr.object)
        }
    }
}

/// Checks if the given JSX element opening name matches the given syntax alias.
pub fn matches_opening_element(name: &JSXElementName, box_alias: &str) -> bool {
    match name {
        JSXElementName::MemberExpression(member_expr) => {
            extract_identifier_name(&member_expr.object) == box_alias
        }
        _ => return false,
    }
}

/// Checks if the given JSX element closing name matches the given syntax alias.
pub fn matches_closing_element(name: &JSXElementName, box_alias: &str) -> bool {
    match name {
        JSXElementName::MemberExpression(member_expr) => {
            extract_identifier_name(&member_expr.object) == box_alias
        }
        _ => return false,
    }
}

/// Transforms the given JSX opening element by setting its name to 'Box' and prepending a specific 'as' attribute.
pub fn transform_opening_element_with_box<'a>(
    opening_element: &mut JSXOpeningElement<'a>,
    imports: &'a HashMap<String, String>,
    ast: &AstBuilder<'a>,
) {
    let box_local_name = imports.get("Box");

    if box_local_name.is_none() {
        return;
    }
    let box_local_name = box_local_name.unwrap().as_str();
    let jsx_identifier = JSXIdentifier {
        span: SPAN,
        name: Atom::from(box_local_name),
    };

    let box_identifier = ast.alloc(jsx_identifier);

    opening_element.name = JSXElementName::Identifier(box_identifier);

    if let JSXElementName::MemberExpression(member_exp) = &opening_element.name {
        if let JSXMemberExpressionObject::Identifier(ident) = &member_exp.object {
            let as_attribute = JSXAttribute {
                span: SPAN,
                name: JSXAttributeName::Identifier(ast.alloc(JSXIdentifier {
                    span: SPAN,
                    name: Atom::from("as"),
                })),
                value: None,
            };
            let attribute_item = JSXAttributeItem::Attribute(ast.alloc(as_attribute));

            opening_element.attributes.push(attribute_item);
        }
    }
}
