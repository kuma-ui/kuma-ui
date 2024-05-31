/**
 * The generateHash function is a utility function that generates a hash value for a given input string using the MurmurHash algorithm.
 */
pub fn generate_hash(str: &str) -> String {
    static M: u32 = 0x5bd1e995;
    static R: u32 = 24;
    static SEED: u32 = 0x12345678;
    let len = str.len();

    let mut h = SEED ^ len as u32;

    for i in 0..len {
        let k = str.as_bytes()[i] as u32;
        let mut k = k.wrapping_mul(M);
        k ^= k >> R;
        k = k.wrapping_mul(M);

        h = h.wrapping_mul(M);
        h ^= k;
    }

    h ^= h >> 13;
    h = h.wrapping_mul(M);
    h ^= h >> 15;
    h.to_string()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_generate_hash() {
        let input = "Hello, World!";
        let input2 = "Hello, World!";
        assert_eq!(generate_hash(input), generate_hash(input2));
        let input3 = "Hello, World";
        assert_ne!(generate_hash(input), generate_hash(input3));
    }
}
