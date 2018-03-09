'use stric';

const fs = require('mz/fs')
const path = require('path')
const _ = require('lodash')
const svgpath = require('svgpath')
const svg_image_flatten = require('../lib/_svg_image_flatten');

let start = 0xe601
function import_svg_image(data) {
  let res = svg_image_flatten(data)
  let scale = 1000 / res.height
  let d = new svgpath(res.d)
            .translate(-res.x, -306)
            .scale(scale, -scale)
            // .rotate(180)
            .abs()
            .round(0)
            .toString()
  let width = Math.round(res.width) * scale
  return {
    css: 'test',
    code: start.toString(16),
    charRef: start++,
    d,
    width
  }
}

// svgo.optimize(file)
//   .then(result => {
//     fs.writeFileSync('a.svg', result.data)
//     console.log(result)
//   })

module.exports = function (file) {
  return import_svg_image(file)
}