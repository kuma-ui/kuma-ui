/**
 * The createHash function is a utility function that generates a hash value for a given input string using the MurmurHash algorithm.
 */
export function generateHash(str) {
    const m = 0x5bd1e995;
    const r = 24;
    const seed = 0x12345678;
    const len = str.length;
    let h = seed ^ len;
    for (let i = 0; i < len; i++) {
        let k = str.charCodeAt(i);
        k *= m;
        k ^= k >>> r;
        k *= m;
        h *= m;
        h ^= k;
    }
    h ^= h >>> 13;
    h *= m;
    h ^= h >>> 15;
    return h >>> 0; // convert to unsigned 32-bit integer
}
