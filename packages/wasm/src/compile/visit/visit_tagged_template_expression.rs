use std::{
    borrow::{Borrow, BorrowMut},
    collections::HashMap,
};

use oxc_allocator::Allocator;
use oxc_ast::{
    ast::{Expression, Statement, TaggedTemplateExpression, TemplateElement, TemplateLiteral},
    visit::walk_mut::walk_program,
    AstBuilder, VisitMut,
};
use oxc_span::{Atom, SPAN};
use wasm_bindgen::prelude::*;

pub struct VisitTaggedTemplateExpression<'a, 'b> {
    ast: AstBuilder<'a>,
    imports: &'b mut HashMap<String, String>,
    css: Vec<String>,
}

impl<'a, 'b> VisitTaggedTemplateExpression<'a, 'b> {
    pub fn new(allocator: &'a Allocator, imports: &'b mut HashMap<String, String>) -> Self {
        Self {
            ast: AstBuilder::new(allocator),
            imports,
            css: Vec::new(),
        }
    }

    fn extract_class_name(&self, template_literal: &TemplateLiteral<'a>) -> Option<String> {
        if template_literal.quasis.len() == 1 && template_literal.expressions.is_empty() {
            let css_string_atom = &template_literal.quasis[0].value.cooked;
            let css_string = css_string_atom
                .clone()
                .as_mut()
                .map(|atom| atom.to_string())
                .unwrap_or_default();

            if !css_string.is_empty() {
                let class_name = SHEET.parse_css(css_string.borrow());
                Some(class_name.clone())
            } else {
                None
            }
        } else {
            None
        }
    }
}

impl<'a> VisitMut<'a> for VisitTaggedTemplateExpression<'a, '_> {
    /**
     * It checks if the tag matches css or styled from the provided bindings, extracts the CSS from the template literal, and then replaces the original template with either the generated class name (for css``...```) or a React component (for styled``...```).
     * The resulting React component uses React.forwardRef to ensure it can receive a ref, combining the original className prop with the generated CSS class.
     */
    fn visit_program(&mut self, program: &mut oxc_ast::ast::Program<'a>) {
        program.body.iter_mut().for_each(|node| {
            // e.g. className={css`color: red;`}
            if let Statement::ExpressionStatement(expr) = node {
                if let Expression::TaggedTemplateExpression(tagged_template_expr) =
                    &mut expr.expression
                {
                    if tagged_template_expr.tag.is_identifier_reference() {
                        let tag = tagged_template_expr.tag.get_identifier_reference().unwrap();
                        let tag_name = tag.name.to_string();
                        let css = self.imports.get("css");
                        if let Some(css) = css {
                            // check if the tag matches `css` imported from `@kuma-ui/core`
                            if &tag_name.to_string() == css {
                                let class_name =
                                    self.extract_class_name(&tagged_template_expr.quasi);
                                if let Some(c) = class_name {
                                    expr.expression = Expression::StringLiteral(
                                        self.ast.alloc_string_literal(SPAN, c),
                                    )
                                }
                            }
                        }
                    }
                }
            }
        });
    }
}

#[wasm_bindgen(module = "/index.cjs")]
extern "C" {
    #[wasm_bindgen(js_name = sheet)]
    static SHEET: Sheet;

    #[wasm_bindgen(method, js_name = addRule)]
    fn add_rule(this: &Sheet, style: JsValue, is_dynamic: Option<bool>) -> String;

    #[wasm_bindgen(method, js_name = parseCSS)]
    fn parse_css(this: &Sheet, style: &str) -> String;

    #[wasm_bindgen(method, js_name = getCSS)]
    fn get_css(this: &Sheet) -> String;

    #[wasm_bindgen(method, js_name = reset)]
    fn reset(this: &Sheet);
}

#[wasm_bindgen]
extern "C" {
    type Sheet;
}
