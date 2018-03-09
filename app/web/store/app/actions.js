'use strict';

import * as Type from './mutation-type';
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const host = ''; //http://127.0.0.1:7001

const actions = {
  toggleFont: ({commit, state}, font) => {
    let i = state.fontList.indexOf(font)
    if (i === -1) {
      commit(Type.ADD_FONT, font)
    } else {
      commit(Type.REDUCE_FONT, i)
    }
  },
  setFontList: ({commit, state}, fonts) => {
    commit(Type.SET_FONT_LIST, fonts)
  }
};

export default actions;


