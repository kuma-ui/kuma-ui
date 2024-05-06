use oxc_ast::ast::{self, *};
use oxc_ast::AstBuilder;
use oxc_span::{Atom, Span, SPAN};
use std::collections::HashMap;

pub fn create_kuma_default_attr<'a>(ast: &AstBuilder<'a>) -> JSXAttributeItem<'a> {
    let as_attr = JSXAttribute {
        span: SPAN,
        name: JSXAttributeName::Identifier(ast.alloc(JSXIdentifier {
            span: SPAN,
            name: Atom::from("IS_KUMA_DEFAULT"),
        })),
        value: Some(JSXAttributeValue::ExpressionContainer(ast.alloc(
            JSXExpressionContainer {
                span: SPAN,
                expression: JSXExpression::Expression(Expression::BooleanLiteral(ast.alloc(
                    BooleanLiteral {
                        span: SPAN,
                        value: true,
                    },
                ))),
            },
        ))),
    };
    JSXAttributeItem::Attribute(ast.alloc(as_attr))
}

pub fn create_as_attribute<'a>(ast: &AstBuilder<'a>, name: &'a str) -> JSXAttributeItem<'a> {
    let as_attr = JSXAttribute {
        span: SPAN,
        name: JSXAttributeName::Identifier(ast.alloc(JSXIdentifier {
            span: SPAN,
            name: Atom::from("as"),
        })),
        value: Some(JSXAttributeValue::StringLiteral(ast.alloc(StringLiteral {
            span: SPAN,
            value: Atom::from(name),
        }))),
    };
    JSXAttributeItem::Attribute(ast.alloc(as_attr))
}
