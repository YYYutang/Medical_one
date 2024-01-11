<template>
  <div>
    <el-header>
      <div class="tabs">
        <el-tabs type="border-card">
          <el-tab-pane label="描述性分析"><describeAnalyze></describeAnalyze></el-tab-pane>
          <el-tab-pane label="单因素分析">单因素分析</el-tab-pane>
          <el-tab-pane label="ROC曲线">ROC曲线</el-tab-pane>
          <el-tab-pane label="一致性验证">一致性验证</el-tab-pane>
          <el-tab-pane label="显著性分析">显著性分析</el-tab-pane>
        </el-tabs>
      </div>
    </el-header>
    <el-container class="container">
      <div class="stepcontainer">

      </div>
    </el-container>
  </div>
</template>
<script>
import { postRequest, getRequest } from "@/utils/api";
import describeAnalyze from "@/views/stasticAnalyze/describeAnalyze/index.vue"
/*统计分析根页面*/
export default {
  components: {
    describeAnalyze,
  },
  data() {
    return {
      active: 1,
    };
  },
  methods: {
    stepBack(active) {
      this.active--;
    },
    stepNext(active) {
      this.active++;
    },
  },
  mounted() {},
};
</script>
<style scoped>
.container {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.step {
  display: block;
  width: 100%;
}
.stepcontainer {
  display: flex;
  width: 100%;
  height: 100%;
}
.stepbutton {
  display: block;
}
</style>
