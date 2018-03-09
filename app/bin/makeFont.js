const { Buffer } = require('buffer');

const svg2ttf = require('svg2ttf')

const reform = function (svg) {
  let ttf = svg2ttf(svg, {}).buffer
  return {
    buffer: new Buffer(ttf),
  }
}

module.exports = reform