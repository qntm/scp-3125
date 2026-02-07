import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import * as owtns from './owtns.js'

describe('owtns.cjs', () => {
  it('empty string', () => {
    assert.equal(owtns.encrypt(''), '')
    assert.equal(owtns.decrypt(''), '')
  })

  it('lorem ipsum', () => {
    const input = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    const output = 'Zkkre nkdhc btkpu wzv gcmn, cdhungdltgs lvplwprome vebq, cql rk xvmxhzq jcropu meeotqxucn wc pkiodf pl kkzlgk lyxgt xvuyiw. Ng wsdx nt knmjp zvpoqu, kuxm pxwdyup fiwyywqpzhme neikykc htogwdd ayqn tu dpzsayx yx tu exqwvda dzfzaerpz. Cszl trdq qfqkr vtgze yl wdquiygttmlii cp esvbpfbew cazfi krqv vbivgu rkebjj zf skenzu qycng filipnwa. Ihjebupmy owki ubarxvxd ocdewnlfo ybd nwnjgiev, ykvn ic wwutk xuu pqxpywx skrcingq watzem nfnh tq uqy kbesiws.'
    assert.equal(owtns.encrypt(input), output)
    assert.equal(owtns.decrypt(output), input)

    // Same result if non-alphabetical characters are stripped.
    // We only advance through the key if an alphabetical character is seen
    assert.equal(owtns.encrypt(input.replace(/[^A-Za-z]/g, '')), output.replace(/[^A-Za-z]/g, ''))
    assert.equal(owtns.decrypt(output.replace(/[^A-Za-z]/g, '')), input.replace(/[^A-Za-z]/g, ''))
  })

  describe('loops', () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'
    alphabet.split('').forEach(letter => {
      it(letter, () => {
        const text = letter.repeat(1000)
        assert.equal(owtns.decrypt(owtns.encrypt(text)), text)
      })
    })
    alphabet.toUpperCase().split('').forEach(letter => {
      it(letter, () => {
        const text = letter.repeat(1000)
        assert.equal(owtns.decrypt(owtns.encrypt(text)), text)
      })
    })

    it('everything', () => {
      for (let i = 0; i < 65536; i++) {
        const s = String.fromCharCode(i)
        assert.equal(owtns.decrypt(owtns.encrypt(s)), s)
        assert.equal(owtns.encrypt(owtns.decrypt(s)), s)
      }
    })

    it('everything at once', () => {
      let everything = ''
      for (let i = 0; i < 65536; i++) {
        everything += String.fromCharCode(i)
      }
      assert.equal(owtns.decrypt(owtns.encrypt(everything)), everything)
      assert.equal(owtns.encrypt(owtns.decrypt(everything)), everything)
    })
  })

  it('loops after 26 applications', () => {
    // Applying the encoding repeatedly to a given letter moves it forward by 0 to 25 letters.
    // This can loop after the following number of applications: A = 1, N = 2, BDFHJLPRTVXZ = 13, CEGIKMOQSUWY = 26
    let text = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
    for (let i = 0; i < 26; i++) {
      console.log(text)
      text = owtns.encrypt(text)
    }
    assert.equal(text, 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
  })
})
