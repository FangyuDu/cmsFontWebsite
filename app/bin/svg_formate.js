'use stric';

const fs = require('mz/fs')
const path = require('path')
const _ = require('lodash')
const svgpath = require('svgpath')
const svg_image_flatten = require('../lib/_svg_image_flatten');

function import_svg_image(data, code) {
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
    code: code.toString(16),
    charRef: code,
    d,
    width
  }
}

module.exports = import_svg_image