<template>
  <div>
    <el-header>
      <div v-if="head1">
        <h3>任务设置</h3>
        <el-divider></el-divider>
      </div>
      <div>
        <el-tabs v-if="head2" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="原始数据统计分析" name="first"
            ><oldData
              v-if="oldShow"
              :dataAll="dataAll"
              :dataName="dataSelectForm.formData.selectedData"
              :statisData="statisData"
              :dataColumns="dataInOptions"
            >
            </oldData>
          </el-tab-pane>
          <el-tab-pane label="处理后数据统计分析" name="second"
            ><newData
              v-if="newShow"
              :dataChoose="dataChoose"
              :dataNew="dataNew"
              :dataNewColumns="dataNewColumns"
              :dataName="dataSelectForm.formData.selectedData"
              :columnName="columnSelectForm.formData.selectedData"
              :chartDatay="chartDatay"
            ></newData
          ></el-tab-pane>
        </el-tabs>
      </div>
    </el-header>

    <el-container id="maintest">
      <div id="step" v-show="showStep">
        <el-steps :active="active" align-center>
          <el-step title="选择数据"></el-step>
          <el-step title="选择属性"></el-step>
          <el-step title="算法选择"></el-step>
        </el-steps>
      </div>
      <div id="stepcontain" v-show="showStep">
        <!--el-form的:model，el-form-item的prop只和验证相关-->
        <!--======================================     选择数据表单      ======================================================-->
        <el-form
          class="form"
          :model="dataSelectForm.formData"
          :rules="dataSelectForm.rules"
          v-show="dataSelectForm.isShow"
          ref="dataSelectForm"
          label-position="top"
        >
          <el-form-item label="选择数据表：" prop="selectedData">
            <el-row :gutter="10">
              <el-radio-group
                v-model="dataSelectForm.formData.selectedData"
                size="medium"
                prop="selectedData"
              >
                <el-col v-for="item in dataOptions" :key="item.id" :span="8">
                  <el-radio
                    class="radio"
                    :label="item.tableName"
                    border
                    style="margin-top: 20px"
                    >{{ item.tableName }}</el-radio
                  >
                </el-col>
              </el-radio-group>
            </el-row>
          </el-form-item>
          <br />
          <el-form-item class="button1" style="margin-left: 38%">
            <el-button size="small" @click="stepBack(active)">上一步</el-button>
            <el-button size="small" type="primary" @click="submitForm(active)"
              >下一步</el-button
            >
          </el-form-item>
        </el-form>
        <!--======================================     选择属性列表单      ======================================================-->
        <el-form
          class="form"
          :model="columnSelectForm.formData"
          :rules="columnSelectForm.rules"
          v-show="columnSelectForm.isShow"
          ref="columnSelectForm"
          label-position="top"
        >
          <el-form-item label="选择属性列：" prop="selectedData">
            <el-checkbox-group
              v-model="columnSelectForm.formData.selectedData"
              size="medium"
              prop="selectedData"
            >
              <el-row :gutter="10">
                <h5 class="text">人口学指标</h5>

                <el-col
                  v-for="item in demoOptions"
                  :key="item.columnName"
                  :span="6"
                >
                  <div v-if="item.columnisR">
                    <el-tooltip
                      effect="light"
                      :content="item.columnDesc"
                      placement="top"
                      style="margin-top: 20px"
                    >
                      <el-checkbox
                        class="radio"
                        :label="item.columnName"
                        border
                        style="margin-top: 20px"
                        >{{ item.columnName }}</el-checkbox
                      >
                    </el-tooltip>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <h5 class="text">行为学指标</h5>

                <el-col
                  v-for="item in sociolOptions"
                  :key="item.columnName"
                  :span="6"
                >
                  <div v-if="item.columnisX">
                    <el-tooltip
                      effect="light"
                      :content="item.columnDesc"
                      placement="top"
                      style="margin-top: 20px"
                    >
                      <el-checkbox
                        class="radio"
                        :label="item.columnName"
                        border
                        style="margin-top: 20px"
                        >{{ item.columnName }}</el-checkbox
                      >
                    </el-tooltip>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <h5 class="text">生理指标</h5>

                <el-col
                  v-for="item in physioOptions"
                  :key="item.columnName"
                  :span="6"
                >
                  <div v-if="item.columnisS">
                    <el-tooltip
                      effect="light"
                      :content="item.columnDesc"
                      placement="top"
                      style="margin-top: 20px"
                    >
                      <el-checkbox
                        class="radio"
                        :label="item.columnName"
                        border
                        style="margin-top: 20px"
                        >{{ item.columnName }}</el-checkbox
                      >
                    </el-tooltip>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <h5 class="text">其他指标</h5>
                <el-col
                  v-for="item in otherOptions"
                  :key="item.columnName"
                  :span="6"
                >
                  <div v-if="item.columnisO">
                    <el-tooltip
                      effect="light"
                      :content="item.columnDesc"
                      placement="top"
                      style="margin-top: 20px"
                    >
                      <el-checkbox
                        class="radio"
                        :label="item.columnName"
                        border
                        style="margin-top: 20px"
                        >{{ item.columnName }}</el-checkbox
                      >
                    </el-tooltip>
                  </div>
                </el-col>
              </el-row>
            </el-checkbox-group>
          </el-form-item>
          <br />
          <el-form-item class="button1" style="margin-left: 38%">
            <el-button size="small" @click="stepBack(active)">上一步</el-button>
            <el-button size="small" type="primary" @click="submitForm(active)"
              >下一步</el-button
            >
          </el-form-item>
        </el-form>

        <!--======================================     算法选择表单     =======================================================-->
        <el-form
          class="form"
          :model="algoForm.formData"
          :rules="algoForm.rules"
          v-show="algoForm.isShow"
          ref="algoForm"
          label-position="top"
        >
          <el-form-item label="选择算法模型" prop="algoName">
            <el-row :gutter="60">
                  <h5 class="text">无监督类算法</h5>
              <el-radio-group
                v-model="algoForm.formData.algoName"
                prop="selectedData"
              >
                <el-col
                  :span="8"
                  v-for="item in algoOptions1"
                  :key="item.algoName"
                > 
                  <el-radio :label="item.algoName" border>{{
                    item.algoName
                  }}</el-radio>
                </el-col>
              </el-radio-group>
            </el-row>
            <br>
            <el-row :gutter="60">
                  <h5 class="text">有监督类算法</h5>
              <el-radio-group
                v-model="algoForm.formData.algoName"
                prop="selectedData"
              >
                <el-col
                  :span="8"
                  v-for="item in algoOptions2"
                  :key="item.algoName"
                > 
                  <el-radio :label="item.algoName" border>{{
                    item.algoName
                  }}</el-radio>
                </el-col>
              </el-radio-group>
            </el-row>
            <br>
            <el-row :gutter="60">
                  <h5 class="text">深度学习算法</h5>
              <el-radio-group
                v-model="algoForm.formData.algoName"
                prop="selectedData"
              >
                <el-col
                  :span="9"
                  v-for="item in algoOptions3"
                  :key="item.algoName"
                  style="marigin-right:5px"
                > 
                  <el-radio :label="item.algoName" border >{{
                    item.algoName
                  }}</el-radio>
                </el-col>
              </el-radio-group>
            </el-row>
          </el-form-item>
          <br />
          <el-form-item class="button1" style="margin-left: 38%">
            <el-button size="small" @click="stepBack(active)">上一步</el-button>
            <el-button  size="small" type="primary" @click="submitForm(active)"
              >完成</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-container>
  </div>
</template>
<script>
import { postRequest, getRequest } from "@/utils/api";
import knn from "@/components/algos/knn.vue";
import oldData from "@/components/outcomeShow/oldData.vue";
import newData from "@/components/outcomeShow/newData.vue";
import storage from "@/utils/storage";

export default {
  components: {
    knn,
    oldData,
    newData,
  },
  data() {
    return {
      activeName: "first",
      head1: true,
      head2: false,
      showStep: true,
      oldShow: true,
      newShow: false,
      dataOptions: [],
      dataInOptions: [],
      dataNew: [],
      dataNewColumns: [],
      demoOptions: [],
      physioOptions: [],
      sociolOptions: [],
      otherOptions: [],

      algoOptions1: [
        {
          id: 1,
          algoName: "PCA(主成分分析)",
          algoType:"1"
        },
        {
          id: 2,
          algoName: "ICA(独立成分分析)",
          algoType:"1"
        },
        {
          id: 3,
          algoName: "因子分析",
          algoType:"1"
        },],
        algoOptions2: [
            {
          id: 4,
          algoName: "LDA(线性判别分析)",
          algoType:"2"
        },
          {
          id: 5,
          algoName: "稀疏表示学习",
          algoType:"2"
        },
         {
          id: 6,
          algoName: "神经网络",
          algoType:"2"
        },],
        algoOptions3: [
        {
          id: 7,
          algoName: "CNN(卷积神经网络)",
          algoType:"3"
        },
         {
          id: 8,
          algoName: "RNN(循环神经网络)",
          algoType:"3"
        },
      ],
      value1: [],
      value2: [],
      chartDatay:[],
      formArray: ["dataSelectForm", "columnSelectForm", "algoForm"],
      active: 0,

      //数据选择-----------------------------------------------------------------------------------------------
      dataSelectForm: {
        isShow: true,
        formData: {
          selectedData: "",
        },
        rules: {
          selectedData: [
            { required: true, message: "请选择数据表", trigger: "blur" },
          ],
        },
      },
      //选择属性列-----------------------------------------------------------------------------------------------
      columnSelectForm: {
        isShow: false,
        formData: {
          selectedData: [],
        },
        rules: {
          selectedData: [
            { required: true, message: "请选择属性列", trigger: "blur" },
          ],
        },
      },

      //数据处理-----------------------------------------------------------------------------------------------
      algoForm: {
        isShow: false,
        formData: {
          algoName: "",
          params: [],
        },
        rules: {
          algoName: [
            { required: true, message: "请选择一个算法模型", trigger: "blur" },
          ],
        },
      },

      //模型算法-----------------------------------------------------------------------------------------------
      modelAlgoForm: {
        isShow: false,
        formData: {
          classifyMode: "0",
          regressMode: "0",
          predictMode: "0",
          clusterMode: "0",
        },
      },
      dataAll: [],
      dataChoose: [],
      dataNew: [],
      statisData: [],
    };
  },
  methods: {
    submitForm(stepIndex) {
      let formName = this.formArray[stepIndex];
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (stepIndex < 2) {
            this[formName].isShow = false;
            this.active++;
            let nextFormName = this.formArray[++stepIndex];
            this[nextFormName].isShow = true;
            if (this.active == 1) {
              let tableName = this.dataSelectForm.formData;
              getRequest("/feature/getAllFiled/" + tableName.selectedData).then(
                (response) => {
                  let data = response.data;
                  let columnNametemp = Object.keys(data);
                  for (let i = 0; i < columnNametemp.length; i++) {
                    if (data[columnNametemp[i]] != null) {
                      const obj = {
                        columnName: data[columnNametemp[i]].fieldName,
                        columnDesc: data[columnNametemp[i]].fieldNameCh,
                      };
                      if (data[columnNametemp[i]].isDemography == 1) {
                        obj.columnisR = true;
                      } else {
                        obj.columnisR = false;
                      }
                      if (data[columnNametemp[i]].isSociology == 1) {
                        obj.columnisX = true;
                      } else {
                        obj.columnisX = false;
                      }
                      if (data[columnNametemp[i]].isPhysiological == 1) {
                        obj.columnisS = true;
                      } else {
                        obj.columnisS = false;
                      }
                      if (!obj.columnisR && !obj.columnisS && !obj.columnisX) {
                        obj.columnisO = true;
                      } else {
                        obj.columnisO = false;
                      }
                      if (obj.columnisR == true) {
                        this.demoOptions.push(obj);
                      }
                      if (obj.columnisS == true) {
                        this.physioOptions.push(obj);
                      }
                      if (obj.columnisX == true) {
                        this.sociolOptions.push(obj);
                      }
                      if (obj.columnisO == true) {
                        this.otherOptions.push(obj);
                      }
                      this.dataInOptions.push(obj);
                    }
                  }
                }
              );

              getRequest(
                "/feature/getInfoByTableName?tableName=" +
                  tableName.selectedData +
                  "&page=" +
                  1
              ).then((response) => {
                this.dataAll = response;
              });
              getRequest(
                "/feature/getStatisticaldData/" + tableName.selectedData
              ).then((response) => {
                console.log(response);
                this.statisData = response.data;
              });
            }
            if (this.active == 2) {
              const page = 1;
              getRequest(
                "/feature/getInfoBySelectedFiled?page=" +
                  page +
                  "&tableName=" +
                  this.dataSelectForm.formData.selectedData +
                  "&params=" +
                  this.columnSelectForm.formData.selectedData
              ).then((response) => {
                console.log(response);
                this.dataChoose = response;
              });
            }
          } else if (stepIndex == 2) {
            this.head1 = !this.head1;
            this.head2 = !this.head2;
            this.showStep = !this.showStep;
            const params = {
              modelTable: this.dataSelectForm.formData.selectedData, //模型选择的数据表表名
              modelColumn: this.columnSelectForm.formData.selectedData, //模型选择的属性列（数组）
              modelAlgo: this.algoForm.formData.algoName, //模型选择的算法名
            };

            getRequest("feature/runAi/" + params.modelTable).then(
              (response) => {
                console.log(response)
                for (let i in response.data[0]) {
                  var num = parseInt(i) + 1;
                  this.dataNewColumns.push("主成分" + num);
                  this.dataNew["主成分" + num] = response.data[0][i];
              
                }
                   for (let i in response.data[1]) {
                  this.chartDatay.push(response.data[1][i])
              
                }
                  
              }
            );
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(stepIndex) {
      let formName = this.formArray[stepIndex];
      this.$refs[formName].resetFields();
    },
    stepBack(stepIndex) {
      if (this.active - 1 >= 0) {
        if (this.active == 1) {
          this.dataInOptions = [];
        }
        let formName = this.formArray[stepIndex];
        this[formName].isShow = false;
        this.active--;
        let preFormName = this.formArray[--stepIndex];
        this[preFormName].isShow = true;
      }
    },

    clearSample() {
      this.featureExtractForm.formData.sample = "";
    },
    getAllData() {
      var tempList = JSON.parse(this.$store.getters.getAllTableData);
      for (let i = 0; i < tempList.length; i++) {
        const obj = {
          tableName: tempList[i].tableName,
        };
        this.dataOptions.push(obj);
      }
    },
    outputParams(value) {
      this.algoForm.formData.params = value;
    },
    handleClick(tab, event) {
      if (tab.$options.propsData.name == "first") {
        this.oldShow = true;
      } else if (tab.$options.propsData.name == "second") {
        this.newShow = true;
      }
    },
  },
  mounted() {
    this.getAllData();
  },
};
</script>

<style scoped>
#maintest {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#step {
  width: 80%;
  position: absolute;
  top: 250px;
}
#stepcontain {
  position: absolute;

  top: 340px;
  left: 37%;
}

.button1 {
  position: absolute;
  margin-top: 20px;
  left: 10%;
}
.text {
  font-size: 14px;
}
</style>