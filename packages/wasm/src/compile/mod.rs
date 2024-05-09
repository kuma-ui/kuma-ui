use oxc_allocator::Allocator;
use oxc_ast::ast::*;
use oxc_ast::AstBuilder;
use std::collections::HashMap;

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

    pub fn get_imports(&self) -> &HashMap<String, String> {
        &self.imports
    }

    pub fn compile(&mut self, program: &mut Program<'a>) {}
}
