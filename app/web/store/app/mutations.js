'use strict';

import {
  SET_ARTICLE_LIST,
  SET_ARTICLE_DETAIL,
  ADD_FONT,
  REDUCE_FONT,
  SET_FONT_LIST
} from './mutation-type'

const mutations = {
  [SET_ARTICLE_LIST] (state, items){
    state.articleList = items;
  },
  [ADD_FONT] (state, font) {
    state.fontList.push(font)
  },
  [REDUCE_FONT] (state, index) {
    state.fontList.splice(index, 1)
  },
  [SET_ARTICLE_DETAIL](state, data) {
    state.article = data;
  },
  [SET_FONT_LIST] (state, items) {
    state.fontList = items
  }
};
export default mutations
