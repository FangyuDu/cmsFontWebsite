
module.exports = app => {
  /* 页面 */
  app.get('/', app.controller.app.index);
  /* 接口 */
  app.get('/api/scanFonts', app.controller.api.scanFonts)
  app.get('/api/getAllFonts', app.controller.api.getAllFonts)
  app.post('/api/downloadFonts', app.controller.api.zipFonts)
};
