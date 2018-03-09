const crypto = require('crypto')
const JSZip = require('jszip')
const path = require('path')
const _ = require('lodash')
const SvgPath = require('svgpath')
const fs = require('fs')

const buildSvgFont = require('./buildSvgFont')
const makeFont = require('./makeFont')
const buildDemo = require('./buildDemo')

function getFontId() {
  let hash = crypto.createHash('md5')
  hash.update(new Date().getTime().toString())
  return hash.digest('hex').substr(0, 8)
}

module.exports = function (data, ctx) {
  const zip = new JSZip()
  let id = getFontId()
  // 任务配置
  let task = {
    id: id,
    folder: `cmsui-font-${id}`,
    html: 'index.html',
    css: 'font.css',
    ttf: 'cmsui-font.ttf',
    svg: 'cmsui-font.svg'
  }
  // 待压缩的文件
  let folder = zip.folder(task.folder)
  let fontDir = zip.folder(path.join(task.folder, 'font'))
  let demoDir = zip.folder(path.join(task.folder, 'demo'))
  let svgFont = buildSvgFont(data)
  let ttfFont = makeFont(svgFont)
  let demo = buildDemo(data)
  let demoHtml = demo.buildHtml
  let demoCss = demo.buildCss
  // 基础配置文件
  folder.file('config.json', JSON.stringify(task, null, 2))
  fontDir.file(task.svg, svgFont)
  fontDir.file(task.ttf, ttfFont.buffer)
  demoDir.file(task.html, demoHtml)
  demoDir.file(task.css, demoCss)
  // zip.generateAsync
  return {
    taskInfo: task,
    build: zip.generateAsync({type: 'nodebuffer', compression: 'DEFLATE'})
  }
}