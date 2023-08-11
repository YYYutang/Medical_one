<template>
  <div>
    <div>
      <div class="table">
        <p class="text">原始数据统计量:</p>
        <br />
        <div>
          <el-table
            :data="statis"
            height="450"
            style="width: auto"
            border
            :row-style="{height:'33px',lineHeight:'10px',padding:'0px'}"
        :header-cell-style="{ background: '#58AAFF', color: '#fff', lineHeight:'12px',padding:'0px',height:'34px',textAlign:'center' }"
            stripe
          >
            <el-table-column
              v-for="(item, index) in statisColumn"
              :key="index"
              :label="item.label"
              :prop="item.name"
              width="150"
              align="center"
            >
            </el-table-column>
          </el-table>
        </div>
      </div>
      <br />
      <div class="table">
        <p class="text">原始数据:</p>
        <br />
        <el-radio-group v-model="dataCondition" @input="changeDataNow">
          <el-radio :label="1">人口学</el-radio>
          <el-radio :label="2">生理指标</el-radio>
          <el-radio :label="3">行为学</el-radio>
          <el-radio :label="4">其他指标</el-radio>
          <el-radio :label="5">全部数据</el-radio>
        </el-radio-group>
        <br />
        <div  class="table1">
          <el-table
            :data="dataNow"
            border
            class="tableDown"
          :row-style="{height:'33px',lineHeight:'10px',padding:'0px'}"
        :header-cell-style="{ background: '#58AAFF', color: '#fff', lineHeight:'12px',padding:'0px',height:'34px',textAlign:'center' }"
          >
            <el-table-column
              v-for="(item, index) in dataColumn"
              :key="index"
              :label="item"
              :prop="item"
             align="center"
              style="width:auto;min-width:200px;"
            >
            </el-table-column>
          </el-table>
        </div>
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
  props: ["dataAll", "dataName", "statisData", "dataColumns"],
  data() {
    return {
      dataInfo: [],
      dataColumn: [],
      allPage: 0,
      currentPage: 1,
      pageSize: 10,
      dataNow: [],
      statisColumn: [],
      column: [],
      statis: [],
      dataCondition: 0,
    };
  },
  methods: {
    dealdata() {
      this.dataColumn = Object.keys(this.dataAll.data[0]);
      this.allPage = this.dataAll.total * 10;
      this.dataNow = this.dataAll.data;
      this.column = Object.keys(this.statisData);
      let tempColumn = Object.keys(this.statisData[this.column[0]]);
      tempColumn.unshift("name");
      for (let i = 0; i < tempColumn.length; i++) {
        if (tempColumn[i] == "name") {
          let tempObj = {
            name: tempColumn[i],
            label: "指标名",
          };
          this.statisColumn.push(tempObj);
        }
        if (tempColumn[i] == "missingRate") {
          let tempObj = {
            name: tempColumn[i],
            label: "缺失率",
          };
          this.statisColumn.push(tempObj);
        }
        if (tempColumn[i] == "mean") {
          let tempObj = {
            name: tempColumn[i],
            label: "平均值",
          };
          this.statisColumn.push(tempObj);
        }
        if (tempColumn[i] == "variance") {
          let tempObj = {
            name: tempColumn[i],
            label: "方差",
          };
          this.statisColumn.push(tempObj);
        }
      }

      let index = 0;
      for (let key in this.statisData) {
        if (index < this.column.length - 1) {
          index++;
          let tempObj = {
            name: key,
            missingRate: this.statisData[key].missingRate.toFixed(2),
            mean: this.statisData[key].mean.toFixed(2),
            variance: this.statisData[key].variance.toFixed(2),
          };
          //    if(tempList[i].tableName==key){
          //   tempObj.desc=tempList[i].tableDesc;
          // }
          this.statis.push(tempObj);
        }
      }
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
    changeDataNow(val) {
      let tempColumn = [];
      if (val == "1") {
        for (var i = 0; i < this.dataColumns.length; i++) {
          if (this.dataColumns[i].columnisR) {
            tempColumn.push(this.dataColumns[i].columnName);
          }
        }
        this.dataColumn = tempColumn;
      }
      if (val == "2") {
        for (var i = 0; i < this.dataColumns.length; i++) {
          if (this.dataColumns[i].columnisS) {
            tempColumn.push(this.dataColumns[i].columnName);
          }
        }
        this.dataColumn = tempColumn;
      }
      if (val == "3") {
        for (var i = 0; i < this.dataColumns.length; i++) {
          if (this.dataColumns[i].columnisX) {
            tempColumn.push(this.dataColumns[i].columnName);
          }
        }
        this.dataColumn = tempColumn;
      }
      if (val == "4") {
        for (var i = 0; i < this.dataColumns.length; i++) {
          if (this.dataColumns[i].columnisO) {
            tempColumn.push(this.dataColumns[i].columnName);
          }
        }
        this.dataColumn = tempColumn;
      }
      if (val == "5") {
        this.dataColumn = Object.keys(this.dataAll.data[0]);
      }
    },
  },
  mounted() {
    this.dealdata();
  },
};
</script>
<style scoped>

.table {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  

}
.table1{
  width:1200px;
     display: flex;
    justify-content: center;
  align-items: center;
}
 .el-table{
   
   width:auto
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
.text {
  color: black;
  font-size: 20px;
  font-weight: bold;
}
</style>
