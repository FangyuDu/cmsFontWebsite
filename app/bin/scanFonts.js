/* 
  流程
  1. 处理svg内容 fromate svg
  2. 解析svg 内容
  3. 构建 svg 字体对象
*/

const SvgFormate = require('./svg_formate')
const fs = require('mz/fs')
const Path = require('path')
const buildSvgFont = require('./buildSvgFont')
const glob = require('glob').sync
const makeFont = require('./makeFont')
const low = require('lowdb')
const dbFs = require('lowdb/adapters/FileSync')
const buildDemo = require('./buildDemo')

let fontDir = Path.join('./', 'fonts')
// 初始化字体配置

const adapters = new dbFs(Path.join('./db', 'db.json'))
const db = low(adapters)

function dbInit(ctx) {
  console.log('-----------数据库开始初始化-----------')
  let data = {
    glyphs: []
  }
  db.defaults({
    users: [],
    fonts: []
  }).write()
  const db_fonts = db.get('fonts')
  
  glob('*/', {
    cwd: fontDir
  }).forEach(item => {
    glob('*.svg', {
      cwd:Path.join(fontDir, item)
    }).forEach(subitem => {
      let file = fs.readFileSync(Path.join(fontDir, item, subitem), 'utf8')
      let g = SvgFormate(file)
      g.class = item.replace(/[\/\\]$/, '')
      g.fileName = subitem.replace(/\.svg$/, '')
      data.glyphs.push(g)
      db_fonts.push(g).write()
    })
  })
  let svg = buildSvgFont(data)
  let ttf = makeFont(svg).buffer
  let css = new buildDemo(data).buildCss
  fs.writeFileSync(Path.join(ctx.app.baseDir, 'app/web/asset/css/cmsui-font.ttf'), ttf)
  fs.writeFileSync(Path.join(ctx.app.baseDir, 'app/web/asset/css/cmsui-font.css'), css)
}

module.exports = dbInit
