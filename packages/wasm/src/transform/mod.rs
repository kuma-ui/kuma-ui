use oxc_allocator::Allocator;
use oxc_ast::ast::*;
use oxc_ast::AstBuilder;
use oxc_codegen::Codegen;
use oxc_span::{Atom, Span, SPAN};

use crate::js_to_program;

pub struct Transform<'a> {
    pub ast: AstBuilder<'a>,
}

impl<'a> Transform<'a> {
    pub fn new(allocator: &'a Allocator) -> Self {
        Self {
            ast: AstBuilder::new(allocator),
        }
    }

    pub fn transform(mut self, program: &'a mut Program<'a>) -> &'a mut Program<'a> {
        let program = self.ensure_react_import(program);
        program
    }

    pub fn ensure_react_import(mut self, program: &'a mut Program<'a>) -> &'a mut Program<'a> {
        let source_literal = StringLiteral {
            span: SPAN,
            value: Atom::from("react"),
        };

        let local = BindingIdentifier {
            span: SPAN,
            name: Atom::from("__KUMA_REACT__"),
            symbol_id: Default::default(),
        };

        let specifier = ImportDeclarationSpecifier::ImportDefaultSpecifier(
            self.ast.alloc(ImportDefaultSpecifier { span: SPAN, local }),
        );

        let specifiers = self.ast.new_vec_single(specifier);

        let import_declaration = ImportDeclaration {
            span: SPAN,
            specifiers: Some(specifiers),
            source: source_literal,
            with_clause: None,
            import_kind: ImportOrExportKind::Value,
        };

        let module_declaration =
            ModuleDeclaration::ImportDeclaration(self.ast.alloc(import_declaration));

        let import_statement = Statement::ModuleDeclaration(self.ast.alloc(module_declaration));

        program.body.insert(0, import_statement);
        program
    }
}

#[test]
fn test_ensure_react_import() {
    let allocator = Allocator::default();
    let souce_text = "".to_string();
    let program = js_to_program(&allocator, &souce_text);

    let transform = Transform::new(&allocator);
    let program = transform.ensure_react_import(program);

    let source = Codegen::<true>::new("", &souce_text, Default::default())
        .build(program)
        .source_text;
    assert_eq!(source, "import __KUMA_REACT__ from 'react';")
}
