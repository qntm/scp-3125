import fs from 'node:fs'

import * as esbuild from 'esbuild'
import jsdom from 'jsdom'

import { encodeNode } from '../common/encode-node.js'
import * as owtns from '../common/owtns.js'

fs.rmSync('dist', { force: true, recursive: true })
fs.mkdirSync('./dist')
fs.mkdirSync('./dist/html')
fs.mkdirSync('./dist/wikidot')

const result = await esbuild.build({
  entryPoints: ['./src/scp-3125.js'],
  bundle: true,
  format: 'esm',
  write: false
})
const scp3125Js = Buffer.from(result.outputFiles[0].contents).toString()

const templateHtml = fs.readFileSync('./src/template.html', 'utf8')

const bodyFileNames = fs.readdirSync('./src/bodies')
bodyFileNames.forEach(bodyFileName => {
  const scp3125Body = fs.readFileSync('./src/bodies/' + bodyFileName, 'utf8')

  let templatedHtml = templateHtml
    .replace('###scp3125Js###', scp3125Js)
    .replace('###scp3125Body###', scp3125Body)

  // Encrypt part of the body!
  const scp3125Jsdom = new jsdom.JSDOM(templatedHtml)
  encodeNode(scp3125Jsdom.window.document.querySelector('.classified-info'), owtns.encrypt)
  templatedHtml = scp3125Jsdom.serialize()

  const outputHtmlName = './dist/html/' + bodyFileName
  console.log('Writing out HTML file', outputHtmlName)
  fs.writeFileSync(outputHtmlName, templatedHtml)

  // Whereas this is the markup you should actually use on Wikidot
  const templateTxt = fs.readFileSync('./src/template.wikidot', 'utf8')
  const txt = templateTxt.replace('###templatedHtml###', templatedHtml)

  const outputTxtName = './dist/wikidot/' + bodyFileName.replace('.html', '.txt')
  console.log('Creating output Wikidot markup file', outputTxtName)
  fs.writeFileSync(outputTxtName, txt)
})

console.log('OK!')
