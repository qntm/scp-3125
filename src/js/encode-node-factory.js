/**
  Routine which recursively encodes the text content of a DOM
  node, using the supplied `proc(string)` method. Returns a
  new `Node` object, does not harm the original.
*/

// Ugh, this is gross, but we need to support implementations
// of window coming either from the browser or from jsdom
export default function (windowImpl) {
  const document = windowImpl.document
  const Node = windowImpl.Node

  const encodeNode = function (node, proc) {
    let node2
    if (node.nodeType === Node.TEXT_NODE) {
      node2 = document.createTextNode(proc(node.nodeValue))
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      node2 = document.createElement(node.tagName)

      const attributes = node.attributes
      for (let i = 0; i < attributes.length; i++) {
        const attribute = attributes[i]
        node2.setAttribute(attribute.name, attribute.value)
      }

      const childNodes = node.childNodes
      for (let i = 0; i < childNodes.length; i++) {
        const childNode = childNodes[i]
        node2.appendChild(encodeNode(childNode, proc))
      }
    } else {
      node2 = node.cloneNode(true)
    }

    return node2
  }

  return encodeNode
}
