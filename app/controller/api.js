const zlib = require('mz/zlib')
const mkdirp = require('mkdirp')
const fs = require('fs')
const path = require('path')
const JSZip = require('jszip')
const {getAllFonts} = require('../model/getFont')
const zipDemo = require('../bin/zipDemo')
const scanFonts = require('../bin/scanFonts')

exports.scanFonts = async ctx => {
  ctx.body = scanFonts(ctx)
}

// 获取所有图标
exports.getAllFonts = async ctx => {
  ctx.body = getAllFonts(ctx)

}
// 打包
exports.zipFonts = async ctx => {
  const {fontList} = ctx.request.body
  let data = {
    glyphs: fontList
  }
  let demo = new zipDemo(data, ctx)
  await demo.build
    .then(z => {
    ctx.attachment(`${demo.taskInfo.folder}.zip`)
    ctx.body = z
  })
}