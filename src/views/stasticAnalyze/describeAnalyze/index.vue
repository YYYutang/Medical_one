<template>
  <div>
    <el-container >
        <div class="outcontainer">
          <datasetChoose v-if="active == 1" :active='active' :type="3"></datasetChoose>
          <characterChoose v-if="active == 2" :active='active' :type="3"></characterChoose>
          <describeOutcome v-if="active == 3" :active='active'></describeOutcome>
 
        <div class="stepbutton">
          <el-button size="small" v-if="active != 1" @click="stepBack(active)"
            >上一步</el-button
          >
          <el-button
            size="small"
            type="primary"
            v-if="active != 3"
            @click="stepNext(active)"
            >下一步</el-button
          >
          <el-button
            size="small"
            type="primary"
            v-if="active == 3"
            @click="stepNext(active)"
            >导出</el-button
          >
        </div>
      </div>
    </el-container>
  </div>
</template>
<script>
import characterChoose from "@/components/characterChoose/index.vue";
import datasetChoose from "@/components/datasetChoose/index.vue";
import describeOutcome from "@/views/stasticAnalyze/describeAnalyze/outcome.vue";
/*描述性统计分析页面*/
export default {
  name: "outcome",
  prop: [],
  components: {
    characterChoose,
    datasetChoose,
    describeOutcome,
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
.outcontainer {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
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