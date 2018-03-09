'use strict';

import {
  SET_ARTICLE_LIST,
  SET_ARTICLE_DETAIL,
  ADD_FONT,
  REDUCE_FONT,
  SET_FONT_LIST,
  SET_ALL_FONTS
} from './mutation-type'

const mutations = {
  [SET_ALL_FONTS] (state, allFonts) {
    state.allFonts = allFonts
  },
  [ADD_FONT] (state, font) {
    state.fontList.push(font)
  },
  [REDUCE_FONT] (state, index) {
    state.fontList.splice(index, 1)
  },
  [SET_FONT_LIST] (state, items) {
    state.fontList = items
  }
};
export default mutations
