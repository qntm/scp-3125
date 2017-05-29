/**
  Routine which recursively encodes the text content of a DOM
  node, using the supplied `proc(string)` method. Returns a
  new `Node` object, does not harm the original.
*/

"use strict";

// Ugh, this is gross, but we need to support implementations
// of window coming either from the browser or from jsdom
module.exports = function(windowImpl) {
  var document = windowImpl.document;
  var Node = windowImpl.Node;

  var encodeNode = function(node, proc) {
    var node2;
    if(node.nodeType === Node.TEXT_NODE) {
      node2 = document.createTextNode(proc(node.nodeValue));
    } else if(node.nodeType === Node.ELEMENT_NODE) {
      node2 = document.createElement(node.tagName);

      var attributes = node.attributes;
      for(var i = 0; i < attributes.length; i++) {
        var attribute = attributes[i];
        node2.setAttribute(attribute.name, attribute.value);
      }

      var childNodes = node.childNodes;
      for(var i = 0; i < childNodes.length; i++) {
        var childNode = childNodes[i];
        node2.appendChild(encodeNode(childNode, proc));
      }
    } else {
      node2 = node.cloneNode(true);
    }

    return node2;
  };

  return encodeNode;
};
