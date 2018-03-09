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
}

module.exports = build