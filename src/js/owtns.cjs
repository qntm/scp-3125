/**
  Basic cyclic character substitution thing for very weakly
  "encrypting" messages. Fractionally harder to break than
  ROT-13.
*/

const L = 26
const UPPER_START = 'A'.charCodeAt(0)
const LOWER_START = 'a'.charCodeAt(0)
const UPPER_END = UPPER_START + L
const LOWER_END = LOWER_START + L

const KEY_ENCRYPT = 'OWTNSFVLNQYFZBDERCGQIUAPUCJEKHAMBLSHWOXPGZYRTTXKMI'
const KEY_DECRYPT = 'MEHNIVFPNKCVBZXWJYUKSGALGYRWQTAOZPITEMDLUBCJHHDQOS'

const transform = (str, key) => {
  const l = str.length
  let output = ''
  for (let i = 0; i < l; i++) {
    let k = key.charCodeAt(i % key.length)
    k -= UPPER_START

    let c = str.charCodeAt(i)

    if (UPPER_START <= c && c < UPPER_END) {
      c -= UPPER_START
      c = (c + k) % L
      c += UPPER_START
    }

    if (LOWER_START <= c && c < LOWER_END) {
      c -= LOWER_START
      c = (c + k) % L
      c += LOWER_START
    }

    output += String.fromCharCode(c)
  }

  return output
}

const encrypt0 = str => transform(str, KEY_ENCRYPT)
const decrypt0 = str => transform(str, KEY_DECRYPT)

const encrypt = str => encrypt0(encodeURIComponent(str))
const decrypt = str => decodeURIComponent(decrypt0(str))

module.exports.encrypt0 = encrypt0
module.exports.decrypt0 = decrypt0

module.exports.encrypt = encrypt
module.exports.decrypt = decrypt
