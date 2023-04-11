<template>
<div>
<el-menu :default-active="this.$route.path" class="el-menu-demo" mode="horizontal"  @select="handleSelect" router>
  <el-menu-item index="/dataManage">数据管理</el-menu-item>
  <el-menu-item index="/modelManage">模型管理</el-menu-item>
  <el-menu-item index="/connectMining">多病种关联关系挖掘</el-menu-item>
  <el-menu-item index="/dangePredict">风险预测</el-menu-item>
</el-menu> 
  <el-main >
    <router-view/>
  </el-main>
  </div>
</template>

<script>
export default {

  data() {
    return {

    };
  },
  methods: {
    handleSelect(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style scoped>
/*::v-deep .el-tabs__item {*/
/*  padding-right: 40px;*/
/*  margin-right: 150px;*/
/*}*/


</style>
