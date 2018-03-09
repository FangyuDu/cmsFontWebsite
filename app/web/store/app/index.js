'use strict';
import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex);

const state = {
  fontList: [], // 已选
  allFonts: [] // 所有
};

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
});