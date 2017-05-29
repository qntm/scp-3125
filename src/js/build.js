"use strict";

var browserify = require("browserify");
var fs = require("fs");
var jsdom = require("jsdom");

var encodeNodeFactory = require("./encode-node-factory.js");
var owtns = require("./owtns.js");

// No synchronous browserify :-/
browserify("./src/js/scp-3125.js").bundle(function(err, buf) {
  if(err) {
    throw err;
  }

  var wikidotCss = fs.readFileSync("./src/css/wikidot.css").toString();
  var scp3125Css = fs.readFileSync("./src/css/scp-3125.css").toString();
  var scp3125Js = buf.toString();

  var inputFileNames = fs.readdirSync("./src/html/scp-3125");
  inputFileNames.forEach(function(inputFileName) {
    var scp3125Html = fs.readFileSync("./src/html/scp-3125/" + inputFileName).toString();

    // Parse and extract everything inside the <body>...</body> tags
    var scp3125Jsdom = new jsdom.JSDOM(scp3125Html);
    var scp3125body = scp3125Jsdom.window.document.body;

    // Encrypt part of the body!
    var encodeNode = encodeNodeFactory(scp3125Jsdom.window);
    var classifiedInfo = scp3125body.querySelector(".classified-info");
    classifiedInfo.parentNode.replaceChild(encodeNode(classifiedInfo, owtns.encrypt), classifiedInfo);

    var templateHtml = fs.readFileSync("./src/html/template.html").toString();
    var templatedHtml = templateHtml
      .replace("###wikidotCss###", wikidotCss)
      .replace("###scp3125Css###", scp3125Css)
      .replace("###scp3125Js###", scp3125Js)
      .replace("###scp3125Body###", scp3125body.innerHTML);

    // Whereas this is the markup you should actually use on Wikidot
    var templateTxt = fs.readFileSync("./src/wikidot/template.txt").toString();
    var txt = templateTxt
      .replace("###templatedHtml###", templatedHtml);

    var outputFileName = inputFileName
      .replace(".html", ".txt");
    fs.writeFileSync("./dist/" + outputFileName, txt);
  });
});
