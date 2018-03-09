<template lang="pug">
  div.page-selectIcon
    section.loading-fr(v-if="list.length === 0") 正在读取字体列表...
    section(v-else)
      .s-top 
        span.st-name 已选择
        el-button(type="text" @click.native="clearSelect") 清空选择
      el-row.font-list(:gutter="10")
        el-col(:span="3" v-for = "(v, index) in selectIcons" :key="'code-'+index")
          .font-item(@click="toggle(v)")
            i.fi-icon(:class="['cmsui-icon-'+v.code]")
            p.fi-name(:title="v.fileName") .cmsui-icon-{{v.code}}
    section.si-section(:class="{'is-mini': !c.show}" v-for="(c, index) in list" :title="c.name" :name="index")
      .s-top
        span.st-name(@click="toggleClassShow(c)") {{c.name}}
        el-button(type="text" :disabled="!c.show" @click.native="selectClassFonts(c)") 全选
        el-button(type="text" :disabled="!c.show" @click.native="clearClassFonts(c)") 清空
      el-row.font-list(:gutter="10" :class="{'is-hidden': !c.show}")
        el-col(:span="3" v-for = "(v, index) in c.list" :key="'code-'+index")
          .font-item(@click="toggle(v)" :class="{'is-select': v.isSelect}")
            i.fi-icon(:class="['cmsui-icon-'+v.code]")
            p.fi-name(:title="v.fileName") {{v.fileName}}
</template>
<script>
import _ from 'lodash'

export default {
  name: 'selectIcon',
  data() {
    return {
      list: [],
      selectIcons: []
    }
  },
  filters: {
    fontname(v) {
      return v.replace(/\.svg$/, '')
    }
  },
  methods: {
    loadFontlist() {
      this.$http('/api/getAllFonts')
        .then(res => {
          let tempArr = []
          _.forIn(res.data, (val, key) => {
            tempArr.push({
              name: key,
              show: true,
              list: val.map(item => {
                item.isSelect = false
                return item
              })
            })
          })
          this.$store.dispatch('setAllFonts', tempArr)
          this.list = tempArr
          // this.list = res.data
        })
    },
    toggle(font) {
      const {selectIcons} = this
      font.isSelect = !font.isSelect
      if (font.isSelect) {
        selectIcons.push(font)
      } else {
        let i = selectIcons.indexOf(font)
        selectIcons.splice(i, 1)
      }
      this.$store.dispatch('toggleFont', font)
    },
    clearSelect() {
      this.$store.dispatch('setFontList', [])
      this.selectIcons.forEach(item => {
        item.isSelect = false
      })
      this.selectIcons = []
    },
    selectClassFonts(c) {
      c.list.filter(item => !item.isSelect).forEach(item => {
        this.toggle(item)
      })
    },
    clearClassFonts(c) {
      c.list.filter(item => item.isSelect).forEach(item => {
        this.toggle(item)
      })
    },
    toggleClassShow(c) {
      c.show = !c.show
    }
  },
  mounted() {
    if(!this.isServer) this.loadFontlist()
  }
}
</script>
<style lang="scss" scoped>
.s-top {
  .st-name {
    font-size: 24px;
    line-height: 2;
    margin-right: 30px;
    cursor: pointer;
  }
}
.si-section {
  transition: all 1s linear;
  &.is-mini {
    .st-name {
      font-size: 18px;
      line-height: 1.5;
      color: #ccc;
    }
  }
}
.loading-fr {
  line-height: 50px;
}
.font-list {
  transition: all 1s linear;
  overflow: hidden;
  &.is-hidden {
    height: 0;
  }
}
.font-item {
  box-shadow: 1px 2px 3px #ddd;
  border: solid 1px #ddd;
  padding: 5px;
  line-height: 20px;
  margin-bottom: 10px;
  text-align: center;
  cursor: pointer;
  .fi-icon {
    font-size: 30px;
    line-height: 1.5;
  }
  .fi-name {
    font-size: 13px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  &.is-select {
    box-shadow: 1px 2px 3px #b92b57;
    border-color: #b92b57;
  }
}
</style>
