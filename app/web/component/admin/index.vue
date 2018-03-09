<template lang="pug">
  .page-admin
    .pa-header.container
      el-button(@click="test") 扫描已有字体
</template>
<script>
export default {
  methods: {
    test() {
      this.$http('/api/scanFonts').then(res => {
        console.log(res)
      })
    }
  }
}
</script>
