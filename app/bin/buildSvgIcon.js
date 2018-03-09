const _ = require('lodash')
const path = require('path')
const fs = require('mz/fs')

const svgFontTemplate = _.template(
  '<?xml version="1.0" standalone="no"?>\n' +
  '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n' +
  '<svg xmlns="http://www.w3.org/2000/svg">\n' +
  '<path d="${d}" />\n' +
  '</svg>')

module.exports = function(glyph = {}) {
  // console.log('——————开始构建——————')
  // console.log(svgFontTemplate(glyph))
  // console.log('——————结束构建——————')
  return (svgFontTemplate(glyph))
}