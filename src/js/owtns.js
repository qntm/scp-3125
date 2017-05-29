/**
  Basic cyclic character substitution thing for very weakly
  "encrypting" messages. Fractionally harder to break than
  ROT-13.
*/

"use strict";

var alphabet = "abcdefghijklmnopqrstuvwxyz";

var key = "owtnsfvlnqyfzbdercgqiuapucjekhamblshwoxpgzyrttxkmi";
var transform = function(backward, str) {
  var sum = function(letter1, letter2) {
    var index1 = alphabet.indexOf(letter1);
    var index2 = alphabet.indexOf(letter2);
    return alphabet.charAt((index1 + (backward ? alphabet.length - index2 : index2)) % alphabet.length);
  };

  return str.split("").map(function(str_ch, i) {
    var key_ch = key.charAt(i % key.length);
    if(alphabet.indexOf(str_ch) !== -1) {
      return sum(str_ch, key_ch, backward);
    }

    if(alphabet.indexOf(str_ch.toLowerCase()) !== -1) {
      return sum(str_ch.toLowerCase(), key_ch, backward).toUpperCase();
    }

    return str_ch;
  }).join("");
};

var encrypt = transform.bind(undefined, false);
var decrypt = transform.bind(undefined, true);

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt
};
