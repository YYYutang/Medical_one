<template>
  <div>
    <!--==========================     头部按钮     ==============================================================-->
    <div id="top_buttons">
      <div id="load_state">
        <span>数据状态：</span>
        <el-select v-model="value1" placeholder="请选择">
          <el-option
            v-for="item in options_up"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <div id="data_source">
        <span>数据来源：</span>
        <el-select v-model="value2" placeholder="请选择">
          <el-option
            v-for="item in options_source"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <el-button @click="clearFilter">清除</el-button>

      <div id="top_right_buttons">
        <el-button type="primary" @click="importData">导入数据表</el-button>
      </div>

    </div>

    <!--===============================    表格     ==============================================================-->
    <div id="table">
      <el-table
        :data="
          tableData.filter(
            (data) =>
              !(value1 || value2) ||
              (data.tableStatus.includes(value1) &&
                data.tableOrigin.includes(value2))
          )
        "
        style="width: 100%"
        stripe
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >
        <el-table-column label="数据表" prop="tableName"> </el-table-column>
        <el-table-column label="数据来源" prop="tableOrigin"> </el-table-column>
        <el-table-column label="数据状态" prop="tableStatus"> </el-table-column>
        <el-table-column label="存储大小" prop="tableSize"> </el-table-column>
        <el-table-column label="创建人" prop="tablePeople"> </el-table-column>
        <el-table-column label="创建时间" prop="tableDate"> </el-table-column>
        <el-table-column align="center">
          <template slot="header">
            <span>操作</span>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>


<script>

export default {
  data() {
    return {
      activeName: "first",
      options_up: [
        {
          value: "正在上传",
          label: "正在上传",
        },
        {
          value: "上传成功",
          label: "上传成功",
        },
        {
          value: "上传失败",
          label: "上传失败",
        },
      ],
      value1: "",
      options_source: [
        {
          value: "CSV",
          label: "CSV",
        },
        {
          value: "手工录入",
          label: "手工录入",
        },
        {
          value: "MySQL",
          label: "MySQL",
        },
        {
          value: "EXCEL",
          label: "EXCEL",
        },
        {
          value: "TXT",
          label: "TXT",
        },
      ],
      value2: "",
      tableData: [],
      search: "",
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index) {
      this.tableData.splice(index, 1);
    },
    clearFilter() {
      this.value1 = "";
      this.value2 = "";
    },
    getAllData() {
      var tempList=JSON.parse(this.$store.getters.getAllTableData)
          for (let i = 0; i < tempList.length; i++) {
            const obj = {
              tableName: tempList[i].tableName,
              tablePeople: tempList[i].tablePeople,
              tableOrigin: tempList[i].tableOrigin,
              tableSize: tempList[i].tableSize,
              tableDate: tempList[i].startTime,
              tableStatus: tempList[i].tableStatus,
            };
            this.tableData.push(obj);
          }
          
    },
    importData() {},
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
}
#table {
  margin-top: 10px;
}
</style>