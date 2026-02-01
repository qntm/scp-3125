/**
  Basic cyclic character substitution thing for very weakly
  "encrypting" messages. Fractionally harder to break than
  ROT-13.
*/

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'
const KEY = 'owtnsfvlnqyfzbdercgqiuapucjekhamblshwoxpgzyrttxkmi'

const transform = function (backward, str) {
  const sum = function (letter1, letter2) {
    const index1 = ALPHABET.indexOf(letter1)
    const index2 = ALPHABET.indexOf(letter2)
    return ALPHABET.charAt((index1 + (backward ? ALPHABET.length - index2 : index2)) % ALPHABET.length)
  }

  return str.split('').map(function (strCh, i) {
    const keyCh = KEY.charAt(i % KEY.length)
    if (ALPHABET.indexOf(strCh) !== -1) {
      return sum(strCh, keyCh, backward)
    }

    if (ALPHABET.indexOf(strCh.toLowerCase()) !== -1) {
      return sum(strCh.toLowerCase(), keyCh, backward).toUpperCase()
    }

    return strCh
  }).join('')
}

const encrypt = function (str) {
  return transform(false, encodeURIComponent(str))
}

const decrypt = function (str) {
  return decodeURIComponent(transform(true, str))
}

module.exports.encrypt = encrypt
module.exports.decrypt = decrypt
