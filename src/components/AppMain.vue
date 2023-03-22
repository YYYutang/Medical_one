<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
<!--      <keep-alive include="cloudPhoneManager">-->
      <router-view :key="key" />
<!--      </keep-alive>-->
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      console.log(this.$route.path)
      return this.$route.path
    }
  }
}
</script>

<style scoped>
/*.app-main {*/
/*  !*50 = navbar  *!*/
/*  height: calc(100vh - 60px);*/
/*  width: 100%;*/
/*  position: relative;*/
/*  overflow: hidden;*/
/*}*/
/*.app-main { !*84 = navbar + tags-view = 50 +34 *! height: calc(100vh - 84px); width: 100%; position: relative; overflow-y: scroll; }*/
.fixed-header+.app-main {
  padding-top: 60px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
