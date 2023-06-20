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
        <el-select v-model="value2" placeholder="请选择" @change="test">
          <el-option
            v-for="item in options_source"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <el-button @click="clearFilter" size="small">清除</el-button>

      <div id="top_right_buttons">
        <el-button type="primary" @click="importData" size="small">导入数据表</el-button>
      </div>
    </div>
    <br />
    <!--===============================    表格     ==============================================================-->
    <div id="table">
      <el-table
        :data="
          tableData.filter(
            (data) =>
              !(value1 || value2) ||
              (data?.tableStatus?.includes(value1) &&
                data?.tableOrigin?.includes(value2))
          )
        "
        style="width: 100%; "
        :row-style="{height:'33px',lineHeight:'10px',padding:'0px'}"
        :header-cell-style="{ background: '#58AAFF', color: '#fff', lineHeight:'12px',padding:'0px',height:'34px',textAlign:'center' }"
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
              size="small"
              type="danger"
              style="background: #1976d2; border: #1976d2"
              @click="handleDelete(scope.$index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--===============================     导入数据表单   ===================================================================-->
    <el-dialog
      id="importDataTable"
      title="导入数据表"
      :visible.sync="dialogFormVisible"
      width="40%"
      class="dialog"
    >
      <el-form
        :model="dialogForm"
        ref="dialogFormRef"
        :rules="dialogForm.rules"
        label-width="110px"
      >
        <el-form-item label="数据表名称" prop="tableName" >
          <el-input
            v-model="dialogForm.tableName"
            placeholder="请输入数据表名称"
            style="width: 220px"
          ></el-input>
        </el-form-item>
        <el-form-item label="特征个数" prop="featuresNum">
          <el-input-number
            v-model="dialogForm.featuresNum"
            :min="1"
            :step="1"
            @change="generateFields"
          ></el-input-number>
        </el-form-item>
        <el-form-item
       
          v-for="(field, index) in dialogForm.fields"
          :key="index"
          :label="'特征' + (index + 1)"
          :prop="'field' + index"
        
        >
          <el-input
            v-model="field.name"
            class="feature"
            :placeholder="'请输入特证' + (index + 1) + '名称'"
          ></el-input>
      
          <el-select v-model="field.type" style="  margin-left:20px;" placeholder="请选择特征类型" class="feature">
            <el-option label="int" value="int"></el-option>
            <el-option label="varchar(200)" value="varchar(200)"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button @click="resetForm()">重置</el-button>
        <el-button type="primary" @click="submitTable">下一步</el-button>
      </div>
      <!--          选择数据表单       -->
      <el-dialog
        width="30%"
        title="选择本地数据表"
        :visible.sync="selectVisible"
        append-to-body
      >
        <el-upload
          class="upload-demo"
          action="#"
          :on-preview="handlePreview"
          ref="upload"
          :http-request="(data) => getFile1(data)"
          :auto-upload="false"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :limit="1"
          multiple
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
          <el-button
            style="margin-left: 10px"
            size="small"
            type="success"
            @click="submitUpload"
            >上传到服务器</el-button
          >
          <div slot="tip" class="el-upload__tip">只能上传csv文件</div>
        </el-upload>
      </el-dialog>
    </el-dialog>
  </div>
</template>


<script>
import { postRequest } from "@/utils/api";

export default {
  data() {
    return {
      activeName: "first",
      options_up: [
        //上传选项
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
        //数据来源选项
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
      dialogForm: {
        tableName: "",
        featuresNum: 1,
        fields: [{ name: "", type: "" }],
        file: {},
        fileList: [],
        rules: {
          tableName: [
            { required: true, message: "数据表名称不能为空", trigger: "blur" },
          ],
          numFeatures: [
            { required: true, message: "特征个数不能为空", trigger: "blur" },
            { type: "integer", message: "特征个数需为整数", trigger: "blur" },
            { min: 1, message: "特征个数需>1", trigger: "blur" },
          ],
        },
      },
      value2: "",

      tableData: [],
      dialogFormVisible: false,
      selectVisible: false,
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
      let tempList = JSON.parse(this.$store.getters.getAllTableData);
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
      console.log(this.tableData);
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
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    uploadSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeUpload(file) {
      const isCSV =
        file.type === "text/csv" || file.type === "application/vnd.ms-excel";
      // const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isCSV) {
        this.$message.error("上传文件仅支持 CSV 格式");
      }
      // if (!isLt2M) {
      //     this.$message.error('上传文件大小不能超过 2MB!');
      // }
      // return isJPG && isLt2M;
      return isCSV;
    },
    test() {
      console.log(this.value2);
    },
    submitTable() {
      this.selectVisible = true;
      //   const filedMap = new Map();
      const filedMap = {};
      let fieldtemp = this.dialogForm.fields;
      for (let i = 0; i < fieldtemp.length; i++) {
        let tempName = fieldtemp[i].name;
        let tempType = fieldtemp[i].type;
        //   filedMap.set(tempName,tempType)
        filedMap[tempName] = tempType;

        //   filedMap[i] = temp;
      }
      const params = {
        //上传的内容
        tableName: this.dialogForm.tableName,
        fieldMap: filedMap,
      };
      console.log(params);
      postRequest("/table/createTable", params).then((response) => {
        console.log("in");
        console.log(response);
      });
    },
    getFile1(data) {
      const file = new FormData();
      file.append("file", data.file);
      const options = {
        method: "post",
        data: file,
        url: "/file/upload",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      this.$axios(options)
        .then((res) => {
          if (res.code == "200") {
            this.$alert("上传成功！", "结果提示", {
              confirmButtonText: "确定",
              callback: (action) => {
                this.$message({
                  type: "info",
                  message: `action: ${action}`,
                });
                this.selectVisible = false;
                this.dialogFormVisible = false;
                this.dialogForm.file = {};
                this.dialogForm.fileList = {};
                this.dialogForm.tableName = "";
                this.dialogForm.fields = [{ name: "", type: "" }];
              },
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
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

/*#importDataTable >>> .el-input__inner{*/
/*    width: 85%;*/
/*}*/
/*#features >>> .el-input__inner{*/
/*    margin-bottom: 24px;*/
/*}*/
</style>