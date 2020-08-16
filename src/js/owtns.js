/**
  Basic cyclic character substitution thing for very weakly
  "encrypting" messages. Fractionally harder to break than
  ROT-13.
*/

'use strict'

var alphabet = 'abcdefghijklmnopqrstuvwxyz'

var key = 'owtnsfvlnqyfzbdercgqiuapucjekhamblshwoxpgzyrttxkmi'
var transform = function (backward, str) {
  var sum = function (letter1, letter2) {
    var index1 = alphabet.indexOf(letter1)
    var index2 = alphabet.indexOf(letter2)
    return alphabet.charAt((index1 + (backward ? alphabet.length - index2 : index2)) % alphabet.length)
  }

  return str.split('').map(function (strCh, i) {
    var keyCh = key.charAt(i % key.length)
    if (alphabet.indexOf(strCh) !== -1) {
      return sum(strCh, keyCh, backward)
    }

    if (alphabet.indexOf(strCh.toLowerCase()) !== -1) {
      return sum(strCh.toLowerCase(), keyCh, backward).toUpperCase()
    }

    return strCh
  }).join('')
}

var encrypt = function (str) {
  return transform(false, encodeURIComponent(str))
}

var decrypt = function (str) {
  return decodeURIComponent(transform(true, str))
}

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt
}
