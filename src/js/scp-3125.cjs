const encodeNodeFactory = require('../../common/encode-node-factory.cjs')
const owtns = require('../../common/owtns.cjs')

const encodeNode = encodeNodeFactory(window)

// eslint-disable-next-line no-sparse-arrays
const magicNumber = [
  ,
  ,
  ,
  ,,
].length
const scpNumber = Math.pow(magicNumber, magicNumber)
const emptyReadout = '\u00A0' // non-breaking space

let input = []
const maxInputLength = magicNumber

let busy = false

window.press = keyText => {
  if (busy) {
    return
  }

  const readout = document.body.querySelector('.keypad-readout')

  if (keyText === 'GO') {
    busy = true

    if (
      input.map(digit => {
        return parseInt(digit, 10)
      }).reduce((a, b) => {
        return a * b
      }, 1) === scpNumber
    ) {
      setTimeout(() => {
        readout.textContent = window.translations.grantedMessage
      }, 0)
      setTimeout(() => {
        const node = document.querySelector('.classified-info')

        // This used to say "initial", which didn't work in IE
        // (issue #1)
        node.style.display = 'block'

        node.parentNode.replaceChild(encodeNode(node, owtns.decrypt), node)
      }, 1000)
      setTimeout(() => {
        readout.textContent = emptyReadout
        // Leave busy, disabling keypad
      }, 2000)
    } else {
      setTimeout(() => {
        readout.textContent = window.translations.deniedMessage
      }, 0)
      setTimeout(() => {
        readout.textContent = '\u0C35'
      }, 1900)
      setTimeout(() => {
        input = []
        readout.textContent = emptyReadout
        busy = false
      }, 2000)
    }
  } else if (keyText === 'CLR') {
    input = []
  } else {
    if (input.length >= maxInputLength) {
      return
    }
    input.push(keyText)
  }

  readout.textContent = input.length === 0
    ? emptyReadout
    : input.map(() => '-').join('')
}

// Section visibility toggles
window.toggle = cls => {
  const collapsed = document.querySelectorAll('.' + cls + '.collapsed')
  const expanded = document.querySelectorAll('.' + cls + ':not(.collapsed)')
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
