/**
  Basic cyclic character substitution thing for very weakly
  "encrypting" messages. Fractionally harder to break than
  ROT-13.
*/

const CHAR_CODE_UPPER_A = 'A'.charCodeAt(0)
const CHAR_CODE_LOWER_A = 'a'.charCodeAt(0)
const L = 26

const KEY = 'owtnsfvlnqyfzbdercgqiuapucjekhamblshwoxpgzyrttxkmi'

const transform = (backward, str) => {
  const l = str.length
  const output = new Uint16Array(l)
  for (let i = 0; i < l; i++) {
    const c = str.charCodeAt(i)
    const k = KEY.charCodeAt(i % KEY.length) - CHAR_CODE_LOWER_A

    if (CHAR_CODE_LOWER_A <= charCode && charCode < CHAR_CODE_LOWER_A + L) {
      const index1 = c - CHAR_CODE_LOWER_A
      const index3 = (backward ? (index1 - k + L) : (index1 + k)) % L
      output[i] = CHAR_CODE_LOWER_A + index3
      continue
    }

    if (CHAR_CODE_UPPER_A <= charCode && charCode < CHAR_CODE_UPPER_A + L) {
      const index1 = c - CHAR_CODE_UPPER_A
      const index3 = (backward ? (index1 - k + L) : (index1 + k)) % L
      output[i] = CHAR_CODE_UPPER_A + index3
      continue
    }

    output[i] = charCode
  }

  return new TextDecoder('utf-16').decode(output)
}

const encrypt0 = str => transform(false, str)
const decrypt0 = str => transform(true, str)

const encrypt = str => encrypt0(encodeURIComponent(str))
const decrypt = str => decodeURIComponent(decrypt0(str))

module.exports.encrypt0 = encrypt0
module.exports.decrypt0 = decrypt0

module.exports.encrypt = encrypt
module.exports.decrypt = decrypt
