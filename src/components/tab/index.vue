<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="数据管理" name="first">
<!--    这里继续写数据管理内容 这个东西应该都是一样的-->
      <h3>halo</h3>
    </el-tab-pane>
    <el-tab-pane label="模型管理" name="second">
<!--    同上-->
      <h3>halo2</h3>
    </el-tab-pane>
    <el-tab-pane label="多病种关联关系挖掘" name="third">
<!--    同上-->
      <h3>halo3</h3>
    </el-tab-pane>
    <el-tab-pane label="风险预测" name="fourth">
<!--      如果要改页面 就需要配多个模板-->
      <h3>halo4</h3>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first'
    };
  },
  methods: {
    handleClick(tab, event) {
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
