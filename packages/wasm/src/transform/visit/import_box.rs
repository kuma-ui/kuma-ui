use std::collections::HashMap;

use oxc_allocator::Allocator;
use oxc_ast::{
    ast::{
        BindingIdentifier, IdentifierName, ImportDeclaration, ImportDeclarationSpecifier,
        ImportOrExportKind, ImportSpecifier, ModuleDeclaration, ModuleExportName, Program,
        Statement, StringLiteral,
    },
    visit::walk_mut::walk_program_mut,
    AstBuilder, VisitMut,
};
use oxc_span::{Atom, SPAN};

pub struct ImportBox<'a, 'b> {
    ast: AstBuilder<'a>,
    imports: &'b mut HashMap<String, String>,
}

impl<'a, 'b> ImportBox<'a, 'b> {
    pub fn new(allocator: &'a Allocator, imports: &'b mut HashMap<String, String>) -> Self {
        Self {
            ast: AstBuilder::new(allocator),
            imports,
        }
    }
}

impl<'a> VisitMut<'a> for ImportBox<'a, '_> {
    /**
     * If the `Box` component is not imported, this function will create a new import statement for the `Box` component
     * from `@kuma-ui/core` with the local name `__Box`.
     */
    fn visit_program(&mut self, program: &mut Program<'a>) {
        let has_box = self.imports.get("Box");

        if has_box.is_none() {
            let source_literal = StringLiteral {
                span: SPAN,
                value: Atom::from("@kuma-ui/core"),
            };

            let local = BindingIdentifier {
                span: SPAN,
                name: Atom::from("__Box"),
                symbol_id: Default::default(),
            };

            let identifier_name = IdentifierName {
                span: SPAN,
                name: Atom::from("Box"),
            };

            let imported = ModuleExportName::Identifier(identifier_name);

            let specifier =
                ImportDeclarationSpecifier::ImportSpecifier(self.ast.alloc(ImportSpecifier {
                    span: SPAN,
                    imported,
                    local,
                    import_kind: ImportOrExportKind::Value,
                }));

            let import_declaration = ImportDeclaration {
                span: SPAN,
                specifiers: Some(self.ast.new_vec_single(specifier)),
                source: source_literal,
                with_clause: None,
                import_kind: ImportOrExportKind::Value,
            };

            let module_declaration =
                ModuleDeclaration::ImportDeclaration(self.ast.alloc(import_declaration));

            let import_statement = Statement::ModuleDeclaration(self.ast.alloc(module_declaration));

            self.imports.insert("Box".to_string(), "__Box".to_string());

            program.body.insert(0, import_statement);
        }

        walk_program_mut(self, program)
    }
}
