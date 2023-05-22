<template>
  <div>
    <el-header>
      <h3>任务设置</h3>
      <el-divider></el-divider>
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
            <el-radio-group
              v-model="dataSelectForm.formData.selectedData"
              size="medium"
              prop="selectedData"
            >
              <el-radio
                class="radio"
                v-for="item in dataOptions"
                :key="item.id"
                :label="item.tableName"
                border
                >{{ item.tableName }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <br />
          <el-form-item>
            <el-button @click="stepBack(active)">上一步</el-button>
            <el-button type="primary" @click="submitForm(active)"
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
              <!--这里key和label要改-->
              <el-checkbox
                class="radio"
                v-for="item in dataInOptions"
                :key="item.columnName"
                :label="item.columnName"
                border
                >{{ item.columnName }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
          <br />
          <el-form-item>
            <el-button @click="stepBack(active)">上一步</el-button>
            <el-button type="primary" @click="submitForm(active)"
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
            <el-radio-group
              v-model="algoForm.formData.algoName"
              size="mini"
              prop="selectedData"
            >
              <el-radio
                v-for="item in algoOptions"
                :key="item.algoName"
                :label="item.algoName"
                border
                >{{ item.algoName }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <knn
              v-if="algoForm.formData.algoName == 'KNN'"
              @outputParams="outputParams"
            ></knn>
            <k-means v-if="algoForm.formData.algoName == 2"></k-means>
          </el-form-item>
          <br />
          <el-form-item>
            <el-button @click="stepBack(active)">上一步</el-button>
            <el-button type="primary" @click="submitForm(active)"
              >完成</el-button
            >
          </el-form-item>
        </el-form>
      </div>

      <div v-show="tableisShow">
        <div class="table">
          <p>原始数据:</p>
          <br />
          <el-table
            :data="oldTableData"
            style="width: 100%"
            height="250"
            border
          >
            <el-table-column fixed prop="userid" label="userid" width="150">
            </el-table-column>
            <el-table-column prop="weight" label="weight" width="120">
            </el-table-column>
            <el-table-column prop="height" label="height" width="120">
            </el-table-column>
            <el-table-column prop="ap_hi" label="ap_hi" width="120">
            </el-table-column>
            <el-table-column prop="ap_lo" label="ap_lo" width="120">
            </el-table-column>
            <el-table-column prop="cholesterol" label="cholesterol" width="120">
            </el-table-column>
          </el-table>
        </div>
        <div class="table">
          <p>处理后数据:</p>
          <br />
          <el-table :data="newTableData" height="250" border>
            <el-table-column fixed prop="main1" label="主成分1" width="120">
            </el-table-column>
            <el-table-column prop="main2" label="主成分2" width="120">
            </el-table-column>
            <el-table-column prop="main3" label="主成分3" width="120">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div>
        <div
          id="chart1"
          class="charts"
          style="width: 600px; height: 400px"
          v-show="showChart"
        ></div>
        <div
          id="chart2"
          class="charts"
          style="width: 700px; height: 400px"
          v-show="showChart"
        ></div>
        <!-- <div
          id="chart3"
          class="charts"
          style="width: 700px; height: 400px"
          v-show="showChart"
        ></div> -->
      </div>
    </el-container>
  </div>
</template>
<script>
import { postRequest, getRequest } from "@/utils/api";
import knn from "@/components/algos/knn.vue";
import * as echarts from 'echarts'

export default {
  components: {
    knn,
  },
  data() {
    return {
      showForm: true,
      showChart: false,
      showStep: true,
      dataOptions: [
        { id: 1, tableName: "cardiovascular" },
        {
          id: 2,
          tableName: "hypertension",
        },
      ],
      dataInOptions: [
        { columnName: "userid" },
        { columnName: "weight" },
        { columnName: "height" },
        { columnName: "ap_hi" },
        { columnName: "ap_lo" },
        { columnName: "cholesterol" },
        { columnName: "gluc" },
        { columnName: "smoke" },
        { columnName: "alcol" },
        { columnName: "active" },
        { columnName: "cargo" },
      ],
      outComeData: [],
      algoOptions: [
        {
          id: 1,
          algoName: "PCA",
        },
        {
          id: 2,
          algoName: "因子分析",
        },
        {
          id: 3,
          algoName: "ICA",
        },
      ],
      value1: [],
      value2: [],
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
      tableisShow: false,
      oldTableData: [
        {
          userid: "1",
          weight: "62",
          height: "168",
          ap_hi: "110",
          ap_lo: "80",
          cholesterol: "1",
        },
        {
          userid: "2",
          weight: "85",
          height: "156",
          ap_hi: "140",
          ap_lo: "90",
          cholesterol: "3",
        },
        {
          userid: "3",
          weight: "64",
          height: "165",
          ap_hi: "130",
          ap_lo: "70",
          cholesterol: "3",
        },
        {
          userid: "4",
          weight: "82",
          height: "169",
          ap_hi: "150",
          ap_lo: "100",
          cholesterol: "1",
        },
        {
          userid: "5",
          weight: "56",
          height: "156",
          ap_hi: "100",
          ap_lo: "60",
          cholesterol: "1",
        },
        {
          userid: "6",
          weight: "151",
          height: "67",
          ap_hi: "120",
          ap_lo: "80",
          cholesterol: "2",
        },
        {
          userid: "7",
          weight: "157",
          height: "93",
          ap_hi: "130",
          ap_lo: "80",
          cholesterol: "3",
        },
        {
          userid: "8",
          weight: "178",
          height: "95",
          ap_hi: "130",
          ap_lo: "90",
          cholesterol: "3",
        },
      ],
      newTableData: [
        {
          main1: "100.75",
          main2: "86.43",
          main3: "1",
        },
        {
          main1: "110.55",
          main2: "84.87",
          main3: "3",
        },
        {
          main1: "102.34",
          main2: "79.33",
          main3: "3",
        },
        {
          main1: "90.05",
          main2: "90.43",
          main3: "1",
        },
        {
          main1: "60.75",
          main2: "80.43",
          main3: "1",
        },
        {
          main1: "110.42",
          main2: "100",
          main3: "2",
        },
        {
          main1: "130.67",
          main2: "105",
          main3: "3",
        },
        {
          main1: "130.93",
          main2: "102",
          main3: "3",
        },
      ],
    };
  },
  methods: {
    onSubmitDM() {
      this.showForm = !this.showForm;
      this.showChart = !this.showChart;
    },
    drawChart() {
      let myChart1 = echarts.init(document.getElementById("chart1"));
      let myChart2 = echarts.init(document.getElementById("chart2"));
     // let myChart3 = this.$echarts.init(document.getElementById("chart3"));
      let option1 = {
         title: {
          text: "主成分得分",
          left: "center",
        },
        xAxis: {
          type: "category",
          data: ["1", "2", "3", "4", "5", "6", "7"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            showBackground: true,
            color: "#75AAF2",
          },
        ],
      };
      let option2 = {
        title: {
          text: "Precision-Recall分析图",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          formatter: "Recall：{b} <br>Precision: {c}%",
        },
        xAxis: {
          name: "Recall",
          type: "category",
          boundaryGap: false,
          data: [0, 0.2, 0.4, 0.6, 0.8, 1],
        },
        yAxis: {
          name: "Precision",
          type: "value",
        },
        series: [
          {
            data: [0.4, 0.5, 0.44, 0.6, 0.65, 0.66, 0.64],
            type: "line",
          },
        ],
        color: "#75AAF2",
      };
      let option3 = {
        title: {
          text: "肺癌及相关疾病患病几率",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          formatter: "患病几率 : <br/>{b} : {c}",
        },
        xAxis: {
          type: "category",
          data: [
            "胃癌",
            "脑卒中",
            "高血压",
            "高血压",
            "前列腺癌",
            "糖尿病",
            "肺癌",
          ],
          axisLabel: {
            formatter: "{value} ",
          },
        },
        yAxis: {
          type: "value",
          data: [0, 20, 40, 60, 80, 100],
          axisLabel: {
            formatter: "{value} %",
          },
        },
        series: [
          {
            data: [40, 20, 15, 80, 70, 10, 70],
            type: "bar",
          },
        ],
        color: "#75AAF2",
      };

      myChart1.setOption(option1);
      myChart2.setOption(option2);
      //myChart3.setOption(option3);
    },
    submitForm(stepIndex) {
      let formName = this.formArray[stepIndex];
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(stepIndex + "stepindex" + this.active + "active");
          if (stepIndex < 2) {
            this[formName].isShow = false;
            this.active++;
            let nextFormName = this.formArray[++stepIndex];
            this[nextFormName].isShow = true;
            if (this.active == 1) {
              let tableName = this.dataSelectForm.formData;
              getRequest("/diabete/getAllFiled/" + tableName.selectedData).then(
                (response) => {
                  for (let i = 0; i < response.data.length; i++) {
                    const obj = {
                      columnName: response.data[i],
                    };
                    this.dataInOptions.push(obj);
                  }
                }
              );
            }
            console.log(stepIndex + "stepindex" + this.active + "active");
          } else if (stepIndex == 2) {
            this.showChart = !this.showChart;
            this.showStep = !this.showStep;
            this.tableisShow = !this.tableisShow;
            this.drawChart();
            // const params={
            //   modelTable:this.dataSelectForm.formData.selectedData,//模型选择的数据表表名
            //   modelColumn:this.columnSelectForm.formData.selectedData,//模型选择的属性列（数组）
            //   modelAlgo:this.algoForm.formData.algoName,//模型选择的算法名
            //   modelAlgoParams:this.algoForm.formData.params,//模型调节的参数（数组）
            // }

            // postRequest('diabete/fitModel',params).then(
            //   (response)=>{
            //     console.log(response)
            //     this.showChart=!this.showChart
            //     this.showStep=!this.showStep
            //     let tempc=Object.keys(response.data)
            //     console.log(tempc)
            //     var tempData=[]
            //     for(let i=0;i<tempc.length;i++){
            //       var tempObj={}
            //       tempObj.name=tempc[i];
            //       tempObj.value=response.data[tempc[i]]
            //       tempData.push(tempObj)
            //     }
            //     this.outComeData=tempData
            //     console.log(this.outComeData)
            //     this.drawChart()
            //   },
            // );
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
      if (this.active - 1 > 0) {
        let formName = this.formArray[stepIndex];
        this[formName].isShow = false;
        this.active--;
        let preFormName = this.formArray[--stepIndex];
        this[preFormName].isShow = true;
        this.dataInOptions = [];
      }
    },

    changeSplitMode(splitMode) {
      if (splitMode == "random") {
        this.dataProcessForm.sliderShow = false;
        this.dataProcessForm.randomSeedShow = true;
        this.dataProcessForm.formData.randomSeed = ""; //配合rule防止seed为空
      } else {
        this.dataProcessForm.randomSeedShow = false;
        this.dataProcessForm.sliderShow = true;
        this.dataProcessForm.formData.randomSeed = "null"; //选择’按比例拆分‘不需要seed，设为null绕过rule
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
.table {
  float: left;
  margin-right: 20px;
}
.charts {
  float: left;
  margin-right: 20px;
  margin-top: 40px;
}
#button1 {
  display: flex;
  justify-content: center;
  align-items: center;
}
#step {
  width: 80%;
  height: 80%;
  position: absolute;
  top: 250px;
}
#stepcontain {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 44%;
  left: 34%;
}
</style>