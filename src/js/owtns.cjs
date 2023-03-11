/**
  Basic cyclic character substitution thing for very weakly
  "encrypting" messages. Fractionally harder to break than
  ROT-13.
*/

const alphabet = 'abcdefghijklmnopqrstuvwxyz'

const key = 'owtnsfvlnqyfzbdercgqiuapucjekhamblshwoxpgzyrttxkmi'
const transform = function (backward, str) {
  const sum = function (letter1, letter2) {
    const index1 = alphabet.indexOf(letter1)
    const index2 = alphabet.indexOf(letter2)
    return alphabet.charAt((index1 + (backward ? alphabet.length - index2 : index2)) % alphabet.length)
  }

  return str.split('').map(function (strCh, i) {
    const keyCh = key.charAt(i % key.length)
    if (alphabet.indexOf(strCh) !== -1) {
      return sum(strCh, keyCh, backward)
    }

    if (alphabet.indexOf(strCh.toLowerCase()) !== -1) {
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
