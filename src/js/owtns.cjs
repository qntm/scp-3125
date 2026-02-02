/**
  Basic cyclic character substitution thing for very weakly
  "encrypting" messages. Fractionally harder to break than
  ROT-13.
*/

const L = 26
const CHAR_CODE_UPPER_START = 'A'.charCodeAt(0)
const CHAR_CODE_LOWER_START = 'a'.charCodeAt(0)
const CHAR_CODE_UPPER_END = CHAR_CODE_UPPER_START + L
const CHAR_CODE_LOWER_END = CHAR_CODE_LOWER_START + L

const KEY = 'owtnsfvlnqyfzbdercgqiuapucjekhamblshwoxpgzyrttxkmi'
const l = KEY.length

const ksForward = Array(l)
const ksBackward = Array(l)
for (let i = 0; i < l; i++) {
  let k = KEY.charCodeAt(i)
  k -= CHAR_CODE_LOWER_START
  ksForward[i] = k
  ksBackward[i] = L - k
}

const transform = (backward, str) => {
  const ks = backward ? ksBackward : ksForward

  const l = str.length
  let output = ''
  for (let i = 0; i < l; i++) {
    const k = ks[i % KEY.length]
    let c = str.charCodeAt(i)

    if (CHAR_CODE_UPPER_START <= c && c < CHAR_CODE_UPPER_END) {
      c -= CHAR_CODE_UPPER_START
      c = (c + k) % L
      c += CHAR_CODE_UPPER_START
    }

    if (CHAR_CODE_LOWER_START <= c && c < CHAR_CODE_LOWER_END) {
      c -= CHAR_CODE_LOWER_START
      c = (c + k) % L
      c += CHAR_CODE_LOWER_START
    }

    output += String.fromCharCode(c)
  }

  return output
}

const encrypt0 = str => transform(false, str)
const decrypt0 = str => transform(true, str)

const encrypt = str => encrypt0(encodeURIComponent(str))
const decrypt = str => decodeURIComponent(decrypt0(str))

module.exports.encrypt0 = encrypt0
module.exports.decrypt0 = decrypt0

module.exports.encrypt = encrypt
module.exports.decrypt = decrypt
