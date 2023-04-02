"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateHash = generateHash;
/**
 * The createHash function is a utility function that generates a hash value for a given input string using the MurmurHash algorithm.
 */

function generateHash(str) {
  var m = 0x5bd1e995;
  var r = 24;
  var seed = 0x12345678;
  var len = str.length;
  var h = seed ^ len;
  for (var i = 0; i < len; i++) {
    var k = str.charCodeAt(i);
    k *= m;
    k ^= k >>> r;
    k *= m;
    h *= m;
    h ^= k;
  }
  h ^= h >>> 13;
  h *= m;
  h ^= h >>> 15;
  return (h >>> 0).toString(); // convert to unsigned 32-bit integer
}