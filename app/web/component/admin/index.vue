<template lang="pug">
  .page-admin
    section.control-panel
      .container
        el-button(@click="scan") 扫描已有字体
    section
      .container
        p {{res}}
</template>
<script>
export default {
  data() {
    return {
      res: ''
    }
  },
  methods: {
    scan() {
      this.$http('/api/scanFonts').then(res => {
        console.log(res)
        this.res = res.data.message
      })    
    }
  }
}
</script>
<style lang="scss">
  .control-panel {
    background-color: #fcfcfc;
    padding: 10px 0;
  }
</style>
