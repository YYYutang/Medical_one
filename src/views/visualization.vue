<template>
  <div>
    <el-header >
      <h3 v-if="head1">任务设置</h3>
      <h3 v-if="head2">疾病画像</h3>
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
          <el-form-item
            label="选择数据表："
            prop="selectedData"
            style="margin-left: 30%"
          >
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
          <el-form-item style="margin-left: 45%">
            <el-button type="primary" size="small" @click="submitForm(active)"
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
          <el-form-item  prop="selectedData" >
            <h3 style="margin-left: 20%">选择一个病人：</h3>
            <div class="table" style="margin-left: 20%">
              <el-table
                :data="tableData"
                v-model="oneSelectForm.formData.selectedData"
                highlight-current-row
                @current-change="handleCurrentChange"
                style="width: auto;"
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
                  v-for="(item, index) in dataColumn"
                  :key="index"
                  :label="item"
                  :prop="item"
                  width="150"
                >
                </el-table-column>
              </el-table>
            </div>
            <br>
            <el-pagination
            style="margin-left: 40%"
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
          <el-form-item style="margin-left: 45%">
            <el-button  size="small" @click="stepBack(active)">上一步</el-button>
            <el-button type="primary" size="small" @click="submitForm(active)"
              >完成</el-button
            >
          </el-form-item>
        </el-form>
      </div>

      <div v-show="showChart">
        <div  class="chooseBar">
         <span style="margin-right:20px">请选择指标</span>
        
        <el-select v-model="value1" placeholder="请选择肾脏相关的指标" @change="changeKidney">
          <el-option
            v-for="item in kidneyFormalData"
            :key="item.name"
            :label="item.nameCH"
            :value="item.nameCH"
            
          >
          </el-option>
        </el-select>

        <el-select
          v-model="value2"
          collapse-tags
          style="margin-left: 20px"
          placeholder="请选择肝脏相关的指标"
          @change="changeLiver"
        >
          <el-option
            v-for="item in liverFormalData"
            :key="item.name"
            :label="item.nameCH"
            :value="item.nameCH"
          >
          </el-option>
        </el-select>
        </div>
        <div></div>
        <div
          id="chart"
          class="charts"
          style="width: 1000px; height: 800px"
        ></div>
      </div>
    </el-container>
  </div>
</template>
<script>
import { postRequest, getRequest } from "@/utils/api";
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
      healthDataLow: [0, 0, 0, 0, 3.2, 0, 0],
      healthDataHigh: [0, 0, 0, 0, 3.8, 0, 40],
      patientData: [],
      formArray: ["dataSelectForm", "oneSelectForm"],
      active: 0,
      currentRow: null,
      tableData: [],
      
      kidneyFormalData: [
        { name: "BUN", min: 3.2, max: 7.1,nameCH:"血尿素氮" },
        { name: "BU", min: 3.2, max: 7.0 ,nameCH:"血尿素" },
        { name: "SCR", min: 50, max: 90,nameCH:"血肌酐"  },
        { name: "UCR", min: 100, max: 170 ,nameCH:"尿肌酐" }],
      liverFormalData:[
        { name: "ALT", min: 0, max: 40 ,nameCH:"谷丙转氨酶" },
        { name: "AST", min: 0, max: 35 ,nameCH:"谷草转氨酶" },
        { name: "GGT", min: 10, max: 45 ,nameCH:"谷氨酰胺转移酶" },
        { name: "ALP", min: 45, max: 125 ,nameCH:"碱性磷酸酶" },
      ],
      value1: [],
      value2: [],
      head1:true,
      head2:false,

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
      const that = this;
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
              stack: "Total",
              emphasis: {
                focus: "self",
              },
              itemStyle: {
                borderColor: "transparent",
                color: "transparent",
              },
              data: that.healthDataLow,
            },
            {
              name: "健康人",
              type: "bar",
              stack: "Total",
              emphasis: {
                focus: "self",
              },
              data: that.healthDataHigh,
            },
            {
              name: "患者",
              type: "bar",
              emphasis: {
                focus: "self",
              },
              data: that.patientData,
            },
          ],
        };

        myChart.setOption(option);
        if(that.patientData[4]<that.healthDataLow[4]||that.patientData[4]>that.healthDataHigh[4]+that.healthDataLow[4]){
   
        myChart.dispatchAction({
          type:'highlight',
          geoIndex:0,
          name:'kidney',
        })
        }
        if(that.patientData[6]<that.healthDataLow[6]||that.patientData[6]>that.healthDataHigh[6]+that.healthDataLow[6]){
        myChart.dispatchAction({
          type:'highlight',
          geoIndex:0,
          name:'liver',
        })
        }
     
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
                this.allPage = response.total * 10;
                this.tableData = response.data;
              });
            }
          } else if (stepIndex == 1) {
            this.showChart = !this.showChart;
            this.showStep = !this.showStep;
            this.head1=!this.head1;
            this.head2=!this.head2;
            this.tableisShow = !this.tableisShow;
            // this.showChart=!this.showChart
            // this.showStep=!this.showStep
            let select = this.oneSelectForm.formData.selectedData;
            const temp1 = [0, 0, 0, 0, 0, 0, 0];
            temp1[4] = select["BU"];
            temp1[6] = select["ALT"];

            this.patientData = temp1;
            this.drawChart();
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
    changeKidney(val){
      for (let i in this.kidneyFormalData){
        if(this.kidneyFormalData[i].nameCH==val){
          this.healthDataLow[4]=this.kidneyFormalData[i].min;
          this.healthDataHigh[4]=this.kidneyFormalData[i].max-this.kidneyFormalData[i].min;
          this.patientData[4]=this.oneSelectForm.formData.selectedData[this.kidneyFormalData[i].name];
        }
       
      }
       this.drawChart();
    },
    changeLiver(val){
      for (let i in this.liverFormalData){
        if(this.liverFormalData[i].nameCH==val){
          this.healthDataLow[6]=this.liverFormalData[i].min;
          this.healthDataHigh[6]=this.liverFormalData[i].max-this.liverFormalData[i].min;
          this.patientData[6]=this.oneSelectForm.formData.selectedData[this.liverFormalData[i].name];
        }
       
      }
       this.drawChart();
    }
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
  height: 100%;
  margin-top: 130px;
}
#stepcontain {
  width: 100%;
  height: 100%;
  margin-top: 150px;
  left: 15%;
}
.table {
  width: 1100px;
   justify-content: center;
  align-items: center;
}
.charts {

  margin-right: 20px;
  margin-top: 40px;
}
.chooseBar{
    display: flex;
      justify-content: center;
  align-items: center;
  margin-top:40px;

}
</style>
