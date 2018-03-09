/* 
  扫描 fonts 文件夹下的所有字体
  流程
  1. 处理svg内容 fromate svg
  2. 解析svg内容
  3. 构建svg字体对象
*/

const fs = require('mz/fs')
const Path = require('path')
const md5 = require('md5')
const glob = require('glob').sync
const low = require('lowdb')
const dbFs = require('lowdb/adapters/FileSync')
const buildSvgFont = require('./buildSvgFont')
const SvgFormate = require('./svg_formate')
const makeFont = require('./makeFont')
const buildDemo = require('./buildDemo')

let fontDir = Path.join('./', 'fonts')
// 初始化字体配置

const adapters = new dbFs(Path.join('./db', 'db.json'))
const db = low(adapters)

let lock = false
function lockScan() {
  lock = true
}
function unlockScan() {
  lock = false
}

/* 未进行异步优化，lock 可能暂时无效 */
function dbInit(ctx) {
  console.log('检测锁定状态', lock)
  if(lock) return {
    success: false,
    message: '扫描已锁定，请等待完成后进行操作!'
  }
  lockScan()
  console.log('-----------数据库开始初始化-----------')
  let start = 0xe601
  let data = {
    glyphs: []
  }
  db.defaults({
    users: [],
    fonts: []
  }).write()
  db.set('fonts', []).write()
  const db_fonts = db.get('fonts')
  let length = db.get('fonts').size().value()
  if (length !== 0) {
    console.error('数据异常', length)
  }
  glob('*/', {
    cwd: fontDir
  }).forEach(item => {
    console.log(`-----------开始扫描: ${item}-----------`)
    glob('*.svg', {
      cwd:Path.join(fontDir, item)
    }).forEach(subitem => {
      let file = fs.readFileSync(Path.join(fontDir, item, subitem), 'utf8')
      let g = SvgFormate(file, start++)
      g.class = item.replace(/[\/\\]$/, '')
      g.fileName = subitem.replace(/\.svg$/, '')
      g.md5 = md5(JSON.stringify(g))
      // console.log(db_fonts.find({md5: g.md5}).value())
      data.glyphs.push(g)
    })
  })
  // console.log(db_fonts.find({md5: '6d35e4b8f1aa0de950941a574ba3c9ad'}).value())
  db_fonts.push(...data.glyphs).write()
  let svg = buildSvgFont(data)
  let ttf = makeFont(svg).buffer
  let css = new buildDemo(data).buildCss
  fs.writeFileSync(Path.join(ctx.app.baseDir, 'app/web/asset/font/cmsui-font.ttf'), ttf)
  fs.writeFileSync(Path.join(ctx.app.baseDir, 'app/web/asset/css/cmsui-font.css'), css)
  unlockScan()
  console.log('锁定状态解除', lock)
  return {
    success: true,
    message: '扫描已完成，请回到首页重新查看。'
  }
}

module.exports = dbInit