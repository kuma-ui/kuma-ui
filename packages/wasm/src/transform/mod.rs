use oxc_allocator::Allocator;
use oxc_ast::ast::*;
use oxc_ast::AstBuilder;
use oxc_ast::Visit;
use oxc_ast::VisitMut;
use std::collections::HashMap;

mod visit;

use visit::{
    collect_import_bindings::CollectImportBindings, ensure_react_import::EnsureReactImport,
    import_box::ImportBox, replace_k_with_box::ReplaceKWithBox,
};

pub struct Transform<'a> {
    pub allocator: &'a Allocator,
    pub _ast: AstBuilder<'a>,
    pub imports: HashMap<String, String>,
}

impl<'a> Transform<'a> {
    pub fn new(allocator: &'a Allocator) -> Self {
        Self {
            allocator,
            _ast: AstBuilder::new(allocator),
            imports: HashMap::new(),
        }
    }

    pub fn get_imports(&self) -> &HashMap<String, String> {
        &self.imports
    }

    pub fn transform(&mut self, program: &mut Program<'a>) {
        EnsureReactImport::new(self.allocator).visit_program(program);
        CollectImportBindings::new(self.allocator, &mut self.imports).visit_program(program);
        ImportBox::new(self.allocator, &mut self.imports).visit_program(program);
        ReplaceKWithBox::new(self.allocator, &self.imports).visit_program(program);
    }
}
