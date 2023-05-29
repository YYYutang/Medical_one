<template>
  <div>
    <div>
      <div class="table">
        <p>数据统计:</p>
        <br />
        <el-table :data="dataInfo" height="250" border>
          <el-table-column fixed prop="cid" label="指标名称" width="120">
          </el-table-column>
          <el-table-column fixed prop="lost" label="缺失率" width="120">
          </el-table-column>
          <el-table-column prop="max" label="最大值" width="120">
          </el-table-column>
          <el-table-column prop="min" label="最小值" width="120">
          </el-table-column>
          <el-table-column prop="mean" label="均值" width="120">
          </el-table-column>
          <el-table-column prop="variance" label="方差" width="120">
          </el-table-column>
        </el-table>
      </div>
      <div class="table">
        <p>原始数据:</p>
        <br />
        <el-table :data="dataAll.data" style="width: 100%" border>
          <el-table-column
            v-for="(item, index) in dataColumn"
            :key="index"
            :label="item"
            :prop="item"
            fixed
            width="150"
          >
          </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "oldData",
  props: ["dataAll", "head2"],
  data() {
    return {
      dataInfo: [],
      dataColumn: [],
    };
  },
  methods: {
    getdataColumn() {
      this.dataColumn = Object.keys(this.dataAll.data[0]);
    },
  },
  mounted() {
    this.getdataColumn();
  },
};
</script>
<style>
</style>
