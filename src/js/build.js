'use strict'

const browserify = require('browserify')
const fs = require('fs')
const htmlMinifier = require('html-minifier')
const jsdom = require('jsdom')

const encodeNodeFactory = require('./encode-node-factory.js')
const owtns = require('./owtns.js')

// No synchronous browserify :-/
browserify('./src/js/scp-3125.js').bundle(function (err, buf) {
  if (err) {
    throw err
  }

  const wikidotCss = fs.readFileSync('./src/css/wikidot.css').toString()
  const scp3125Css = fs.readFileSync('./src/css/scp-3125.css').toString()
  const scp3125Js = buf.toString()

  const inputFileNames = fs.readdirSync('./src/html/scp-3125')
  inputFileNames.forEach(function (inputFileName) {
    const scp3125Html = fs.readFileSync('./src/html/scp-3125/' + inputFileName).toString()

    // Parse and extract everything inside the <body>...</body> tags
    const scp3125Jsdom = new jsdom.JSDOM(scp3125Html)
    const scp3125body = scp3125Jsdom.window.document.body

    // Encrypt part of the body!
    const encodeNode = encodeNodeFactory(scp3125Jsdom.window)
    const classifiedInfo = scp3125body.querySelector('.classified-info')
    classifiedInfo.parentNode.replaceChild(encodeNode(classifiedInfo, owtns.encrypt), classifiedInfo)

    // Potential bug if the input HTML has alphabetical characters in the gaps
    // because minification alters whitespace structure. TODO: move minification
    // step to BEFORE encryption step?

    try {
      fs.mkdirSync('./dist')
    } catch (error) {
      if (error.code !== 'EEXIST') {
        throw error
      }
    }

    try {
      fs.mkdirSync('./dist/html')
    } catch (error) {
      if (error.code !== 'EEXIST') {
        throw error
      }
    }

    try {
      fs.mkdirSync('./dist/wikidot')
    } catch (error) {
      if (error.code !== 'EEXIST') {
        throw error
      }
    }

    const templateHtml = fs.readFileSync('./src/html/template.html').toString()
    const templatedHtml = templateHtml
      .replace('###wikidotCss###', wikidotCss)
      .replace('###scp3125Css###', scp3125Css)
      .replace('###scp3125Js###', scp3125Js)
      .replace('###scp3125Body###', scp3125body.innerHTML)

    const outputHtmlName = './dist/html/' + inputFileName
    console.log('Writing out HTML file', outputHtmlName)
    fs.writeFileSync(outputHtmlName, templatedHtml)

    // Whereas this is the markup you should actually use on Wikidot
    const templateTxt = fs.readFileSync('./src/wikidot/template.txt').toString()
    const txt = templateTxt
      .replace('###templatedHtml###', htmlMinifier.minify(templatedHtml, {
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true
      }))

    const outputTxtName = './dist/wikidot/' + inputFileName
      .replace('.html', '.txt')
    console.log('Creating output Wikidot markup file', outputTxtName)
    fs.writeFileSync(outputTxtName, txt)
  })
  console.log('OK!')
})
