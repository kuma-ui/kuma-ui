/// use this function to replace quotes and newlines in the source code for the sake of readability when testing
pub fn replace_quotes_and_newlines(source: &str) -> String {
    source.replace("\"", "'").replace(['\n', '\t'], "")
}
