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
  const ls = str.length
  const lk = key.length

  let output = ''
  let is = 0
  let ik = 0
  while (is < ls) {
    let cs = str.charCodeAt(is)
    is++

    if (UPPER_START <= cs && cs < UPPER_END) {
      const ck = key.charCodeAt(ik)
      ik = (ik + 1) % lk

      cs = ((cs - UPPER_START) + (ck - UPPER_START)) % L + UPPER_START
    }

    if (LOWER_START <= cs && cs < LOWER_END) {
      const ck = key.charCodeAt(ik)
      ik = (ik + 1) % lk

      cs = ((cs - LOWER_START) + (ck - UPPER_START)) % L + LOWER_START
    }

    output += String.fromCharCode(cs)
  }

  return output
}

const decrypt = str => transform(str, KEY_DECRYPT)
const encrypt = str => transform(str, KEY_ENCRYPT)

module.exports.encrypt = encrypt
module.exports.decrypt = decrypt
