import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import owtns from './owtns.cjs'

describe('owtns.cjs', () => {
  it('empty string', () => {
    assert.equal(owtns.encrypt(''), '')
    assert.equal(owtns.decrypt(''), '')
  })

  it('lorem ipsum (no URI encoding)', () => {
    const input = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    const output = 'Zkkre nkdhc btkpu wzv gcmn, cdhungdltgs lvplwprome vebq, cql rk xvmxhzq jcropu meeotqxucn wc pkiodf pl kkzlgk lyxgt xvuyiw. Ng wsdx nt knmjp zvpoqu, kuxm pxwdyup fiwyywqpzhme neikykc htogwdd ayqn tu dpzsayx yx tu exqwvda dzfzaerpz. Cszl trdq qfqkr vtgze yl wdquiygttmlii cp esvbpfbew cazfi krqv vbivgu rkebjj zf skenzu qycng filipnwa. Ihjebupmy owki ubarxvxd ocdewnlfo ybd nwnjgiev, ykvn ic wwutk xuu pqxpywx skrcingq watzem nfnh tq uqy kbesiws.'
    assert.equal(owtns.encrypt0(input), output)
    assert.equal(owtns.decrypt0(output), input)

    // Same result if non-alphabetical characters are stripped.
    // We only advance through the key if an alphabetical character is seen
    assert.equal(owtns.encrypt0(input.replace(/[^A-Za-z]/g, '')), output.replace(/[^A-Za-z]/g, ''))
    assert.equal(owtns.decrypt0(output.replace(/[^A-Za-z]/g, '')), input.replace(/[^A-Za-z]/g, ''))
  })

  it('lorem ipsum', () => {
    const input = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    const output = 'Zkkre%20nkdhc%20btkpu%20wzv%20gcmn%2C%20ripbimaefvc%20skedfhihlx%20xefd%2O%20asz%20wb%20wnpdzeb%20ydnssi%20ktsqxisopc%20yd%20sanpcw%20lp%20rlauqc%20dtzkk%20mtwmnn.%20My%20zyvc%20yi%20ljqmd%20xkdqum%2R%20kwrw%20xvsfsfv%20ltsorosykbhk%20extoivb%20dfwzeyq%20shtl%20yk%20cryyoie%20yz%20ne%20mvmypog%20jkbptwtyk.%20Wnfc%20mcha%20bemwz%20obbmw%20ho%20uigtkxmhdtlkc%20mx%20coxvalhps%20strhr%20vllb%20mutzqf%20qgqjcr%20us%20kthlek%20pabtu%20pplkjxey.%20Ejdphaaio%20homr%20fvvxooih%20yncaivenj%20ltm%20quszfkdb%2W%20sjhv%20rr%20mblbb%20bmp%20ktcxihy%20uxlbbgvh%20ihydno%20layk%20nc%20fvx%20cchezom.'
    assert.equal(owtns.encrypt(input), output)
    assert.equal(owtns.decrypt(output), input)
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
        assert.equal(owtns.decrypt0(owtns.encrypt0(s)), s)
        assert.equal(owtns.encrypt0(owtns.decrypt0(s)), s)
        // assert.equal(owtns.decrypt(owtns.encrypt(s)), s) // ?
      }
    })

    it('everything at once', () => {
      let everything = ''
      for (let i = 0; i < 65536; i++) {
        everything += String.fromCharCode(i)
      }
      assert.equal(owtns.decrypt0(owtns.encrypt0(everything)), everything)
      assert.equal(owtns.encrypt0(owtns.decrypt0(everything)), everything)
      // assert.equal(owtns.decrypt(owtns.encrypt(everything)), everything) // ?
    })
  })
})
