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
    pub ast: AstBuilder<'a>,
    pub imports: HashMap<String, String>,
}

impl<'a> Transform<'a> {
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

    pub fn transform(&mut self, program: &mut Program<'a>) {
        EnsureReactImport::new(self.allocator).visit_program(program);
        CollectImportBindings::new(self.allocator, &mut self.imports).visit_program(program);
        ImportBox::new(self.allocator, &mut self.imports).visit_program(program);
        ReplaceKWithBox::new(self.allocator, &self.imports).visit_program(program);
    }
}

// #[cfg(test)]
// mod tests {
//     use oxc_allocator::Allocator;
//     use oxc_codegen::Codegen;

//     use crate::{js_to_program, transform::Transform};

//     #[test]
//     fn test_ensure_react_import() {
//         let allocator = Allocator::default();
//         let source_text = "".to_string();
//         let extension = "tsx".to_string();
//         let program = js_to_program(&allocator, &source_text, &extension);

//         let source = Codegen::<true>::new("", &source_text, Default::default())
//             .build(program)
//             .source_text;
//         assert_eq!(source, "import __KUMA_REACT__ from 'react';")
//     }

//     #[test]
//     fn test_collect_import_bindings() {
//         let allocator = Allocator::default();
//         let source_text =
//             "import { Button,  Box as KumaBox } from '@kuma-ui/core'; import { css } from '@kuma-ui/core'"
//                 .to_string();
//         let extension = "tsx".to_string();
//         let program = js_to_program(&allocator, &source_text, &extension);
//         let mut transform = Transform::new(&allocator);
//         transform.transform(program);
//         let imports = transform.get_imports();

//         assert_eq!(imports.get("Button"), Some(&"Button".to_string()));
//         assert_eq!(imports.get("Box"), Some(&"KumaBox".to_string()));
//         assert_eq!(imports.get("css"), Some(&"css".to_string()));
//     }

//     #[test]
//     fn test_import_box() {
//         let allocator = Allocator::default();
//         let source_text = "".to_string();
//         let extension = "tsx".to_string();
//         let program = js_to_program(&allocator, &source_text, &extension);
//         Transform::new(&allocator).import_box(program);

//         let source = Codegen::<true>::new("", &source_text, Default::default())
//             .build(program)
//             .source_text;
//         assert_eq!(source, "import {Box as __Box} from '@kuma-ui/core';");
//     }

//     #[test]
//     fn test_replace_k_with_box() {
//         let allocator = Allocator::default();
//         let source_text = "
//             import {k} from '@kuma-ui/core';
//             export const App = () => {
//                 return <k.div>Test</k.div>;
//             }
//         "
//         .to_string();
//         let extension = "tsx".to_string();
//         let program = js_to_program(&allocator, &source_text, &extension);
//         Transform::new(&allocator).import_box(program);

//         let source = Codegen::<true>::new("", &source_text, Default::default())
//             .build(program)
//             .source_text;
//         assert_eq!(source, "import {Box as __Box} from '@kuma-ui/core';");
//     }

//     #[test]
//     fn test_replace_k_with_box_in_jsx() {
//         let allocator = Allocator::default();
//         let source_text = "
//             import {k} from '@kuma-ui/core';
//             export const App = () => {
//                 return <k.div>hello</k.div>;
//             }
//         "
//         .to_string();
//         let extension = "tsx".to_string();
//         let program = js_to_program(&allocator, &source_text, &extension);
//         let mut transform = Transform::new(&allocator);
//         transform.transform(program);
//         let imports = transform.get_imports();

//         let source = Codegen::<true>::new("", &source_text, Default::default())
//             .build(program)
//             .source_text;
//         assert_eq!(source, "import {Box as __Box} from '@kuma-ui/core';import __KUMA_REACT__ from 'react';import {k} from '@kuma-ui/core';export const App=()=>{return <__Box as='div' IS_KUMA_DEFAULT={true}>hello</__Box>};");
//     }
// }
