<template>
  <div>
    <div>
      <div class="table">
        <p>数据统计:</p>
        <br />
        <div class="statable">
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
      </div>
      <br />
      <div class="table">
        <p>原始数据:</p>
        <br />
        <el-table :data="dataNow" style="width:auto" border>
          <el-table-column
            v-for="(item, index) in dataColumn"
            :key="index"
            :label="item"
            :prop="item"
            width="150"
          >
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        background
        class="pagination"
        layout="prev, pager, next"
        :current-page="currentPage"
        :page-size="pageSize"
        @current-change="handleCurrentChange"
        :total="allPage"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getRequest } from "@/utils/api";

export default {
  name: "oldData",
  props: ["dataAll", "dataName"],
  data() {
    return {
      dataInfo: [],
      dataColumn: [],
      allPage: 0,
      currentPage: 1,
      pageSize: 10,
      dataNow: [],
    };
  },
  methods: {
    dealdata() {
      this.dataColumn = Object.keys(this.dataAll.data[0]);
      this.allPage = this.dataAll.total*10;
      this.dataNow = this.dataAll.data;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      getRequest(
        "/feature/getInfoByTableName?tableName=" +
          this.dataName +
          "&page=" +
          val
      ).then((response) => {
        this.dataNow = response.data;
      });
    },
  },
  mounted() {
    this.dealdata();
  },
};
</script>
<style>
.table {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.pagination {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.statable {
  width: auto;
}
</style>
