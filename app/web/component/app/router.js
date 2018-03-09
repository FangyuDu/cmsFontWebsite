import Vue from 'vue';

import VueRouter from 'vue-router';

import Home from '../home/index.vue';
import Admin from '../admin/index.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      component: Home
    }, {
      path: '/admin',
      component: Admin
    }
  ]
});

export default router;
