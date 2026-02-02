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
    const output = 'Zkkre dafkk cposi yyb abyv, mvnefnllpio gcggblzszo aevl, drt in hmlusel ttgrxv pnojoakqbq as ctulbq sp qgqjcr kffod rnogcu. Ov ixpm bo tebfb ucebtj, yiel ftneekb dyhvtkzqbcoc wupktca wsikffh mgjb rd izejhau pk cf drqdqje wocmgzyka. Efaz orik ginkb pwzkk as crfpjgfqhvtoj cn pquyzaaff nlhwq krqv vfvxca wbdtmp us evjmrv dcflp rjvshtgs. Ltqbezdsi lfxf cyvnwhve ssuhedxrv dwh elqrhout, dmup fc bscit agq kysahdl tcxdsxrk setfii cwmw ip pka zxquqsd.'
    assert.equal(owtns.encrypt0(input), output)
    assert.equal(owtns.decrypt0(output), input)
  })

  it('lorem ipsum', () => {
    const input = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    const output = 'Zkkre%20vfqzl%20uqrez%20mkc%20ayfe%2Y%20inljxvqofcf%20sidavianmh%20gryb%2R%20wok%20og%20bxarkfw%20fmalhe%20tasgihexrk%20cn%20njfyye%20wa%20sukmix%20yiujt%20vwvgsf.%20Lv%20ynxg%20kk%20xauea%20ucebtj%2K%20dmnn%20ltruuyu%20mregwkcedpoz%20bhzxbin%20exlazwo%20sddv%20tu%20cryyoie%20ih%20fl%20qlbsnbf%20mavgajhsy.%20Bzht%20cajm%20ctdvo%20ezdvn%20om%20kbzdmvagqwwde%20nm%20mqrkxnaiy%20flluu%20agpt%20tbeiey%20wbdtmp%20jt%20wwmyin%20pdpvh%20asyeoqjx.%20Xumqxhane%20dvdr%20rgtcksin%20edtskafbe%20blc%20gkhfnqvh%2P%20dhdr%20lr%20scfpp%20uep%20zxmeqfp%20uxlbbgvh%20etgwvj%20bqmd%20qx%20gbx%20xbmgyqa.'
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

