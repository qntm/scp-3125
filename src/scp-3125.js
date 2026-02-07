import { encodeNode } from '../common/encode-node.js'
import * as owtns from '../common/owtns.js'

// eslint-disable-next-line no-sparse-arrays, comma-spacing
const MAGIC_NUMBER = [,,,,,].length
const SCP_NUMBER = Math.pow(MAGIC_NUMBER, MAGIC_NUMBER)
const EMPTY_READOUT = '\u00A0' // non-breaking space

const MAX_INPUT_LENGTH = MAGIC_NUMBER

const sleep = async t => {
  await new Promise(resolve => {
    setTimeout(resolve, t)
  })
}

let input = []
let busy = false
window.press = async keyText => {
  if (busy) {
    return
  }

  const readout = document.body.querySelector('.keypad-readout')

  if (keyText === 'GO') {
    if (input.reduce((acc, x) => acc * x, 1) === SCP_NUMBER) {
      // Correct code
      busy = true
      await sleep(0)
      readout.textContent = window.translations.grantedMessage
      await sleep(1000)

      // Decrypt remainder of file
      const node = document.querySelector('.classified-info')
      encodeNode(document.querySelector('.classified-info'), owtns.decrypt)
      node.classList.add('classified-info--declassified')

      await sleep(1000)
      readout.textContent = EMPTY_READOUT
      // Leave busy, disabling keypad
      return
    }

    // Incorrect code
    busy = true
    await sleep(0)
    readout.textContent = window.translations.deniedMessage
    await sleep(1900)
    readout.textContent = '\u0C35'
    await sleep(100)
    input = []
    readout.textContent = EMPTY_READOUT
    busy = false
    return
  }

  if (keyText === 'CLR') {
    input = []
    readout.textContent = EMPTY_READOUT
    return
  }

  // Numeric key

  if (input.length >= MAX_INPUT_LENGTH) {
    return
  }

  input.push(Number.parseInt(keyText, 10))
  readout.textContent = input.map(() => '-').join('')
}

// Section visibility toggles
window.toggle = cls => {
  const collapsed = document.querySelectorAll(`.${cls}.collapsed`)
  const expanded = document.querySelectorAll(`.${cls}:not(.collapsed)`)
  let i
  for (i = 0; i < collapsed.length; i++) {
    collapsed[i].classList.remove('collapsed')
  }
  for (i = 0; i < expanded.length; i++) {
    expanded[i].classList.add('collapsed')
  }
}

document.querySelector('.clr-button').appendChild(document.createTextNode(window.translations.clearButton))
document.querySelector('.go-button').appendChild(document.createTextNode(window.translations.goButton))
