use oxc_allocator::Allocator;
use oxc_ast::{
    ast::{
        BindingIdentifier, ImportDeclaration, ImportDeclarationSpecifier, ImportDefaultSpecifier,
        ImportOrExportKind, ModuleDeclaration, Program, Statement, StringLiteral,
    },
    visit::walk_mut::walk_program_mut,
    AstBuilder, VisitMut,
};
use oxc_span::{Atom, SPAN};

pub struct EnsureReactImport<'a> {
    ast: AstBuilder<'a>,
}

impl<'a> EnsureReactImport<'a> {
    pub fn new(allocator: &'a Allocator) -> Self {
        Self {
            ast: AstBuilder::new(allocator),
        }
    }
}

impl<'a> VisitMut<'a> for EnsureReactImport<'a> {
    /**
     * Ensures React is imported in the given program to satisfy JSX's Classic runtime requirement.
     * While React might already be imported, we can't determine the specifier name if a default import exists.
     * Thus, this function adds a separate React import declaration at the beginning of the program with a unique alias "__KUMA_REACT__".
     * This unique alias allows Kuma's compiler to safely refer to React (e.g., when using React.forwardRef to wrap styled components) without interfering with user-defined variable names.
     */
    fn visit_program(&mut self, program: &mut Program<'a>) {
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

        let import_statement = Statement::ModuleDeclaration(self.ast.alloc(
            ModuleDeclaration::ImportDeclaration(self.ast.alloc(import_declaration)),
        ));

        program.body.insert(0, import_statement);

        walk_program_mut(self, program);
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::js_source::JsSource;
    use oxc_allocator::Allocator;
    use oxc_codegen::Codegen;

    #[test]
    fn test_ensure_react_import() {
        let allocator = Allocator::default();
        let mut ensure_react_import = EnsureReactImport::new(&allocator);

        let source_text = "".to_string();
        let extension = "tsx".to_string();

        let program = JsSource::new(&source_text, extension).to_program(&allocator);

        ensure_react_import.visit_program(program);

        let source = Codegen::<true>::new("", &source_text, Default::default())
            .build(program)
            .source_text;
        assert_eq!(source, "import __KUMA_REACT__ from 'react';")
    }
}
