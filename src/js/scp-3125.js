"use strict";

var encodeNodeFactory = require("./encode-node-factory.js");
var owtns = require("./owtns.js");

var encodeNode = encodeNodeFactory(window);

var magicNumber = [,,,,,].length;
var scpNumber = Math.pow(magicNumber, magicNumber);
var emptyReadout = "\u00A0"; // non-breaking space

var input = [];
var maxInputLength = magicNumber;

var busy = false;

window.press = function(keyText) {
  if(busy) {
    return;
  }

  var readout = document.body.querySelector(".keypad-readout");

  if(keyText === "GO") {
    busy = true;

    if(
      input.map(function(digit) {
        return parseInt(digit, 10);
      }).reduce(function(a, b) {
        return a * b;
      }, 1) === scpNumber
    ) {
      setTimeout(function() {
        readout.textContent = 'GRANTED';
      }, 0);
      setTimeout(function() {
        var node = document.querySelector(".classified-info");
        node.style.display = "initial";
        node.parentNode.replaceChild(encodeNode(node, owtns.decrypt), node);
      }, 1000);
      setTimeout(function() {
        readout.textContent = emptyReadout;
        // Leave busy, disabling keypad
      }, 2000);
    } else {
      setTimeout(function() {
        readout.textContent = 'DENIED';
      }, 0);
      setTimeout(function() {
        readout.textContent = '\u0C7F';
      }, 1900);
      setTimeout(function() {
        input = [];
        readout.textContent = emptyReadout;
        busy = false;
      }, 2000);
    }
  }

  else if(keyText === "CLR") {
    input = [];
  }

  else {
    if(input.length >= maxInputLength) {
      return;
    }
    input.push(keyText);
  }

  readout.textContent = input.length === 0 ? emptyReadout : input.map(function() {
    return '-';
  }).join("");
}

// Section visibility toggles
window.toggle = function(cls) {
  var collapsed = document.querySelectorAll("." + cls + ".collapsed");
  var expanded = document.querySelectorAll("." + cls + ":not(.collapsed)");
  var i;
  for(i = 0; i < collapsed.length; i++) {
    collapsed[i].classList.remove("collapsed");
  }
  for(i = 0; i < expanded.length; i++) {
    expanded[i].classList.add("collapsed");
  }
};
