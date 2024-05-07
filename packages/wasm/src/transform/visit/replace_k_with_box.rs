use std::collections::HashMap;

use oxc_allocator::Allocator;
use oxc_ast::{
    ast::{
        BooleanLiteral, Expression, JSXAttribute, JSXAttributeItem, JSXAttributeName,
        JSXAttributeValue, JSXElement, JSXElementName, JSXExpression, JSXExpressionContainer,
        JSXIdentifier, JSXMemberExpressionObject, StringLiteral,
    },
    visit::walk_mut::walk_jsx_element_mut,
    AstBuilder, VisitMut,
};
use oxc_span::{Atom, SPAN};

pub struct ReplaceKWithBox<'a, 'b> {
    ast: AstBuilder<'a>,
    imports: &'b HashMap<String, String>,
}

impl<'a, 'b> ReplaceKWithBox<'a, 'b> {
    pub fn new(allocator: &'a Allocator, imports: &'b HashMap<String, String>) -> Self {
        Self {
            ast: AstBuilder::new(allocator),
            imports,
        }
    }
}

impl<'a, 'b> VisitMut<'a> for ReplaceKWithBox<'a, 'b> {
    /**
     * Processes the JSXElement nodes in the AST and replaces the `k` syntax from `@kuma-ui/core`
     * with corresponding `Box` component. This allows usage of the `k` syntax as a shorthand for creating
     * styled components, e.g. `<k.div>` is transformed to `<Box as="div">`.
     */
    fn visit_jsx_element(&mut self, elem: &mut JSXElement<'a>) {
        if let Some(k_alias) = self.imports.get("k") {
            if let Some(box_local_name) = self.imports.get("Box") {
                let mut attrs: Vec<JSXAttributeItem<'a>> = vec![];

                if let JSXElementName::MemberExpression(member_expr) = &elem.opening_element.name {
                    if let JSXMemberExpressionObject::Identifier(ident) = &member_expr.object {
                        if ident.name == k_alias {
                            let as_attr =
                                JSXAttributeItem::Attribute(self.ast.alloc(JSXAttribute {
                                    span: SPAN,
                                    name: JSXAttributeName::Identifier(self.ast.alloc(
                                        JSXIdentifier {
                                            span: SPAN,
                                            name: Atom::from("as"),
                                        },
                                    )),
                                    value: Some(JSXAttributeValue::StringLiteral(self.ast.alloc(
                                        StringLiteral {
                                            span: SPAN,
                                            value: member_expr.property.name.clone(),
                                        },
                                    ))),
                                }));

                            let is_kuma_default_attr =
                                JSXAttributeItem::Attribute(self.ast.alloc(JSXAttribute {
                                    span: SPAN,
                                    name: JSXAttributeName::Identifier(self.ast.alloc(
                                        JSXIdentifier {
                                            span: SPAN,
                                            name: Atom::from("IS_KUMA_DEFAULT"),
                                        },
                                    )),
                                    value: Some(JSXAttributeValue::ExpressionContainer(
                                        self.ast.alloc(JSXExpressionContainer {
                                            span: SPAN,
                                            expression: JSXExpression::Expression(
                                                Expression::BooleanLiteral(self.ast.alloc(
                                                    BooleanLiteral {
                                                        span: SPAN,
                                                        value: true,
                                                    },
                                                )),
                                            ),
                                        }),
                                    )),
                                }));

                            attrs.push(as_attr);
                            attrs.push(is_kuma_default_attr);
                        }
                    }
                }

                for attr in attrs {
                    elem.opening_element.attributes.push(attr);
                }

                elem.opening_element.name =
                    JSXElementName::Identifier(self.ast.alloc(JSXIdentifier {
                        span: SPAN,
                        name: self.ast.new_atom(box_local_name),
                    }));

                if let Some(closing_element) = &mut elem.closing_element {
                    closing_element.name =
                        JSXElementName::Identifier(self.ast.alloc(JSXIdentifier {
                            span: SPAN,
                            name: self.ast.new_atom(box_local_name),
                        }));
                }
            }
        }

        walk_jsx_element_mut(self, elem);
    }
}
