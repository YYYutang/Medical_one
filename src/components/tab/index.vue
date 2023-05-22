<template>
<div>
<el-menu :default-active="this.$route.path" class="el-menu-demo" mode="horizontal"  @select="handleSelect" router>
  <el-menu-item index="/dataManage">数据管理</el-menu-item>
  <el-menu-item index="/modelManage">模型管理</el-menu-item>
  <el-menu-item index="/represent">疾病的特征性指标</el-menu-item>
  <el-menu-item index="/visualization">疾病画像</el-menu-item>
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
