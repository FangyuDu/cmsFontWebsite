<template>
  <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>
</template>
<script type="text/babel">
  export default {
    computed: {

    },
    mounted(){

    }
  }
</script>
<style lang="scss">
@import '../../asset/css/global.css';
</style>
