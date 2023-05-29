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
              (data?.tableStatus?.includes(value1) &&
                data?.tableOrigin?.includes(value2)))
          
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
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

      <!--===============================     导入数据表单   ===================================================================-->
      <el-dialog id="importDataTable" title="导入数据表" :visible.sync="dialogFormVisible" width="40%">
          <el-form :model="dialogForm" ref="dialogFormRef" :rules="dialogForm.rules" label-width="110px">
              <el-form-item label="数据表名称" prop="tableName">
                  <el-input v-model="dialogForm.tableName" placeholder="请输入数据表名称"></el-input>
              </el-form-item>
              <el-form-item label="特征个数" prop="featuresNum">
                  <el-input-number v-model="dialogForm.featuresNum" :min=1 :step=1 @change="generateFields"></el-input-number>
              </el-form-item>
              <el-form-item id="features" v-for="(field, index) in dialogForm.fields" :key="index" :label="'特征' + (index + 1)" :prop="'field' + index">
                  <el-input v-model="field.name" :placeholder="'请输入特证' + (index + 1) + '名称'"></el-input>
                  <el-select v-model="field.type" placeholder="请选择特征类型">
                      <el-option label="int" value="int"></el-option>
                      <el-option label="varchar(200)" value="varchar(200)"></el-option>
                  </el-select>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取消</el-button>
              <el-button @click="resetForm()">重置</el-button>
              <el-button type="primary" @click="submitTable" >下一步</el-button>
          </div>
<!--          选择数据表单       -->
          <el-dialog width="30%" title="选择本地数据表" :visible.sync="selectVisible" append-to-body>
              <el-upload
                      class="upload"
                      ref="upload"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :file-list="dialogForm.fileList"
                      :auto-upload="false"
                      accept=".csv"
                      :limit = 1
                      :on-success="uploadSuccess"
                      :before-upload="beforeUpload">
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传csv文件</div>
              </el-upload>
          </el-dialog>
      </el-dialog>
  </div>
</template>


<script>

import { postRequest } from '@/utils/api';

export default {

  data() {
    return {
      activeName: "first",
      options_up: [//上传选项
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
      options_source: [//数据来源选项
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
          fields: [{ name: '', type: '' }],
          fileList: [],
          rules: {
              tableName: [
                  { required: true, message: '数据表名称不能为空', trigger: 'blur' }
              ],
              numFeatures: [
                  { required: true, message: '特征个数不能为空', trigger: 'blur' },
                  { type: 'integer', message: '特征个数需为整数', trigger: 'blur' },
                  { min: 1, message: '特征个数需>1', trigger: 'blur' }
              ]
          }
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
      let tempList=JSON.parse(this.$store.getters.getAllTableData)
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
        const numFields = parseInt(this.dialogForm.featuresNum)
        if (!isNaN(numFields)) {
            this.dialogForm.fields = Array.from({ length: numFields }, () => ({ name: '', type: '' }))
        }
    },
    resetForm() {
        this.dialogForm.dataSetName = '';
        this.dialogForm.featuresNum = 1;
        this.dialogForm.fields = [{ name: '', type: '' }];
    },
    submitUpload() {
        console.log('上传成功')
        // this.$refs.upload.submit();
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
        const isCSV = file.type === 'text/csv' || file.type === 'application/vnd.ms-excel';
        // const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isCSV) {
            this.$message.error('上传文件仅支持 CSV 格式');
        }
        // if (!isLt2M) {
        //     this.$message.error('上传文件大小不能超过 2MB!');
        // }
        // return isJPG && isLt2M;
        return isCSV;
      },
      test(){
        console.log(this.value2)
      },
      submitTable() {
          this.selectVisible = true; 
        //   const filedMap = new Map();
        const filedMap={};
          let fieldtemp = this.dialogForm.fields;
          for (let i = 0; i < fieldtemp.length; i++){
              let tempName = fieldtemp[i].name;
              let tempType = fieldtemp[i].type;
            //   filedMap.set(tempName,tempType)
            filedMap[tempName]=tempType

            //   filedMap[i] = temp;
          }

            

          console.log(this.dialogForm.tableName + "   " + this.dialogForm.featuresNum);
          const params = {   //上传的内容
              tableName: this.dialogForm.tableName,
              columnsNum: this.dialogForm.featuresNum,
              filedMap: filedMap,
          }
          console.log(params);
          postRequest('diabete/createTable', params).then((response)=>{
            console.log('in')
            console.log(response)
        })
    }
  },
    created() {
        //存入sessionstorage
        this.getAllData();
    },

}
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
/*#importDataTable >>> .el-input__inner{*/
/*    width: 85%;*/
/*}*/
/*#features >>> .el-input__inner{*/
/*    margin-bottom: 24px;*/
/*}*/

</style>