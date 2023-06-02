<template>
  <div>
    <div>
      <div class="table">
        <p>数据统计:</p>
        <br />
        <div>
          <el-table :data="statis" height="450" style="width:auto;" border>
             <el-table-column
            v-for="(item, index) in statisColumn"
            :key="index"
            :label="item"
            :prop="item"
            width="150"
          >
          </el-table-column>
          </el-table>
        </div>
     
      </div>
      <br />
      <div class="table">
        <p>原始数据:</p>
        <br />
        <div class="table1">
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
  props:["dataAll", "dataName","statisData"],
  data() {
    return {
      dataInfo: [],
      dataColumn: [],
      allPage: 0,
      currentPage: 1,
      pageSize: 10,
      dataNow: [],
      statisColumn:[],
      column:[],
      statis:[],
    };
  },
  methods: {
    dealdata() {

      this.dataColumn = Object.keys(this.dataAll.data[0]);
      this.allPage = this.dataAll.total*10;
      this.dataNow = this.dataAll.data;
  
      this.column=Object.keys(this.statisData);
      this.statisColumn=Object.keys(this.statisData[this.column[0]]);
      this.statisColumn.unshift("name");
      //  let tempList =JSON.parse(this.$store.getters.getAllColummnData)
      let index=0;
      for( let key in this.statisData){
        if(index<this.column.length-1){
       
          index++;
          let tempObj={
            name:key,
            missingRate:this.statisData[key].missingRate.toFixed(2),
            mean:this.statisData[key].mean.toFixed(2),
            variance:this.statisData[key].variance.toFixed(2),

          }
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
  },
  mounted() {
    this.dealdata();
  },
};
</script>
<style>
.table1{
    width: 100%;
  height: 100%;
}
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
