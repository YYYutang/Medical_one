<template>
  <div>
<!--===============================  头部按钮   ======================================================================-->
      <div id="top_buttons">
          <div id="model_state">
              <span>模型状态：</span>
              <el-select v-model="value1" placeholder="请选择" @change="handleSelectionChange">
                  <el-option
                          v-for="item in options_up"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
              </el-select>
          </div>

          <div id="model_type">
              <span>模型类型：</span>
              <el-select v-model="value2" placeholder="请选择">
                  <el-option
                          v-for="item in options_source"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
              </el-select>
          </div>
          <el-button @click="clearFilter">清除</el-button>

          <div id="top_right_buttons">
              <router-link to="/importModel">
                  <el-button type="primary">导入模型</el-button>
              </router-link>
          </div>
      </div>

<!--===============================   表格    ========================================================================-->
      <div id="table">
          <el-table
                  :data="tableData.filter(data => !(value1 || value2) || data.modelState.includes(value1) && data.modelType.includes(value2))"
                  style="width: 100%"
                  stripe
                  :header-cell-style="{background:'#eef1f6',color:'#606266'}">
              <el-table-column
                      label="模型编号"
                      prop="modelNub">
              </el-table-column>
              <el-table-column
                      label="模型名称"
                      prop="modelName">
              </el-table-column>
              <el-table-column
                      label="模型类型"
                      prop="modelType">
              </el-table-column>
              <el-table-column
                      label="算法名称"
                      prop="algoName">
              </el-table-column>
              <el-table-column
                      label="模型状态"
                      prop="modelState">
              </el-table-column>
              <el-table-column
                      label="创建时间"
                      prop="createTime">
              </el-table-column>
              <el-table-column
                      align="center">
                  <template slot="header" >
                      <span>操作</span>
                  </template>
                  <template slot-scope="scope">
                      <el-button
                              size="mini"
                              @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
                      <el-button
                              size="mini"
                              type="danger"
                              @click="handleDelete(scope.$index)">删除</el-button>
                  </template>
              </el-table-column>
          </el-table>
      </div>

<!--===============================     编辑表单   ===================================================================-->
      <el-dialog title="编辑" :visible.sync="dialogFormVisible">
          <el-form :model="dialogForm" ref="dialogFormRef" :rules="rules" label-width="80px">
              <el-form-item label="模型类型" prop="modelType">
                  <el-select v-model="dialogForm.modelType" placeholder="请选择">
                      <el-option
                              v-for="item in options_source"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                      </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="模型名称" prop="modelName">
                  <el-input v-model="dialogForm.modelName"></el-input>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="resetForm('dialogFormRef')">重置</el-button>
              <el-button type="primary" @click="submitForm('dialogFormRef')">保存</el-button>
          </div>
      </el-dialog>
  </div>

</template>



<script>
  export default {
      data() {
          return {
              activeName: 'first',
              options_up: [{
                  value: '正在预测',
                  label: '正在预测'
              }, {
                  value: '准备预测',
                  label: '准备预测'
              }, {
                  value: '完成预测',
                  label: '完成预测'
              }],
              value1: '',
              options_source: [{
                  value: '聚类分析',
                  label: '聚类分析'
              }, {
                  value: '关联规则',
                  label: '关联规则'
              }, {
                  value: '机器学习',
                  label: '机器学习'
              }, {
                  value: '预测模型',
                  label: '预测模型'
              }, {
                  value: '其他模型',
                  label: '其他模型'
              }],
              value2: '',

              tableData: [{
                  modelNub: 'M100000000001',
                  modelName: '模型名称1',
                  modelType: '聚类分析',
                  algoName:'xxx',
                  modelState:'正在预测',
                  createTime:'2022-01-10'
              }, {
                  modelNub: 'M100000000001',
                  modelName: '模型名称1',
                  modelType: '聚类分析',
                  algoName:'xxx',
                  modelState:'正在预测',
                  createTime:'2022-01-10'
              }, {
                  modelNub: 'M100000000001',
                  modelName: '模型名称1',
                  modelType: '聚类分析',
                  algoName:'xxx',
                  modelState:'正在预测',
                  createTime:'2022-01-10'
              }, {
                  modelNub: 'M100000000001',
                  modelName: '模型名称1',
                  modelType: '聚类分析',
                  algoName:'xxx',
                  modelState:'正在预测',
                  createTime:'2022-01-10'
              }, {
                  modelNub: 'M100000000001',
                  modelName: '模型名称1',
                  modelType: '聚类分析',
                  algoName:'xxx',
                  modelState:'正在预测',
                  createTime:'2022-01-10'
              }, {
                  modelNub: 'M100000000001',
                  modelName: '模型名称5',
                  modelType: '聚类分析',
                  algoName:'xxx',
                  modelState:'准备预测',
                  createTime:'2022-01-10'
              }, {
                  modelNub: 'M100000000001',
                  modelName: '模型名称2',
                  modelType: '聚类分析',
                  algoName:'xxx',
                  modelState:'正在预测',
                  createTime:'2022-01-10'
              }, {
                  modelNub: 'M100000000001',
                  modelName: '模型名称6',
                  modelType: '关联规则',
                  algoName:'xxx',
                  modelState:'准备预测',
                  createTime:'2022-01-10'
              }],
              search: '',
              dialogFormVisible: false,
              dialogForm: {
                  modelType: '',
                  modelName: '',
              },
              editIndex: -1,
              rules: {
                  modelType: [
                      { required: true, message: '请选择模型类型', trigger: 'blur' }
                  ],
                  modelName: [
                      { required: true, message: '请输入模型名称', trigger: 'blur' }
                  ],
              }
          }
      },
      methods: {
          handleEdit(index,row) {
              this.dialogForm = Object.assign({}, row);
              this.editIndex = index;
              this.dialogFormVisible = true;
          },
          handleDelete(index) {
              this.tableData.splice(index, 1);
          },
          handleSelectionChange() {
              console.log('选中的值为：', this.value1)
          },
          clearFilter() {
              this.value1 = '';
              this.value2 = '';
          },
          resetForm() {
              this.dialogForm.modelType = ''
              this.dialogForm.modelName = ''
          },
          submitForm() {
              console.log('editIndex:', this.editIndex);
              console.log('tableData:', this.tableData);

              this.$refs.dialogFormRef.validate((valid) =>{
                  if(valid){
                      if (this.editIndex !== -1) {
                          this.tableData[this.editIndex].modelType = this.dialogForm.modelType;
                          this.tableData[this.editIndex].modelName = this.dialogForm.modelName;
                      } else {
                          this.tableData.push({
                              modelType: this.dialogForm.modelType,
                              modelName: this.dialogForm.modelName,
                          })
                      }
                      this.dialogFormVisible = false
                      this.editIndex = -1
                      this.resetForm();
                  }else{
                      console.log('submit failed');
                  }
              });

          }
      }
  };
</script>


<style scoped>
  #top_buttons > *{
      display: inline-block;
  }
  #model_state{
      margin-right: 40px;
  }
  #model_type{
      margin-right: 20px;
  }
  #top_right_buttons{
      float: right;
      margin-right: 100px;
  }
  #table{
      margin-top: 10px;
  }

</style>