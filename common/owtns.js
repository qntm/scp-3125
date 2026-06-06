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
  const sl = str.length
  const kl = key.length

  let output = ''
  let si = 0
  let ki = 0
  while (si < sl) {
    let sc = str.charCodeAt(si)
    si++

    if (UPPER_START <= sc && sc < UPPER_END) {
      const kc = key.charCodeAt(ki)
      ki = (ki + 1) % kl

      sc = ((sc - UPPER_START) + (kc - UPPER_START)) % L + UPPER_START
    }

    if (LOWER_START <= sc && sc < LOWER_END) {
      const kc = key.charCodeAt(ki)
      ki = (ki + 1) % kl

      sc = ((sc - LOWER_START) + (kc - UPPER_START)) % L + LOWER_START
    }

    output += String.fromCharCode(sc)
  }

  return output
}

export const decrypt = str => transform(str, KEY_DECRYPT)
export const encrypt = str => transform(str, KEY_ENCRYPT)
