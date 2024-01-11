<template>
  <div>

    <el-container class="outcontainer">
        <datasetChoose v-if="active == 1" :active="active" :type="4"></datasetChoose>
        <characterChoose v-if="active == 2" :active="active" :type="4"></characterChoose>
        <missingalgo v-if="active == 3" :active="active"></missingalgo>
        <missingoutcome v-if="active == 4" :active="active"></missingoutcome>

      <div class="stepbutton">
        <el-button size="small" v-if="active!=1" @click="stepBack(active)">上一步</el-button>
        <el-button size="small" type="primary" v-if="active!=4" @click="stepNext(active)"
          >下一步</el-button>
        <el-button size="small" type="primary" v-if="active==4" @click="stepNext(active)"
          >导出</el-button>
      </div>
    </el-container>
  </div>
</template>
<script>
import { postRequest, getRequest } from "@/utils/api";
import characterChoose from "@/components/characterChoose/index.vue";
import datasetChoose from "@/components/datasetChoose/index.vue";
import missingalgo from "@/views/completeMissing/algo.vue";
import missingoutcome from "@/views/completeMissing/outcome.vue";
/*缺失值补齐根页面*/
export default {
  components: {
    characterChoose,
    datasetChoose,
    missingalgo,
    missingoutcome,
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
