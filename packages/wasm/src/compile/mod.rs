use wasm_bindgen::prelude::*;

use oxc_allocator::Allocator;
use oxc_ast::ast::*;
use oxc_ast::AstBuilder;
use oxc_ast::Visit;
use oxc_ast::VisitMut;
use std::collections::HashMap;

mod visit;

use visit::visit_tagged_template_expression::VisitTaggedTemplateExpression;

pub struct Compile<'a> {
    pub allocator: &'a Allocator,
    pub ast: AstBuilder<'a>,
    pub imports: HashMap<String, String>,
}

impl<'a> Compile<'a> {
    pub fn new(allocator: &'a Allocator) -> Self {
        Self {
            allocator,
            ast: AstBuilder::new(allocator),
            imports: HashMap::new(),
        }
    }

    pub fn build(&mut self, program: &mut Program<'a>) {
        VisitTaggedTemplateExpression::new(self.allocator, &mut self.imports)
            .visit_program(program);
    }
}

#[wasm_bindgen(module = "/index.cjs")]
extern "C" {
    #[wasm_bindgen(js_name = isStyledProp)]
    fn is_styled_prop(prop: &str) -> bool;

    #[wasm_bindgen(js_name = isPseudoProps)]
    fn is_pseudo_props(prop: &str) -> bool;
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}
