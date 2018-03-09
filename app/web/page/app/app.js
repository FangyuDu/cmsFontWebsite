import { sync } from 'vuex-router-sync';
import store from 'store/app';
import router from 'component/app/router';
import app from './app.vue';
import App from 'app';
import Layout from 'component/layout/app';
import ElementUI from 'element-ui';
import axios from 'axios';
import Cookie from 'js-cookie';

App.use(ElementUI);
App.component(Layout.name, Layout);
import 'element-ui/lib/theme-chalk/index.css';
sync(store, router);
axios.defaults.headers.post['x-csrf-token'] = Cookie.get('csrfToken');

sync(store, router);
export default App.init({
  base: '/app',
  ...app,
  router,
  store
});
