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
      <el-button @click="clearFilter" size="small">清除</el-button>
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
                data?.tableOrigin?.includes(value2))
          )
        "
        style="width: 100%"
        :row-style="{ height: '33px', lineHeight: '10px', padding: '0px' }"
        :header-cell-style="{
          background: '#58AAFF',
          color: '#fff',
          lineHeight: '12px',
          padding: '0px',
          height: '34px',
          textAlign: 'center',
        }"
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
            <el-button size="small" @click="handleSelect(scope.row)"
              >查看</el-button
            >
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
    <el-dialog :visible.sync="dialogFormVisible2" :title="selectedTable">
      <el-table
        :data="dataAll"
        style="width: auto"
        border
        :row-style="{ height: '33px', lineHeight: '10px', padding: '0px' }"
        :header-cell-style="{
          background: '#58AAFF',
          color: '#fff',
          lineHeight: '12px',
          padding: '0px',
          height: '34px',
          textAlign: 'center',
        }"
        stripe
      >
        <el-table-column
          v-for="(item, index) in columns"
          :key="index"
          :label="item"
          :prop="item"
          width="150"
        >
        </el-table-column>
      </el-table>

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
    </el-dialog>

    <!--===============================     导入数据表单   ===================================================================-->
    <el-dialog
      v-loading="loading"
      :element-loading-text="loadText"
      id="importDataTable"
      title="导入数据表"
      :visible.sync="dialogFormVisible"
      width="40%"
    >
      <el-form
        :model="dialogForm"
        ref="dialogFormRef"
        :rules="dialogForm.rules"
        label-width="110px"
      >
        <el-form-item label="选择数据表" prop="filesInfo">
          <el-upload
            action=""
            class="upload"
            ref="uploadRef"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-change="changeFile"
            :auto-upload="false"
            accept=".csv"
            :limit="1"
            :multiple="false"
            :file-list="dialogForm.filesInfo"
            :http-request="
              (data) => {
                upRequest(data);
              }
            "
          >
            <el-button slot="trigger" size="small" type="success"
              >选取文件</el-button
            >
            <div slot="tip" class="el-upload__tip">只能上传csv文件</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="数据表名称" prop="tableName">
          <el-input
            v-model="dialogForm.tableName"
            placeholder="请输入数据表名称"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button @click="resetForm('dialogFormRef')">重置</el-button>
        <el-button type="primary" @click="uploadFile">下一步</el-button>
      </div>

      <el-dialog
        append-to-body
        title="请选择特征类型"
        :visible.sync="featuresVision"
      >
        <el-form class="featureLabel" label-width="auto">
          <el-form-item
            v-for="(name, index) in Object.keys(featuresMap)"
            :key="index"
            :label="name"
          >
            <el-select
              v-model="featuresMap[name]"
              placeholder="请选择特征类型"
              @input="
                (e) => {
                  test(e, name);
                }
              "
            >
              <el-option
                label="人口学特征"
                value="people"
                key="people"
              ></el-option>
              <el-option
                label="社会学特征"
                value="social"
                key="social"
              ></el-option>
              <el-option
                label="生理学特征"
                value="medical"
                key="medical"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="compelete">完成上传</el-button>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { getRequest, postRequest } from "@/utils/api";
import { mapGetters, mapMutations, mapState, mapActions } from "vuex";

import { resetForm, debounce } from "@/components/mixins/mixin";

export default {
  mixins: [resetForm, debounce],
  computed: {
    ...mapGetters(["dataDisList", "dataCreatorList"]),
    ...mapState(["dataList"]),
  },

  watch: {
    "dialogForm.tableName"() {
      this.checkTableName();
    },
  },

  data() {
    return {
      loading: false,
      loadText: "拼命加载中",
      disease: "",
      creator: "",
      tableData: [],
      dataAll: [],
      featuresVision: false,
      featuresMap: {},
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
      value2: "",
      dialogForm: {
        filesInfo: [],
        tableName: "",
        isOnly: true,
        featuresNum: 1,
        fields: [{ name: "", type: "" }],
        rules: {
          tableName: [
            {
              required: true,
              message: "数据表名称不能为空",
              trigger: "change",
            },
          ],
          dataDisease: [
            {
              required: true,
              message: "涉及疾病不能为空",
              trigger: "blur",
            },
          ],
          numFeatures: [
            { required: true, message: "特征个数不能为空", trigger: "blur" },
            { type: "integer", message: "特征个数需为整数", trigger: "blur" },
            { min: 1, message: "特征个数需>1", trigger: "blur" },
          ],
        },
      },
      dialogFormVisible: false,
      dialogFormVisible2: false,
      currentPage: 1,
      pageSize: 10,
      allPage: 0,
      selectedTable: "",
      columns: [],
    };
  },

  created() {
    // 检查重名的防抖函数

    this.checkTableName = this.debounce(() => {
      getRequest("/DataTable/inspection", {
        name: this.dialogForm.tableName,
      }).then((res) => {
        // 上一次重复了这一次不重复就要提醒一下
        if (!this.dialogForm.isOnly && res) {
          this.$message({
            showClose: true,
            message: "表名可用",
            type: "success",
          });
        }
        if (typeof res === "boolean") {
          this.dialogForm.isOnly = res;
        }
        if (!res) {
          this.$message({
            showClose: true,
            message: "数据表重名，请重新填写",
            type: "warning",
          });
          return false;
        }
        return true;
      });
    }, 800);
  },
  mounted() {
    this.getAllData();
  },

  methods: {
    ...mapMutations(["SetDataList"]),
    ...mapActions(["getDataList"]),
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
    },

    clearFilter() {
      this.value1 = "";
      this.value2 = "";
    },
    test(e, index) {
      const obj = {
        ...this.featuresMap,
      };
      obj[index] = e;
      this.featuresMap = obj;
    },

    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(row) {
      postRequest(`DataTable/delete/${row.id}`).then((res) => {
        this.SetDataList(res);
      });
    },
    handleSelect(row) {
      this.dialogFormVisible2 = true;
      this.selectedTable = row.tableName;
      getRequest(
        "/feature/getInfoByTableName?tableName=" +
          this.selectedTable +
          "&page=" +
          1
      ).then((response) => {
        this.dataAll = response.data;
        console.log(response);
        this.allPage = response.total * 10;
        this.columns = Object.keys(this.dataAll[0]);
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      getRequest(
        "/feature/getInfoByTableName?tableName=" +
          this.selectedTable +
          "&page=" +
          val
      ).then((response) => {
        console.log(response);
        this.dataAll = response.data;
      });
    },
    importData() {
      this.dialogFormVisible = true;
    },

    handleSubmit() {
      console.log("文件上传中...");
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeUpload(file) {
      //上传前的验证
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

    removeFileExtension(fileName) {
      // 寻找最后一个点号的位置
      const lastDotIndex = fileName.lastIndexOf(".");

      // 如果找到了点号并且不在文件名的开头或结尾
      if (
        lastDotIndex !== -1 &&
        lastDotIndex < fileName.length - 1 &&
        lastDotIndex > 0
      ) {
        // 返回删除了后缀的文件名部分
        return fileName.substring(0, lastDotIndex);
      } else {
        // 如果没有找到点号或者点号在文件名的开头或结尾，直接返回原文件名
        return fileName;
      }
    },

    changeFile() {
      console.log(this.$refs["uploadRef"].uploadFiles);
      if (this.dialogForm.tableName.length < 1) {
        this.dialogForm.tableName = this.removeFileExtension(
          this.$refs["uploadRef"].uploadFiles[0].name
        );
      }
    },

    upRequest(data) {
      const payload = new FormData();
      payload.append("file", data.file);
      console.log(data.file);
      payload.append("newName", this.dialogForm.tableName);
      payload.append("disease", this.dialogForm.dataDisease);
      const options = {
        method: "post",
        data: payload,
        url: "/DataTable/upload",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      this.$axios(options).then((res) => {
        this.loading = false;
        console.log(res);
        if (res?.code == "200") {
          this.$message({
            showClose: true,
            type: "success",
            message: "上传成功",
          });
          let featureList = res.tableHeaders;

          // 把特征存为map的键
          for (const item of featureList) {
            // this.featuresMap.set(item, "people");
            this.featuresMap[item] = "people";
          }
          console.log(this.featuresMap);
          this.featuresVision = true;
        } else {
          this.$message({
            showClose: true,
            type: "error",
            message: "上传失败",
          });
        }
      });
    },

    uploadFile() {
      if (this.$refs["uploadRef"].uploadFiles.length < 1) {
        this.$message({
          showClose: true,
          type: "warning",
          message: "请选择数据表",
        });
        return false;
      }
      this.checkTableName();
      if (!this.dialogForm.isOnly) {
        return false;
      }
      this.$refs["dialogFormRef"].validate((valid) => {
        if (valid) {
          this.loadText = "正在上传并解析文件";
          this.loading = true;
          this.$refs.uploadRef.submit();
        }
      });
    },

    compelete() {
      this.loadText = "正在添加字段类型";
      this.loading = true;
      let tableHeaders = [];
      console.log("compelete里的featuresMap.id", this.featuresMap.id);
      for (const key in this.featuresMap) {
        console.log("old", key, this.featuresMap[key]);
        if (Object.hasOwnProperty.call(this.featuresMap, key)) {
          console.log("new", key, this.featuresMap[key]);
          switch (this.featuresMap[key]) {
            case "people":
              tableHeaders.push({
                fieldName: key,
                isDemography: "1",
                isPhysiological: "0",
                isSociology: "0",
              });
              break;
            case "medical":
              tableHeaders.push({
                fieldName: key,
                isDemography: "0",
                isPhysiological: "1",
                isSociology: "0",
              });
              break;
            case "social":
              tableHeaders.push({
                fieldName: key,
                isDemography: "0",
                isPhysiological: "0",
                isSociology: "1",
              });
              break;
            default:
              break;
          }
        }
      }

      postRequest("/tTableManager/insertTableManager", {
        tableName: this.dialogForm.tableName,
        tableHeaders,
      }).then((res) => {
        console.log(res);
        // if(res.length>this.dataList.length){
        // 这里不应重新获取数据列表，应该用res直接设置vuex里的datalist，但是有bug
        // this.SetDataList(res);
        this.getDataList();
        this.$message({
          showClose: true,
          type: "success",
          message: "操作成功，已添加数据表",
        });
        this.featuresVision = false;
        this.dialogFormVisible = false;
        // }
      });
    },
  },
};
</script>

<style scoped>
#top_buttons > * {
  display: inline-block;
}
#DiseaseFilter {
  margin-right: 40px;
}
#creatorFilter {
  margin-right: 20px;
}
#top_right_buttons {
  float: right;
  margin-right: 100px;
}
#table {
  margin-top: 10px;
}
#data_source {
  margin-right: 20px;
}

.featureLabel {
  height: 55vh;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  overflow: auto;
}

.featureLabel .el-form-item__label {
  color: #252525;
}
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}


</style>
