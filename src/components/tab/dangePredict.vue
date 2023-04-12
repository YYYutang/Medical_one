<template>
  <div>
    <el-header>
      <h3>任务设置</h3>
      <el-divider></el-divider>
    </el-header>

    <el-container id="maintest">
      <div id="step">
        <el-steps :active="active" align-center>
          <el-step title="基本信息"></el-step>
          <el-step title="选择数据"></el-step>
          <el-step title="选择属性"></el-step>
          <el-step title="算法选择"></el-step>
        </el-steps>
      </div>
      <div id="stepcontain">
        <!--el-form的:model，el-form-item的prop只和验证相关-->

        <!--======================================     基本信息表单      ======================================================-->
        <el-form
          class="form"
          :model="basicInfoForm.modelData"
          :rules="basicInfoForm.rules"
          ref="basicInfoForm"
          label-position="top"
          v-show="basicInfoForm.isShow"
        >
          <el-form-item label="模型名称" prop="name">
            <el-input v-model="basicInfoForm.modelData.name"></el-input>
          </el-form-item>
          <el-form-item label="备注信息" prop="desc">
            <el-input
              type="textarea"
              v-model="basicInfoForm.modelData.desc"
            ></el-input>
          </el-form-item>
          <br />
          <el-form-item>
            <el-button type="primary" @click="submitForm(active)"
              >下一步</el-button
            >
            <el-button @click="resetForm(active)">重置</el-button>
          </el-form-item>
        </el-form>

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
          <el-form-item >
            <knn v-if="algoForm.formData.selectedData==1" @outputParams='outputParams'></knn>
            <k-means v-if="algoForm.formData.selectedData==2"></k-means>
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

      <div id="charts">
        <div
          id="chart1"
          style="width: 600px; height: 400px"
          v-show="showChart"
        ></div>
        <div
          id="chart2"
          style="width: 700px; height: 400px"
          v-show="showChart"
        ></div>

        <div
          id="chart3"
          style="width: 700px; height: 400px"
          v-show="showChart"
        ></div>
      </div>
    </el-container>
  </div>
</template>
<script>
import { postRequest, getRequest } from "@/utils/api";
import knn from "@/components/algos/knn.vue";

export default {
  components:{
    knn,
  },
  data() {
    return {
      showForm: true,
      showChart: false,
      dataOptions: [],
      dataInOptions: [],
      algoOptions: [
        {
          id: 1,
          algoName: "KNN",
        },
        {
          id: 2,
          algoName: "K-means",
        },
        {
          id: 3,
          algoName: "SVM",
        },
      ],
      value1: [],
      value2: [],
      formArray: [
        "basicInfoForm",
        "dataSelectForm",
        "columnSelectForm",
        "algoForm",
      ],
      active: 0,
      //基本信息-----------------------------------------------------------------------------------------------
      basicInfoForm: {
        isShow: true,
        modelData: {
          name: "",
          desc: "",
        },
        rules: {
          name: [
            { required: true, message: "请输入模型名称", trigger: "blur" },
          ],
        },
      },

      //数据选择-----------------------------------------------------------------------------------------------
      dataSelectForm: {
        isShow: false,
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
          params:[],
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


    };
  },
  methods: {
    onSubmitDM() {
      this.showForm = !this.showForm;
      this.showChart = !this.showChart;
    },
    drawChart() {
      let myChart1 = this.$echarts.init(document.getElementById("chart1"));
      let myChart2 = this.$echarts.init(document.getElementById("chart2"));
      let myChart3 = this.$echarts.init(document.getElementById("chart3"));
      let option1 = {
        title: {
          text: "ROC曲线图",
          left: "center",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [0, 0.2, 0.4, 0.6, 0.8, 1],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [0, 0.5, 0.7, 0.8, 0.9, 0.91, 0.92],
            type: "line",
            areaStyle: {},
          },
          {
            data: [0, 0.2, 0.4, 0.5, 0.6, 0.7, 0.8],
            type: "line",
            smooth: true,
          },
        ],
        color: "#75AAF2",
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
      myChart3.setOption(option3);
    },
    submitForm(stepIndex) {
      let formName = this.formArray[stepIndex];
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
          if (stepIndex < 4) {
            this[formName].isShow = false;
            this.active++;
            let nextFormName = this.formArray[++stepIndex];
            this[nextFormName].isShow = true;
            if (this.active == 2) {
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
            if(this.active==4){
              const params={
                modelName:this.basicInfoForm.modelData.name,
                modelInfo:this.basicInfoForm.modelData.desc,
                modelTable:this.dataSelectForm.formData.selectedData,
                modelColumn:this.columnSelectForm.formData.selectedData,
                modelAlgo:this.algoForm.formData.selectedData.algoName,
                modelAlgoParams:this.algoForm.formData.params,
              }
              postRequest('',params).then(
                (response)=>{
                  console.log(response)
                }

              );
            }
            console.log(
              "当前表单名字：" +
                formName +
                "\n" +
                "下一个表单名字：" +
                nextFormName
            );
            console.log(
              "当前表单状态：" +
                this[formName].isShow +
                "\n" +
                "下一个表单状态：" +
                this[nextFormName].isShow
            );
          }
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },
    resetForm(stepIndex) {
      let formName = this.formArray[stepIndex];
      this.$refs[formName].resetFields();
    },
    stepBack(stepIndex) {
      let formName = this.formArray[stepIndex];
      this[formName].isShow = false;
      this.active--;
      let preFormName = this.formArray[--stepIndex];
      this[preFormName].isShow = true;
      this.dataInOptions = [];
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
    outputParams(value){
      this.algoForm.formData.params=value;
      
    }
  },
  mounted() {
    this.drawChart();
    this.getAllData();
  },
};
</script>

<style scoped>
#maintest {
  display: flex;
  justify-content: center;
  align-items: center;
}
#button1 {
  display: flex;
  justify-content: center;
  align-items: center;
}
#charts {
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