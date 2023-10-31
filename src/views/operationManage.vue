<template>
  <div>
    <!--==========================     头部按钮     ==============================================================-->
  
    <br />
    <!--===============================    表格     ==============================================================-->
    <div id="table">
      <el-table
      
        :data="tableData"
        style="width: 100%; "
        :row-style="{height:'33px',lineHeight:'10px',padding:'0px'}"
        :cell-style="{'text-align':'center'}"
        :header-cell-style="{ background: '#58AAFF', color: '#fff', lineHeight:'12px',padding:'0px',height:'34px',textAlign:'center' }"
      >
        <el-table-column label="日志ID" prop="id"> </el-table-column>
        <el-table-column label="用户ID" prop="uid"> </el-table-column>
         <el-table-column label="用户名" prop="username"> </el-table-column>
        <el-table-column label="操作时间" prop="opTime"> </el-table-column>
        <el-table-column label="操作描述" prop="opType"> </el-table-column>
       
      </el-table>
    </div>

  </div>
</template>


<script>
import { postRequest,getRequest } from "@/utils/api";

export default {
  data() {
    return {
      activeName: "first",
      value1: "",
      value2: "",

      tableData: [],
      search: "",
    };
  },

  methods: {
    
    clearFilter() {
      this.value1 = "";
      this.value2 = "";
    },
    getAllData() {
      getRequest('userlog/allLog').then((resp)=>{
       
          this.tableData=resp.data
      })
    },
    importData() {
      this.dialogFormVisible = true;
    },
    generateFields() {
      const numFields = parseInt(this.dialogForm.featuresNum);
      if (!isNaN(numFields)) {
        this.dialogForm.fields = Array.from({ length: numFields }, () => ({
          name: "",
          type: "",
        }));
      }
    },
    resetForm() {
      this.dialogForm.dataSetName = "";
      this.dialogForm.featuresNum = 1;
      this.dialogForm.fields = [{ name: "", type: "" }];
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
  },
  created() {
    //存入sessionstorage
    this.getAllData();
  },
};
</script>


<style scoped>
#top_buttons > * {
  display: inline-block;
}
#load_state {
  margin-right: 40px;
}
#data_source {
  margin-right: 20px;
}
#top_right_buttons {
  float: right;
  margin-right: 100px;
  color: rgb(114, 175, 245);
}
#table {
  margin-top: 10px;
}
::v-deep .el-dialog__header {
  background-color: rgb(114, 175, 245);

}
::v-deep .el-dialog__title{
  font-size: 17px;
  color: white;
  font-weight: 400;
}
.feature{
  display: inline-block; 
    width: 200px;
}
.el-button{
  size:small;
}

</style>