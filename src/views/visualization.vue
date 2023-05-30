<template>
  <div>
    <el-header>
      <h3>任务设置</h3>
      <el-divider></el-divider>
    </el-header>

    <el-container id="maintest">
      <div id="step" v-show="showStep">
        <el-steps :active="active" align-center>
          <el-step title="选择数据集"></el-step>
          <el-step title="选择一条数据"></el-step>
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
          <el-form-item label="选择数据表：" prop="selectedData" style="margin-left:30%">
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
          <el-form-item style="margin-left:50%">
            <el-button @click="stepBack(active)">上一步</el-button>
            <el-button type="primary" @click="submitForm(active)"
              >下一步</el-button
            >
          </el-form-item>
        </el-form>
        <!--======================================     选择一条数据     ======================================================-->
        <el-form
          class="form"
          :model="oneSelectForm.formData"
          :rules="oneSelectForm.rules"
          v-show="oneSelectForm.isShow"
          ref="oneSelectForm"
          label-position="top"
        >
          <el-form-item label="选择一个病人：" prop="selectedData">
            <div class="table">
              <el-table
                :data="tableData"
                v-model="oneSelectForm.formData.selectedData"
                highlight-current-row
                @current-change="handleCurrentChange"
                style="width: auto"
                  border
              >
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
            <el-pagination
              background
              class="pagination"
              layout="prev, pager, next"
              :current-page="currentPage"
              :page-size="pageSize"
              @current-change="handleCurrentClick"
              :total="allPage"
            >
            </el-pagination>
          </el-form-item>

          <br />
          <el-form-item style="margin-left:45%">
            <el-button @click="stepBack(active)">上一步</el-button>
            <el-button type="primary" @click="submitForm(active)"
              >完成</el-button
            >
          </el-form-item>
        </el-form>
      </div>

      <div>
        <div
          id="chart"
          class="charts"
          style="width: 1000px; height: 800px"
          v-show="showChart"
        ></div>
      </div>
    </el-container>
  </div>
</template>
<script>
import { postRequest, getRequest } from "@/utils/api";
import svg from "@/assets/pic.svg";
import * as echarts from "echarts";

export default {
  data() {
    return {
      showForm: true,
      showChart: false,
      showStep: true,
      outComeData: [],
      currentPage: 1,
      pageSize: 10,
      allPage: 0,
      dataColumn: [],
      dataOptions: [],
      formArray: ["dataSelectForm", "oneSelectForm"],
      active: 0,
      currentRow: null,
      tableData: [],

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
      oneSelectForm: {
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
    };
  },
  methods: {
    onSubmitDM() {
      this.showForm = !this.showForm;
      this.showChart = !this.showChart;
    },
    drawChart() {
      var option;
      let myChart = echarts.init(document.getElementById("chart"));

      $.get("./pic.svg", function (svg) {
        echarts.registerMap("organ_diagram", { svg: svg });
        option = {
          tooltip: {},
          geo: {
            left: 10,
            right: "50%",
            map: "organ_diagram",
            selectedMode: "multiple",
            emphasis: {
              focus: "self",
              itemStyle: {
                color: null,
              },
              label: {
                position: "bottom",
                distance: 0,
                textBorderColor: "#fff",
                textBorderWidth: 2,
              },
            },
            blur: {},
            select: {
              itemStyle: {
                color: "#b50205",
              },
              label: {
                show: false,
                textBorderColor: "#fff",
                textBorderWidth: 2,
              },
            },
          },
          grid: {
            left: "60%",
            top: "20%",
            bottom: "20%",
          },
          xAxis: {},
          yAxis: {
            data: [
              "heart",
              "large-intestine",
              "small-intestine",
              "spleen",
              "kidney",
              "lung",
              "liver",
            ],
          },
          series: [
            {
              name: "健康人",
              type: "bar",
              emphasis: {
                focus: "self",
              },
              data: [121, 321, 141, 52, 198, 289, 139],
            },
            {
              name: "患者",
              type: "bar",
              emphasis: {
                focus: "self",
              },
              data: [141, 351, 171, 82, 208, 249, 129],
            },
          ],
        };

        myChart.setOption(option);
        myChart.on("mouseover", function (event) {
          myChart.dispatchAction({
            type: "highlight",
            geoIndex: 0,
            name: event.name,
          });
        });
        myChart.on("mouseout", function (event) {
          myChart.dispatchAction({
            type: "downplay",
            geoIndex: 0,
            name: event.name,
          });
        });
      });

      option && myChart.setOption(option);
    },
    submitForm(stepIndex) {
      let formName = this.formArray[stepIndex];
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(stepIndex + "stepindex" + this.active + "active");
          if (stepIndex < 1) {
            this[formName].isShow = false;
            this.active++;
            let nextFormName = this.formArray[++stepIndex];
            this[nextFormName].isShow = true;
            if (this.active == 1) {
              let tableName = this.dataSelectForm.formData.selectedData;
              getRequest(
                "/feature/getInfoByTableName?tableName=" +
                  tableName +
                  "&page=" +
                  1
              ).then((response) => {
                this.dataColumn = Object.keys(response.data[0]);
                this.allPage = response.total*10;
                this.tableData = response.data;
              });
            }
          } else if (stepIndex == 1) {
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
      if (this.active - 1 >= 0) {
        if (this.active == 1) {
          this.tableData = [];
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
    setCurrent(row) {
      this.$refs.oneSelectForm.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
      this.oneSelectForm.formData.selectedData = this.currentRow;
      console.log(this.currentRow);
    },
    handleCurrentClick(val) {
      this.currentPage = val;
      getRequest(
        "/feature/getInfoByTableName?tableName=" +
          this.dataSelectForm.formData.selectedData +
          "&page=" +
          val
      ).then((response) => {
        this.tableData = response.data;
      });
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
  height:100%;
}
#stepcontain {

  width: 100%;
  height: 100%;
  top: 44%;
  left: 34%;

}
.table {
 
  width:auto;
}
</style>
