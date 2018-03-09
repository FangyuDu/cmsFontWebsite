const fs = require('mz/fs')
const _ = require('lodash')
const Path = require('path')

let  tempHtml = _.template(fs.readFileSync('app/bin/template/index.html', 'utf8'))
let  tempCss = _.template(fs.readFileSync('app/bin/template/font.tpl', 'utf8'))

function build(data, dir) {
  return {
    buildHtml: tempHtml(data),
    buildCss: tempCss(data)
  }
  // fs.writeFile(Path.join(dir, 'index.html'), tempHtml(data))
  // fs.writeFile(Path.join(dir, 'font.css'), tempCss(data))
}

module.exports = build