<template>
  <div class="container">
    <div class="left_sidebar"></div>
    <div class="right_step">
      <div class="step">
        <el-steps :active="active" align-center>
          <el-step title="选择数据"></el-step>
          <el-step title="特征选择"></el-step>
          <el-step title="方法选择" v-if="type==4"></el-step>
          <el-step title="结果展示"></el-step>
        </el-steps>
      </div>
      <div>datasetChoose</div>
    </div>
  </div>
</template>
<script>
/*数据集选择页面*/
export default {
  name: "datasetChoose",
  props: ['active','type'],
  data() {
    return {};
  },
  methods: {
      
  },
  mounted() {
  },
};
</script>
<style scoped>
.container {
  display: flex;
  width: 100%;
  height: 100%;
}
.left_sidebar {
  display: flex;
  width: 300px;
  height: 600px;
  border: black 1px solid;
}
.right_step {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.right_step .step {
  display: block;
  width: 100%;
}

</style>