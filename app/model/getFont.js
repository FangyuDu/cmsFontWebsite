const Path = require('path')
const low = require('lowdb')
const dbFs = require('lowdb/adapters/FileSync')
const _ = require('lodash')


function getAllFonts(ctx) {
  const adapters = new dbFs(Path.join(ctx.app.baseDir, 'db/db.json'))
  const db = low(adapters)
  let allFonts = db.get('fonts').value()
  let res = _.groupBy(allFonts, item => item.class)
  return res
}

module.exports = {
  getAllFonts
}