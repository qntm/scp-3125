/**
  Basic cyclic character substitution thing for very weakly
  "encrypting" messages. Fractionally harder to break than
  ROT-13.
*/

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'
const KEY = 'owtnsfvlnqyfzbdercgqiuapucjekhamblshwoxpgzyrttxkmi'

const transform = (backward, str) => {
  const sum = (letter1, letter2) => {
    const index1 = ALPHABET.indexOf(letter1)
    const index2 = ALPHABET.indexOf(letter2)
    return ALPHABET.charAt((index1 + (backward ? ALPHABET.length - index2 : index2)) % ALPHABET.length)
  }

  return str.split('').map((strCh, i) => {
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

const encrypt = str => transform(false, encodeURIComponent(str))
const decrypt = str => decodeURIComponent(transform(true, str))

module.exports.encrypt = encrypt
module.exports.decrypt = decrypt
