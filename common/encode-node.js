const TEXT_NODE = 3

export const encodeNode = (node, encode) => {
  if (node.nodeType === TEXT_NODE) {
    node.textContent = encode(node.textContent)
  }

  for (const childNode of node.childNodes) {
    encodeNode(childNode, encode)
  }
}
